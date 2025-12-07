export interface MedicalRecord {
  id: string;
  patientId: string;
  providerId: string;
  doctorId: string;
  date: string;
  type: string;
  ipfsHash: string;
  encrypted: boolean;
}
