import Sidebar from "@/components/layout/Sidebar";
import DoctorDashboard from "@/components/doctor/Dashboard";
import PatientView from "@/components/doctor/PatientView";
import RecordsAccess from "@/components/doctor/RecordsAccess";
import { Routes, Route } from "react-router-dom";

export default function DoctorPortal() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar role="doctor" />
      <div className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DoctorDashboard />} />
          <Route path="/patients" element={<PatientView />} />
          <Route path="/access" element={<RecordsAccess />} />
        </Routes>
      </div>
    </div>
  );
}