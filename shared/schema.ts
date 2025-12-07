import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const patientRecords = pgTable("patient_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
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

export const insertPatientRecordSchema = createInsertSchema(patientRecords).omit({
  id: true,
  createdAt: true,
});

export const insertEmergencyAccessLogSchema = createInsertSchema(emergencyAccessLogs).omit({
  id: true,
  accessedAt: true,
});

export type InsertPatientRecord = z.infer<typeof insertPatientRecordSchema>;
export type PatientRecord = typeof patientRecords.$inferSelect;
export type InsertEmergencyAccessLog = z.infer<typeof insertEmergencyAccessLogSchema>;
export type EmergencyAccessLog = typeof emergencyAccessLogs.$inferSelect;
