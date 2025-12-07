import {
  type User,
  type InsertUser,
  type PatientRecord,
  type InsertPatientRecord,
  type EmergencyAccessLog,
  type InsertEmergencyAccessLog,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPatientRecordByNftId(nftId: string): Promise<PatientRecord | undefined>;
  createPatientRecord(record: InsertPatientRecord): Promise<PatientRecord>;
  
  createEmergencyAccessLog(log: InsertEmergencyAccessLog): Promise<EmergencyAccessLog>;
  getActiveAccessLog(patientRecordId: string): Promise<EmergencyAccessLog | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private patientRecords: Map<string, PatientRecord>;
  private emergencyAccessLogs: Map<string, EmergencyAccessLog>;

  constructor() {
    this.users = new Map();
    this.patientRecords = new Map();
    this.emergencyAccessLogs = new Map();
    this.seedMockData();
  }

  private seedMockData() {
    const mockRecordId = randomUUID();
    const mockRecord: PatientRecord = {
      id: mockRecordId,
      nftId: "HEALTH-NFT-001",
      patientName: "John Doe",
      bloodType: "A+",
      allergies: ["Penicillin", "Peanuts"],
      currentMedications: ["Lisinopril 10mg daily", "Metformin 500mg twice daily"],
      emergencyContacts: [
        { name: "Jane Doe", relationship: "Spouse", phone: "+1-555-0100" },
        { name: "Dr. Sarah Smith", relationship: "Primary Care", phone: "+1-555-0200" },
      ],
      recentRecords: [
        {
          date: "2024-11-15",
          type: "Routine Checkup",
          description: "Annual physical examination - all vitals normal",
          provider: "Dr. Sarah Smith",
        },
        {
          date: "2024-10-03",
          type: "Lab Work",
          description: "Blood glucose monitoring - HbA1c 6.2%",
          provider: "Central Medical Lab",
        },
        {
          date: "2024-08-20",
          type: "Follow-up",
          description: "Blood pressure check - 128/82 mmHg",
          provider: "Dr. Sarah Smith",
        },
      ],
      hospitalHistory: [
        {
          hospital: "City General Hospital",
          date: "2023-03-15",
          reason: "Appendectomy",
          treatment: "Laparoscopic appendectomy - successful recovery",
        },
        {
          hospital: "Memorial Medical Center",
          date: "2021-07-22",
          reason: "Fractured wrist",
          treatment: "Cast application - 6 weeks healing period",
        },
      ],
      doctorNotes: [
        "⚠️ CRITICAL: Patient allergic to Penicillin - risk of anaphylaxis",
        "Monitor blood glucose levels - Type 2 diabetes managed with medication",
        "Blood pressure controlled - continue current medication",
        "No surgical complications from previous procedures",
      ],
      createdAt: new Date("2024-01-01"),
    };
    this.patientRecords.set(mockRecord.id, mockRecord);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPatientRecordByNftId(nftId: string): Promise<PatientRecord | undefined> {
    return Array.from(this.patientRecords.values()).find(
      (record) => record.nftId === nftId,
    );
  }

  async createPatientRecord(insertRecord: InsertPatientRecord): Promise<PatientRecord> {
    const id = randomUUID();
    const record: PatientRecord = {
      ...insertRecord,
      id,
      createdAt: new Date(),
    };
    this.patientRecords.set(id, record);
    return record;
  }

  async createEmergencyAccessLog(insertLog: InsertEmergencyAccessLog): Promise<EmergencyAccessLog> {
    const id = randomUUID();
    const log: EmergencyAccessLog = {
      ...insertLog,
      id,
      accessedAt: new Date(),
    };
    this.emergencyAccessLogs.set(id, log);
    return log;
  }

  async getActiveAccessLog(patientRecordId: string): Promise<EmergencyAccessLog | undefined> {
    const now = new Date();
    return Array.from(this.emergencyAccessLogs.values())
      .filter((log) => log.patientRecordId === patientRecordId && log.expiresAt > now)
      .sort((a, b) => b.accessedAt.getTime() - a.accessedAt.getTime())[0];
  }
}

export const storage = new MemStorage();
