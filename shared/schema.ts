import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userRoleEnum = pgEnum("user_role", ["patient", "doctor", "hospital_admin"]);
export const userStatusEnum = pgEnum("user_status", ["pending", "active", "suspended", "rejected"]);
export const verificationTypeEnum = pgEnum("verification_type", ["government_id", "medical_license", "hospital_affiliation"]);
export const verificationStatusEnum = pgEnum("verification_status", ["pending", "approved", "rejected"]);
export const twoFactorTypeEnum = pgEnum("two_factor_type", ["totp", "sms", "email"]);
export const highRiskActionEnum = pgEnum("high_risk_action", ["grant_access", "sell_data", "emergency_settings"]);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  passwordHash: text("password_hash").notNull(),
  role: userRoleEnum("role").notNull().default("patient"),
  status: userStatusEnum("status").notNull().default("pending"),
  qrSecret: text("qr_secret"),
  emergencyCodeHash: text("emergency_code_hash"),
  twoFactorEnabled: boolean("two_factor_enabled").notNull().default(false),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id).unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: timestamp("date_of_birth"),
  address: text("address"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const doctorProfiles = pgTable("doctor_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id).unique(),
  licenseNumber: text("license_number").notNull(),
  issuingBody: text("issuing_body").notNull(),
  specialization: text("specialization"),
  hospitalId: varchar("hospital_id").references(() => hospitalProfiles.id),
  licenseExpiry: timestamp("license_expiry"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const hospitalProfiles = pgTable("hospital_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id).unique(),
  hospitalName: text("hospital_name").notNull(),
  licenseNumber: text("license_number").notNull(),
  address: text("address").notNull(),
  contactNumber: text("contact_number").notNull(),
  isVerified: boolean("is_verified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const verificationRequests = pgTable("verification_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: verificationTypeEnum("type").notNull(),
  status: verificationStatusEnum("status").notNull().default("pending"),
  documentData: jsonb("document_data").$type<VerificationDocument>(),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
  reviewerId: varchar("reviewer_id").references(() => users.id),
  rejectionReason: text("rejection_reason"),
});

export const biometricCredentials = pgTable("biometric_credentials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  credentialId: text("credential_id").notNull().unique(),
  publicKey: text("public_key").notNull(),
  deviceLabel: text("device_label"),
  lastUsedAt: timestamp("last_used_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const qrLoginTokens = pgTable("qr_login_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  consumedAt: timestamp("consumed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const twoFactorMethods = pgTable("two_factor_methods", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: twoFactorTypeEnum("type").notNull(),
  secret: text("secret"),
  isEnabled: boolean("is_enabled").notNull().default(true),
  enabledAt: timestamp("enabled_at").notNull().defaultNow(),
});

export const twoFactorChallenges = pgTable("two_factor_challenges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  action: highRiskActionEnum("action").notNull(),
  otpHash: text("otp_hash").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const patientRecords = pgTable("patient_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  nftId: text("nft_id").notNull().unique(),
  patientName: text("patient_name").notNull(),
  bloodType: text("blood_type").notNull(),
  allergies: text("allergies").array().notNull().default(sql`ARRAY[]::text[]`),
  currentMedications: text("current_medications").array().notNull().default(sql`ARRAY[]::text[]`),
  emergencyContacts: jsonb("emergency_contacts").notNull().$type<EmergencyContact[]>(),
  recentRecords: jsonb("recent_records").notNull().$type<MedicalRecord[]>(),
  hospitalHistory: jsonb("hospital_history").notNull().$type<HospitalVisit[]>(),
  doctorNotes: text("doctor_notes").array().notNull().default(sql`ARRAY[]::text[]`),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const emergencyAccessLogs = pgTable("emergency_access_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientRecordId: varchar("patient_record_id").notNull().references(() => patientRecords.id),
  accessedBy: text("accessed_by").notNull(),
  accessedAt: timestamp("accessed_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
  blockchainTxHash: text("blockchain_tx_hash"),
  ipAddress: text("ip_address"),
});

export type VerificationDocument = {
  documentType: string;
  documentNumber: string;
  frontImageUrl?: string;
  backImageUrl?: string;
  selfieUrl?: string;
};

export type EmergencyContact = {
  name: string;
  relationship: string;
  phone: string;
};

export type MedicalRecord = {
  date: string;
  type: string;
  description: string;
  provider: string;
};

export type HospitalVisit = {
  hospital: string;
  date: string;
  reason: string;
  treatment: string;
};

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLoginAt: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
});

export const insertDoctorProfileSchema = createInsertSchema(doctorProfiles).omit({
  id: true,
  createdAt: true,
});

export const insertHospitalProfileSchema = createInsertSchema(hospitalProfiles).omit({
  id: true,
  createdAt: true,
});

export const insertVerificationRequestSchema = createInsertSchema(verificationRequests).omit({
  id: true,
  submittedAt: true,
  reviewedAt: true,
});

export const insertPatientRecordSchema = createInsertSchema(patientRecords).omit({
  id: true,
  createdAt: true,
});

export const insertEmergencyAccessLogSchema = createInsertSchema(emergencyAccessLogs).omit({
  id: true,
  accessedAt: true,
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerPatientSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  governmentId: z.object({
    documentType: z.string(),
    documentNumber: z.string(),
  }).optional(),
});

export const registerDoctorSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  licenseNumber: z.string().min(1),
  issuingBody: z.string().min(1),
  specialization: z.string().optional(),
  hospitalId: z.string().optional(),
});

export const registerHospitalSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  hospitalName: z.string().min(1),
  licenseNumber: z.string().min(1),
  address: z.string().min(1),
  contactNumber: z.string().min(1),
});

export const verify2FASchema = z.object({
  code: z.string().length(6),
  action: z.enum(["grant_access", "sell_data", "emergency_settings"]),
});

export const emergencyLoginSchema = z.object({
  email: z.string().email(),
  emergencyCode: z.string().min(8),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UserProfile = typeof userProfiles.$inferSelect;
export type DoctorProfile = typeof doctorProfiles.$inferSelect;
export type HospitalProfile = typeof hospitalProfiles.$inferSelect;
export type VerificationRequest = typeof verificationRequests.$inferSelect;
export type BiometricCredential = typeof biometricCredentials.$inferSelect;
export type QRLoginToken = typeof qrLoginTokens.$inferSelect;
export type TwoFactorMethod = typeof twoFactorMethods.$inferSelect;
export type TwoFactorChallenge = typeof twoFactorChallenges.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type InsertPatientRecord = z.infer<typeof insertPatientRecordSchema>;
export type PatientRecord = typeof patientRecords.$inferSelect;
export type InsertEmergencyAccessLog = z.infer<typeof insertEmergencyAccessLogSchema>;
export type EmergencyAccessLog = typeof emergencyAccessLogs.$inferSelect;
