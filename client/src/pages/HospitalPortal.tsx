import Sidebar from "@/components/layout/Sidebar";
import HospitalDashboard from "@/components/hospital/Dashboard";
import PatientManagement from "@/components/hospital/PatientManagement";
import Analytics from "@/components/hospital/Analytics";
import { Routes, Route } from "react-router-dom";

export default function HospitalPortal() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar role="hospital" />
      <div className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HospitalDashboard />} />
          <Route path="/patients" element={<PatientManagement />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
}