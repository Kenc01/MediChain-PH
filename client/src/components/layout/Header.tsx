import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { cn } from "@/lib/utils";
import logo from "@assets/generated_images/minimalist_medical_blockchain_logo.png";
import { Wallet, Menu, AlertTriangle, Home, User, Stethoscope, Building2, Store, Wifi, WifiOff } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
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

  const connectWallet = () => {
    setWalletAddress("0x71C...9A21");
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Patient Portal", path: "/patient", icon: User },
    { name: "Doctor Portal", path: "/doctor", icon: Stethoscope },
    { name: "Hospital Portal", path: "/hospital", icon: Building2 },
    { name: "Marketplace", path: "/marketplace", icon: Store },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="MediChain-PH" className="h-7 w-7 md:h-8 md:w-8 object-contain" />
          <span className="font-bold text-lg md:text-xl tracking-tight text-primary hidden xs:inline">MediChain-PH</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
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
                    data-testid={`nav-desktop-${item.name.toLowerCase().replace(" ", "-")}`}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Link to="/emergency">
            <Button variant="destructive" size="sm" className="gap-2" data-testid="button-emergency-desktop">
              <AlertTriangle className="h-4 w-4" />
              Emergency
            </Button>
          </Link>

          <Button 
            variant={walletAddress ? "outline" : "default"} 
            size="sm"
            onClick={connectWallet}
            className="gap-2 font-medium"
            data-testid="button-wallet-desktop"
          >
            <Wallet className="h-4 w-4" />
            {walletAddress ? walletAddress : "Connect Wallet"}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {!isOnline && (
            <div className="flex items-center gap-1 text-amber-600 text-xs" data-testid="status-offline">
              <WifiOff className="h-4 w-4" />
            </div>
          )}
          
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="touch-manipulation"
                data-testid="button-menu-toggle"
              >
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
                      data-testid={`nav-mobile-${item.name.toLowerCase().replace(" ", "-")}`}
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
                  data-testid="nav-mobile-emergency"
                >
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Access
                </Link>
                
                <div className="border-t my-2" />
                
                <Button 
                  className="w-full gap-2 h-12 text-base touch-manipulation"
                  onClick={connectWallet}
                  data-testid="button-wallet-mobile"
                >
                  <Wallet className="h-5 w-5" />
                  {walletAddress ? walletAddress : "Connect Wallet"}
                </Button>
                
                <div className="flex items-center gap-2 mt-4 px-4 text-sm text-muted-foreground">
                  {isOnline ? (
                    <>
                      <Wifi className="h-4 w-4 text-green-500" />
                      <span>Online</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-4 w-4 text-amber-500" />
                      <span>Offline - Using cached data</span>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}