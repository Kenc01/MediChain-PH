import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  hashPassword, 
  verifyPassword, 
  hashOTP, 
  generateOTP, 
  authenticateSession, 
  requireRole, 
  requireActiveStatus,
  type AuthenticatedRequest 
} from "./auth";
import { 
  insertEmergencyAccessLogSchema, 
  loginSchema, 
  registerPatientSchema, 
  registerDoctorSchema, 
  registerHospitalSchema,
  verify2FASchema,
  emergencyLoginSchema
} from "@shared/schema";
import { z } from "zod";
import { createHash } from "crypto";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/auth/register/patient", async (req, res) => {
    try {
      const data = registerPatientSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const passwordHash = await hashPassword(data.password);
      
      const user = await storage.createUser({
        email: data.email,
        passwordHash,
        phone: data.phone,
        role: "patient",
        status: "active",
      });

      await storage.createUserProfile({
        userId: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      if (data.governmentId) {
        await storage.createVerificationRequest({
          userId: user.id,
          type: "government_id",
          documentData: {
            documentType: data.governmentId.documentType,
            documentNumber: data.governmentId.documentNumber,
          },
        });
      }

      const session = await storage.createSession(
        user.id,
        req.ip,
        req.headers["user-agent"]
      );

      res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
        },
        token: session.token,
        message: "Registration successful",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      console.error("Patient registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/register/doctor", async (req, res) => {
    try {
      const data = registerDoctorSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const passwordHash = await hashPassword(data.password);
      
      const user = await storage.createUser({
        email: data.email,
        passwordHash,
        phone: data.phone,
        role: "doctor",
        status: "pending",
      });

      await storage.createUserProfile({
        userId: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      await storage.createDoctorProfile({
        userId: user.id,
        licenseNumber: data.licenseNumber,
        issuingBody: data.issuingBody,
        specialization: data.specialization,
        hospitalId: data.hospitalId,
      });

      await storage.createVerificationRequest({
        userId: user.id,
        type: "medical_license",
        documentData: {
          documentType: "medical_license",
          documentNumber: data.licenseNumber,
        },
      });

      res.status(201).json({
        success: true,
        message: "Registration submitted. Your account is pending admin approval.",
        status: "pending",
        requiresApproval: true,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      console.error("Doctor registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/register/hospital", async (req, res) => {
    try {
      const data = registerHospitalSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const passwordHash = await hashPassword(data.password);
      
      const user = await storage.createUser({
        email: data.email,
        passwordHash,
        phone: data.phone,
        role: "hospital_admin",
        status: "pending",
      });

      await storage.createUserProfile({
        userId: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      await storage.createHospitalProfile({
        userId: user.id,
        hospitalName: data.hospitalName,
        licenseNumber: data.licenseNumber,
        address: data.address,
        contactNumber: data.contactNumber,
      });

      await storage.createVerificationRequest({
        userId: user.id,
        type: "hospital_affiliation",
        documentData: {
          documentType: "hospital_license",
          documentNumber: data.licenseNumber,
        },
      });

      res.status(201).json({
        success: true,
        message: "Registration submitted. Your account is pending admin approval.",
        status: "pending",
        requiresApproval: true,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      console.error("Hospital registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(data.email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isValidPassword = await verifyPassword(data.password, user.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      if (user.status === "suspended") {
        return res.status(403).json({ error: "Account suspended" });
      }

      if (user.status === "rejected") {
        return res.status(403).json({ error: "Account was not approved" });
      }

      const session = await storage.createSession(
        user.id,
        req.ip,
        req.headers["user-agent"]
      );

      await storage.updateUser(user.id, { lastLoginAt: new Date() });

      const profile = await storage.getUserProfile(user.id);

      res.json({
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
          firstName: profile?.firstName,
          lastName: profile?.lastName,
        },
        token: session.token,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/login/emergency", async (req, res) => {
    try {
      const data = emergencyLoginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(data.email);
      if (!user || !user.emergencyCodeHash) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      if (user.status === "suspended") {
        return res.status(403).json({ error: "Account suspended" });
      }

      if (user.status === "rejected") {
        return res.status(403).json({ error: "Account was not approved" });
      }

      const codeHash = createHash("sha256").update(data.emergencyCode).digest("hex");
      
      const codeHashBuffer = Buffer.from(codeHash, "hex");
      const storedHashBuffer = Buffer.from(user.emergencyCodeHash, "hex");
      
      if (codeHashBuffer.length !== storedHashBuffer.length) {
        return res.status(401).json({ error: "Invalid emergency code" });
      }
      
      const { timingSafeEqual } = await import("crypto");
      if (!timingSafeEqual(codeHashBuffer, storedHashBuffer)) {
        return res.status(401).json({ error: "Invalid emergency code" });
      }

      await storage.updateUser(user.id, { emergencyCodeHash: null });

      const session = await storage.createSession(
        user.id,
        req.ip,
        req.headers["user-agent"]
      );

      const profile = await storage.getUserProfile(user.id);

      res.json({
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
          firstName: profile?.firstName,
          lastName: profile?.lastName,
        },
        token: session.token,
        warning: "Emergency code used. Please set up new authentication method.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      console.error("Emergency login error:", error);
      res.status(500).json({ error: "Emergency login failed" });
    }
  });

  app.post("/api/auth/qr/generate", async (_req, res) => {
    try {
      const { token, expiresAt } = await storage.createQRLoginToken();
      
      res.json({
        qrToken: token,
        expiresAt: expiresAt.toISOString(),
      });
    } catch (error) {
      console.error("QR generation error:", error);
      res.status(500).json({ error: "Failed to generate QR code" });
    }
  });

  app.post("/api/auth/qr/scan", authenticateSession as any, async (req: AuthenticatedRequest, res) => {
    try {
      const { qrToken } = req.body;
      
      if (!qrToken || !req.user) {
        return res.status(400).json({ error: "QR token required" });
      }

      const tokenHash = createHash("sha256").update(qrToken).digest("hex");
      const qrLoginToken = await storage.getQRLoginToken(tokenHash);
      
      if (!qrLoginToken) {
        return res.status(400).json({ error: "Invalid or expired QR code" });
      }

      await storage.consumeQRLoginToken(tokenHash, req.user.id);

      res.json({ success: true, message: "QR code authenticated" });
    } catch (error) {
      console.error("QR scan error:", error);
      res.status(500).json({ error: "QR authentication failed" });
    }
  });

  app.get("/api/auth/qr/poll/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const tokenHash = createHash("sha256").update(token).digest("hex");
      
      const qrLoginToken = await storage.getQRLoginToken(tokenHash);
      
      if (!qrLoginToken) {
        return res.status(404).json({ error: "Token not found or expired" });
      }

      if (qrLoginToken.consumedAt && qrLoginToken.userId) {
        const session = await storage.createSession(qrLoginToken.userId, req.ip, req.headers["user-agent"]);
        const user = await storage.getUser(qrLoginToken.userId);
        const profile = user ? await storage.getUserProfile(user.id) : null;

        return res.json({
          authenticated: true,
          user: user ? {
            id: user.id,
            email: user.email,
            role: user.role,
            status: user.status,
            firstName: profile?.firstName,
            lastName: profile?.lastName,
          } : null,
          token: session.token,
        });
      }

      res.json({ authenticated: false });
    } catch (error) {
      console.error("QR poll error:", error);
      res.status(500).json({ error: "Failed to check QR status" });
    }
  });

  app.post("/api/auth/logout", authenticateSession as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (req.session?.token) {
        await storage.deleteSession(req.session.token);
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Logout failed" });
    }
  });

  app.get("/api/auth/me", authenticateSession as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const profile = await storage.getUserProfile(req.user.id);
      let additionalProfile = null;

      if (req.user.role === "doctor") {
        additionalProfile = await storage.getDoctorProfile(req.user.id);
      } else if (req.user.role === "hospital_admin") {
        additionalProfile = await storage.getHospitalProfile(req.user.id);
      }

      res.json({
        user: {
          id: req.user.id,
          email: req.user.email,
          role: req.user.role,
          status: req.user.status,
          firstName: profile?.firstName,
          lastName: profile?.lastName,
        },
        profile,
        additionalProfile,
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Failed to get user data" });
    }
  });

  app.post("/api/auth/2fa/setup", authenticateSession as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const { type } = req.body;
      
      if (!["totp", "sms", "email"].includes(type)) {
        return res.status(400).json({ error: "Invalid 2FA type" });
      }

      const secret = type === "totp" ? require("crypto").randomBytes(20).toString("hex") : undefined;
      
      await storage.create2FAMethod(req.user.id, type, secret);
      await storage.updateUser(req.user.id, { twoFactorEnabled: true });

      res.json({
        success: true,
        secret: type === "totp" ? secret : undefined,
        message: `${type.toUpperCase()} 2FA has been set up`,
      });
    } catch (error) {
      console.error("2FA setup error:", error);
      res.status(500).json({ error: "Failed to set up 2FA" });
    }
  });

  app.post("/api/auth/2fa/challenge", authenticateSession as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const { action } = req.body;
      
      if (!["grant_access", "sell_data", "emergency_settings"].includes(action)) {
        return res.status(400).json({ error: "Invalid action" });
      }

      const otp = generateOTP();
      const otpHash = hashOTP(otp);
      
      await storage.create2FAChallenge(req.user.id, action, otpHash);

      res.json({
        success: true,
        message: "2FA challenge created. Check your email/phone for the code.",
        code: process.env.NODE_ENV === "development" ? otp : undefined,
      });
    } catch (error) {
      console.error("2FA challenge error:", error);
      res.status(500).json({ error: "Failed to create 2FA challenge" });
    }
  });

  app.post("/api/auth/2fa/verify", authenticateSession as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const data = verify2FASchema.parse(req.body);
      const otpHash = hashOTP(data.code);
      
      const verified = await storage.verify2FAChallenge(req.user.id, data.action, otpHash);
      
      if (!verified) {
        return res.status(400).json({ error: "Invalid or expired code" });
      }

      res.json({ success: true, message: "2FA verified" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      console.error("2FA verify error:", error);
      res.status(500).json({ error: "Failed to verify 2FA" });
    }
  });

  app.post("/api/auth/emergency-code/generate", authenticateSession as any, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const code = await storage.generateEmergencyCode(req.user.id);
      
      res.json({
        emergencyCode: code,
        message: "Save this code securely. It can only be used once.",
      });
    } catch (error) {
      console.error("Emergency code generation error:", error);
      res.status(500).json({ error: "Failed to generate emergency code" });
    }
  });

  app.get("/api/admin/verifications", authenticateSession as any, requireRole("hospital_admin") as any, async (req: AuthenticatedRequest, res) => {
    try {
      const verifications = await storage.getPendingVerifications();
      res.json(verifications);
    } catch (error) {
      console.error("Get verifications error:", error);
      res.status(500).json({ error: "Failed to get verifications" });
    }
  });

  app.post("/api/admin/verifications/:id/approve", authenticateSession as any, requireRole("hospital_admin") as any, requireActiveStatus as any, async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const verification = await storage.updateVerificationRequest(id, {
        status: "approved",
        reviewerId: req.user.id,
      });

      if (verification) {
        await storage.updateUser(verification.userId, { status: "active" });
      }

      res.json({ success: true, message: "Verification approved" });
    } catch (error) {
      console.error("Approval error:", error);
      res.status(500).json({ error: "Failed to approve verification" });
    }
  });

  app.post("/api/admin/verifications/:id/reject", authenticateSession as any, requireRole("hospital_admin") as any, requireActiveStatus as any, async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const verification = await storage.updateVerificationRequest(id, {
        status: "rejected",
        reviewerId: req.user.id,
        rejectionReason: reason,
      });

      if (verification) {
        await storage.updateUser(verification.userId, { status: "rejected" });
      }

      res.json({ success: true, message: "Verification rejected" });
    } catch (error) {
      console.error("Rejection error:", error);
      res.status(500).json({ error: "Failed to reject verification" });
    }
  });

  app.get("/api/hospitals", async (_req, res) => {
    try {
      const hospitals = await storage.getAllHospitals();
      res.json(hospitals);
    } catch (error) {
      console.error("Get hospitals error:", error);
      res.status(500).json({ error: "Failed to get hospitals" });
    }
  });

  app.get("/api/patient/:nftId", async (req, res) => {
    try {
      const { nftId } = req.params;
      const patientRecord = await storage.getPatientRecordByNftId(nftId);
      
      if (!patientRecord) {
        return res.status(404).json({ error: "Patient record not found" });
      }
      
      res.json(patientRecord);
    } catch (error) {
      console.error("Error fetching patient record:", error);
      res.status(500).json({ error: "Failed to fetch patient record" });
    }
  });
  
  app.post("/api/emergency-access/log", async (req, res) => {
    try {
      const validatedData = insertEmergencyAccessLogSchema.parse(req.body);
      
      const accessLog = await storage.createEmergencyAccessLog(validatedData);
      
      res.status(201).json(accessLog);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      console.error("Error creating emergency access log:", error);
      res.status(500).json({ error: "Failed to log emergency access" });
    }
  });
  
  app.get("/api/emergency-access/active/:patientRecordId", async (req, res) => {
    try {
      const { patientRecordId } = req.params;
      const activeLog = await storage.getActiveAccessLog(patientRecordId);
      
      if (!activeLog) {
        return res.status(404).json({ error: "No active access log found" });
      }
      
      res.json(activeLog);
    } catch (error) {
      console.error("Error fetching active access log:", error);
      res.status(500).json({ error: "Failed to fetch access log" });
    }
  });

  return httpServer;
}
