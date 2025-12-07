import Sidebar from "@/components/layout/Sidebar";
import PatientDashboard from "@/components/patient/Dashboard";
import MedicalRecords from "@/components/patient/MedicalRecords";
import DataWallet from "@/components/patient/DataWallet";
import { Routes, Route } from "react-router-dom";

export default function PatientPortal() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar role="patient" />
      <div className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<PatientDashboard />} />
          <Route path="/records" element={<MedicalRecords />} />
          <Route path="/wallet" element={<DataWallet />} />
        </Routes>
      </div>
    </div>
  );
}