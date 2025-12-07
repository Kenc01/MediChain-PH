import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import PatientPortal from "@/pages/PatientPortal";
import DoctorPortal from "@/pages/DoctorPortal";
import HospitalPortal from "@/pages/HospitalPortal";
import Emergency from "@/pages/Emergency";
import Marketplace from "@/pages/Marketplace";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/patient/*" element={<PatientPortal />} />
              <Route path="/doctor/*" element={<DoctorPortal />} />
              <Route path="/hospital/*" element={<HospitalPortal />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;