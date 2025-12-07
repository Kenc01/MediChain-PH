import { db } from "./db";
import { eq, and, gt, isNull } from "drizzle-orm";
import {
  users,
  userProfiles,
  doctorProfiles,
  hospitalProfiles,
  verificationRequests,
  biometricCredentials,
  qrLoginTokens,
  twoFactorMethods,
  twoFactorChallenges,
  sessions,
  patientRecords,
  emergencyAccessLogs,
  type User,
  type UserProfile,
  type DoctorProfile,
  type HospitalProfile,
  type VerificationRequest,
  type BiometricCredential,
  type QRLoginToken,
  type TwoFactorMethod,
  type TwoFactorChallenge,
  type Session,
  type PatientRecord,
  type EmergencyAccessLog,
  type InsertPatientRecord,
  type InsertEmergencyAccessLog,
  type VerificationDocument,
} from "@shared/schema";
import { randomUUID, randomBytes, createHash } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(data: {
    email: string;
    passwordHash: string;
    phone?: string;
    role: "patient" | "doctor" | "hospital_admin";
    status?: "pending" | "active" | "suspended" | "rejected";
  }): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User | undefined>;

  createUserProfile(data: {
    userId: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    address?: string;
  }): Promise<UserProfile>;
  getUserProfile(userId: string): Promise<UserProfile | undefined>;

  createDoctorProfile(data: {
    userId: string;
    licenseNumber: string;
    issuingBody: string;
    specialization?: string;
    hospitalId?: string;
    licenseExpiry?: Date;
  }): Promise<DoctorProfile>;
  getDoctorProfile(userId: string): Promise<DoctorProfile | undefined>;

  createHospitalProfile(data: {
    userId: string;
    hospitalName: string;
    licenseNumber: string;
    address: string;
    contactNumber: string;
  }): Promise<HospitalProfile>;
  getHospitalProfile(userId: string): Promise<HospitalProfile | undefined>;
  getAllHospitals(): Promise<HospitalProfile[]>;

  createVerificationRequest(data: {
    userId: string;
    type: "government_id" | "medical_license" | "hospital_affiliation";
    documentData?: VerificationDocument;
  }): Promise<VerificationRequest>;
  getPendingVerifications(): Promise<VerificationRequest[]>;
  updateVerificationRequest(
    id: string,
    data: {
      status: "approved" | "rejected";
      reviewerId: string;
      rejectionReason?: string;
    }
  ): Promise<VerificationRequest | undefined>;

  createSession(userId: string, ipAddress?: string, userAgent?: string): Promise<Session>;
  getSessionByToken(token: string): Promise<Session | undefined>;
  deleteSession(token: string): Promise<void>;
  deleteUserSessions(userId: string): Promise<void>;

  createQRLoginToken(): Promise<{ token: string; tokenHash: string; expiresAt: Date }>;
  getQRLoginToken(tokenHash: string): Promise<QRLoginToken | undefined>;
  consumeQRLoginToken(tokenHash: string, userId: string): Promise<void>;

  create2FAMethod(userId: string, type: "totp" | "sms" | "email", secret?: string): Promise<TwoFactorMethod>;
  get2FAMethods(userId: string): Promise<TwoFactorMethod[]>;

  create2FAChallenge(
    userId: string,
    action: "grant_access" | "sell_data" | "emergency_settings",
    otpHash: string
  ): Promise<TwoFactorChallenge>;
  verify2FAChallenge(userId: string, action: string, otpHash: string): Promise<boolean>;

  generateEmergencyCode(userId: string): Promise<string>;

  getPatientRecordByNftId(nftId: string): Promise<PatientRecord | undefined>;
  createPatientRecord(record: InsertPatientRecord): Promise<PatientRecord>;

  createEmergencyAccessLog(log: InsertEmergencyAccessLog): Promise<EmergencyAccessLog>;
  getActiveAccessLog(patientRecordId: string): Promise<EmergencyAccessLog | undefined>;
}

class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(data: {
    email: string;
    passwordHash: string;
    phone?: string;
    role: "patient" | "doctor" | "hospital_admin";
    status?: "pending" | "active" | "suspended" | "rejected";
  }): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        email: data.email,
        passwordHash: data.passwordHash,
        phone: data.phone,
        role: data.role,
        status: data.status || "pending",
      })
      .returning();
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async createUserProfile(data: {
    userId: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    address?: string;
  }): Promise<UserProfile> {
    const [profile] = await db
      .insert(userProfiles)
      .values(data)
      .returning();
    return profile;
  }

  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));
    return profile;
  }

  async createDoctorProfile(data: {
    userId: string;
    licenseNumber: string;
    issuingBody: string;
    specialization?: string;
    hospitalId?: string;
    licenseExpiry?: Date;
  }): Promise<DoctorProfile> {
    const [profile] = await db
      .insert(doctorProfiles)
      .values(data)
      .returning();
    return profile;
  }

  async getDoctorProfile(userId: string): Promise<DoctorProfile | undefined> {
    const [profile] = await db
      .select()
      .from(doctorProfiles)
      .where(eq(doctorProfiles.userId, userId));
    return profile;
  }

  async createHospitalProfile(data: {
    userId: string;
    hospitalName: string;
    licenseNumber: string;
    address: string;
    contactNumber: string;
  }): Promise<HospitalProfile> {
    const [profile] = await db
      .insert(hospitalProfiles)
      .values(data)
      .returning();
    return profile;
  }

  async getHospitalProfile(userId: string): Promise<HospitalProfile | undefined> {
    const [profile] = await db
      .select()
      .from(hospitalProfiles)
      .where(eq(hospitalProfiles.userId, userId));
    return profile;
  }

  async getAllHospitals(): Promise<HospitalProfile[]> {
    return db.select().from(hospitalProfiles).where(eq(hospitalProfiles.isVerified, true));
  }

  async createVerificationRequest(data: {
    userId: string;
    type: "government_id" | "medical_license" | "hospital_affiliation";
    documentData?: VerificationDocument;
  }): Promise<VerificationRequest> {
    const [request] = await db
      .insert(verificationRequests)
      .values({
        userId: data.userId,
        type: data.type,
        documentData: data.documentData,
        status: "pending",
      })
      .returning();
    return request;
  }

  async getPendingVerifications(): Promise<VerificationRequest[]> {
    return db
      .select()
      .from(verificationRequests)
      .where(eq(verificationRequests.status, "pending"));
  }

  async updateVerificationRequest(
    id: string,
    data: {
      status: "approved" | "rejected";
      reviewerId: string;
      rejectionReason?: string;
    }
  ): Promise<VerificationRequest | undefined> {
    const [request] = await db
      .update(verificationRequests)
      .set({
        status: data.status,
        reviewerId: data.reviewerId,
        rejectionReason: data.rejectionReason,
        reviewedAt: new Date(),
      })
      .returning();
    return request;
  }

  async createSession(userId: string, ipAddress?: string, userAgent?: string): Promise<Session> {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const [session] = await db
      .insert(sessions)
      .values({
        userId,
        token,
        ipAddress,
        userAgent,
        expiresAt,
      })
      .returning();
    return session;
  }

  async getSessionByToken(token: string): Promise<Session | undefined> {
    const [session] = await db
      .select()
      .from(sessions)
      .where(and(eq(sessions.token, token), gt(sessions.expiresAt, new Date())));
    return session;
  }

  async deleteSession(token: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.token, token));
  }

  async deleteUserSessions(userId: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.userId, userId));
  }

  async createQRLoginToken(): Promise<{ token: string; tokenHash: string; expiresAt: Date }> {
    const token = randomBytes(16).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await db.insert(qrLoginTokens).values({
      tokenHash,
      expiresAt,
    });

    return { token, tokenHash, expiresAt };
  }

  async getQRLoginToken(tokenHash: string): Promise<QRLoginToken | undefined> {
    const [qrToken] = await db
      .select()
      .from(qrLoginTokens)
      .where(
        and(
          eq(qrLoginTokens.tokenHash, tokenHash),
          gt(qrLoginTokens.expiresAt, new Date()),
          isNull(qrLoginTokens.consumedAt)
        )
      );
    return qrToken;
  }

  async consumeQRLoginToken(tokenHash: string, userId: string): Promise<void> {
    await db
      .update(qrLoginTokens)
      .set({ userId, consumedAt: new Date() })
      .where(eq(qrLoginTokens.tokenHash, tokenHash));
  }

  async create2FAMethod(userId: string, type: "totp" | "sms" | "email", secret?: string): Promise<TwoFactorMethod> {
    const [method] = await db
      .insert(twoFactorMethods)
      .values({
        userId,
        type,
        secret,
      })
      .returning();
    return method;
  }

  async get2FAMethods(userId: string): Promise<TwoFactorMethod[]> {
    return db
      .select()
      .from(twoFactorMethods)
      .where(and(eq(twoFactorMethods.userId, userId), eq(twoFactorMethods.isEnabled, true)));
  }

  async create2FAChallenge(
    userId: string,
    action: "grant_access" | "sell_data" | "emergency_settings",
    otpHash: string
  ): Promise<TwoFactorChallenge> {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const [challenge] = await db
      .insert(twoFactorChallenges)
      .values({
        userId,
        action,
        otpHash,
        expiresAt,
      })
      .returning();
    return challenge;
  }

  async verify2FAChallenge(userId: string, action: string, otpHash: string): Promise<boolean> {
    const [challenge] = await db
      .select()
      .from(twoFactorChallenges)
      .where(
        and(
          eq(twoFactorChallenges.userId, userId),
          eq(twoFactorChallenges.otpHash, otpHash),
          gt(twoFactorChallenges.expiresAt, new Date()),
          isNull(twoFactorChallenges.verifiedAt)
        )
      );

    if (challenge) {
      await db
        .update(twoFactorChallenges)
        .set({ verifiedAt: new Date() })
        .where(eq(twoFactorChallenges.id, challenge.id));
      return true;
    }
    return false;
  }

  async generateEmergencyCode(userId: string): Promise<string> {
    const code = randomBytes(8).toString("hex").toUpperCase();
    const codeHash = createHash("sha256").update(code).digest("hex");

    await db
      .update(users)
      .set({ emergencyCodeHash: codeHash })
      .where(eq(users.id, userId));

    return code;
  }

  async getPatientRecordByNftId(nftId: string): Promise<PatientRecord | undefined> {
    const [record] = await db
      .select()
      .from(patientRecords)
      .where(eq(patientRecords.nftId, nftId));
    return record;
  }

  async createPatientRecord(record: InsertPatientRecord): Promise<PatientRecord> {
    const [created] = await db.insert(patientRecords).values(record as any).returning();
    return created;
  }

  async createEmergencyAccessLog(log: InsertEmergencyAccessLog): Promise<EmergencyAccessLog> {
    const [created] = await db.insert(emergencyAccessLogs).values(log).returning();
    return created;
  }

  async getActiveAccessLog(patientRecordId: string): Promise<EmergencyAccessLog | undefined> {
    const [log] = await db
      .select()
      .from(emergencyAccessLogs)
      .where(
        and(
          eq(emergencyAccessLogs.patientRecordId, patientRecordId),
          gt(emergencyAccessLogs.expiresAt, new Date())
        )
      );
    return log;
  }
}

export const storage = new DatabaseStorage();
