import { Link, useLocation } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmergencyFAB() {
  const location = useLocation();
  
  if (location.pathname === "/emergency") {
    return null;
  }

  return (
    <Link
      to="/emergency"
      className={cn(
        "fixed z-50 flex items-center justify-center",
        "bg-destructive text-destructive-foreground",
        "shadow-lg shadow-destructive/30",
        "touch-manipulation transition-transform active:scale-95",
        "md:bottom-6 md:right-6 md:h-14 md:w-14 md:rounded-full",
        "bottom-20 right-4 h-12 w-12 rounded-full",
        "animate-pulse hover:animate-none"
      )}
      data-testid="button-emergency-fab"
      aria-label="Emergency Access"
    >
      <AlertTriangle className="h-6 w-6" />
    </Link>
  );
}
