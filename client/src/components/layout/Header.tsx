import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuList, 
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import logo from "@assets/generated_images/minimalist_medical_blockchain_logo.png";
import { Menu, AlertTriangle, Home, User, Stethoscope, Building2, Store, Wifi, WifiOff, LogOut, Settings, Shield } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const getPortalPath = () => {
    if (!user) return "/";
    switch (user.role) {
      case "patient": return "/patient";
      case "doctor": return "/doctor";
      case "hospital_admin": return "/hospital";
      default: return "/";
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Patient Portal", path: "/patient", icon: User },
    { name: "Doctor Portal", path: "/doctor", icon: Stethoscope },
    { name: "Hospital Portal", path: "/hospital", icon: Building2 },
    { name: "Marketplace", path: "/marketplace", icon: Store },
  ];

  const getUserInitials = () => {
    if (!user) return "?";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user.email[0].toUpperCase();
  };

  const getRoleLabel = () => {
    if (!user) return "";
    switch (user.role) {
      case "patient": return "Patient";
      case "doctor": return "Doctor";
      case "hospital_admin": return "Hospital Admin";
      default: return "";
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="MediChain-PH" className="h-7 w-7 md:h-8 md:w-8 object-contain" />
          <span className="font-bold text-lg md:text-xl tracking-tight text-primary hidden xs:inline">MediChain-PH</span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link 
                    to={item.path} 
                    className={cn(
                      navigationMenuTriggerStyle(), 
                      "bg-transparent",
                      location.pathname === item.path && "text-primary font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Link to="/emergency">
            <Button variant="destructive" size="sm" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Emergency
            </Button>
          </Link>
          
          <ThemeToggle />

          {isLoading ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                    <p className="text-xs text-primary">{getRoleLabel()}</p>
                    {user?.status === "pending" && (
                      <p className="text-xs text-amber-500">Pending Approval</p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(getPortalPath())}>
                  <User className="mr-2 h-4 w-4" />
                  My Portal
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/security")}>
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button size="sm" onClick={() => navigate("/register")}>
                Sign up
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {!isOnline && (
            <div className="flex items-center gap-1 text-amber-600 text-xs">
              <WifiOff className="h-4 w-4" />
            </div>
          )}
          
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="touch-manipulation">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <img src={logo} alt="MediChain-PH" className="h-6 w-6" />
                  MediChain-PH
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-2 mt-6">
                {isAuthenticated && (
                  <>
                    <div className="px-4 py-3 bg-muted rounded-md">
                      <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <p className="text-xs text-primary mt-1">{getRoleLabel()}</p>
                    </div>
                    <div className="border-t my-2" />
                  </>
                )}

                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.path === "/" 
                    ? location.pathname === "/" 
                    : location.pathname.startsWith(item.path);
                  return (
                    <Link 
                      key={item.name} 
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 text-base font-medium py-3 px-4 rounded-md touch-manipulation min-h-[48px]",
                        isActive ? "bg-primary/10 text-primary" : "text-foreground"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
                
                <div className="border-t my-2" />
                
                <Link 
                  to="/emergency"
                  className="flex items-center gap-3 text-base font-medium py-3 px-4 rounded-md bg-destructive text-destructive-foreground touch-manipulation min-h-[48px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Access
                </Link>
                
                <div className="border-t my-2" />
                
                {isAuthenticated ? (
                  <Button 
                    variant="outline"
                    className="w-full gap-2 h-12 text-base touch-manipulation"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    Log out
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button 
                      className="w-full h-12 text-base touch-manipulation"
                      onClick={() => { navigate("/login"); setIsMenuOpen(false); }}
                    >
                      Login
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full h-12 text-base touch-manipulation"
                      onClick={() => { navigate("/register"); setIsMenuOpen(false); }}
                    >
                      Create Account
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-4 px-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {isOnline ? (
                      <>
                        <Wifi className="h-4 w-4 text-green-500" />
                        <span>Online</span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="h-4 w-4 text-amber-500" />
                        <span>Offline</span>
                      </>
                    )}
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
