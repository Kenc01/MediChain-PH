import { Link, useLocation } from "react-router-dom";
import { Home, User, Stethoscope, Building2, Store } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Patient", path: "/patient", icon: User },
  { name: "Doctor", path: "/doctor", icon: Stethoscope },
  { name: "Hospital", path: "/hospital", icon: Building2 },
  { name: "Market", path: "/marketplace", icon: Store },
];

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t safe-area-bottom"
      data-testid="nav-bottom"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-2 px-1 min-h-[48px] touch-manipulation",
                "transition-colors duration-200",
                active 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
              data-testid={`nav-bottom-${item.name.toLowerCase()}`}
            >
              <Icon className={cn("h-5 w-5 mb-1", active && "scale-110")} />
              <span className={cn(
                "text-[10px] font-medium leading-none",
                active && "font-semibold"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
