import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmergencyAccessLogSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
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
