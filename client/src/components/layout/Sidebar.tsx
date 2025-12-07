import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, User, Settings, LogOut } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: "patient" | "doctor" | "hospital";
}

export default function Sidebar({ className, role = "patient" }: SidebarProps) {
  const patientLinks = [
    { name: "Dashboard", path: "/patient", icon: LayoutDashboard },
    { name: "Medical Records", path: "/patient/records", icon: FileText },
    { name: "Data Wallet", path: "/patient/wallet", icon: User },
    { name: "Settings", path: "/patient/settings", icon: Settings },
  ];

  const doctorLinks = [
    { name: "Dashboard", path: "/doctor", icon: LayoutDashboard },
    { name: "Patient View", path: "/doctor/patients", icon: User },
    { name: "Records Access", path: "/doctor/access", icon: FileText },
    { name: "Settings", path: "/doctor/settings", icon: Settings },
  ];

  const hospitalLinks = [
    { name: "Dashboard", path: "/hospital", icon: LayoutDashboard },
    { name: "Patient Management", path: "/hospital/patients", icon: User },
    { name: "Analytics", path: "/hospital/analytics", icon: FileText },
    { name: "Settings", path: "/hospital/settings", icon: Settings },
  ];

  const links = role === "doctor" ? doctorLinks : role === "hospital" ? hospitalLinks : patientLinks;

  return (
    <div className={cn("pb-12 w-64 border-r min-h-screen bg-card hidden md:block", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            {role.charAt(0).toUpperCase() + role.slice(1)} Portal
          </h2>
          <div className="space-y-1">
            {links.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                className="w-full justify-start gap-2"
                asChild
              >
                <Link to={link.path}>
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto px-4 py-2 absolute bottom-4 w-64">
        <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}