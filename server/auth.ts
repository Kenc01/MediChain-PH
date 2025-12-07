import { randomBytes, scrypt, timingSafeEqual, createHash } from "crypto";
import { promisify } from "util";
import type { Request, Response, NextFunction } from "express";
import { storage } from "./storage";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const [hash, salt] = hashedPassword.split(".");
  const hashBuffer = Buffer.from(hash, "hex");
  const derivedBuffer = (await scryptAsync(password, salt, 64)) as Buffer;
  return timingSafeEqual(hashBuffer, derivedBuffer);
}

export function hashOTP(otp: string): string {
  return createHash("sha256").update(otp).digest("hex");
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateQRToken(): string {
  return randomBytes(16).toString("hex");
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: "patient" | "doctor" | "hospital_admin";
    status: "pending" | "active" | "suspended" | "rejected";
  };
  session?: {
    token: string;
    userId: string;
  };
}

export async function authenticateSession(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No authentication token provided" });
  }

  const token = authHeader.split(" ")[1];
  
  try {
    const session = await storage.getSessionByToken(token);
    
    if (!session) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    const user = await storage.getUser(session.userId);
    
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    };
    req.session = {
      token: session.token,
      userId: session.userId,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Authentication failed" });
  }
}

export function requireRole(...roles: ("patient" | "doctor" | "hospital_admin")[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  };
}

export function requireActiveStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (req.user.status !== "active") {
    return res.status(403).json({ 
      error: "Account not active", 
      status: req.user.status,
      message: req.user.status === "pending" 
        ? "Your account is pending approval" 
        : "Your account has been suspended"
    });
  }

  next();
}

export async function require2FA(
  action: "grant_access" | "sell_data" | "emergency_settings"
) {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const twoFactorCode = req.headers["x-2fa-code"] as string;
    
    if (!twoFactorCode) {
      return res.status(403).json({ 
        error: "2FA required", 
        action,
        message: "This action requires two-factor authentication"
      });
    }

    const otpHash = hashOTP(twoFactorCode);
    const verified = await storage.verify2FAChallenge(req.user.id, action, otpHash);
    
    if (!verified) {
      return res.status(403).json({ error: "Invalid or expired 2FA code" });
    }

    next();
  };
}
