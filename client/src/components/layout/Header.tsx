import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuList, 
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import logo from "@assets/generated_images/minimalist_medical_blockchain_logo.png";
import { Wallet, Menu, X } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = () => {
    // Mock connection
    setWalletAddress("0x71C...9A21");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Patient Portal", path: "/patient" },
    { name: "Doctor Portal", path: "/doctor" },
    { name: "Hospital Portal", path: "/hospital" },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="MediChain-PH" className="h-8 w-8 object-contain" />
          <span className="font-bold text-xl tracking-tight text-primary">MediChain-PH</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link 
                    to={item.path} 
                    className={cn(
                      navigationMenuTriggerStyle(), 
                      "bg-transparent hover:bg-accent hover:text-accent-foreground",
                      location.pathname === item.path && "text-primary font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Button 
            variant={walletAddress ? "outline" : "default"} 
            onClick={connectWallet}
            className="gap-2 font-medium"
          >
            <Wallet className="h-4 w-4" />
            {walletAddress ? walletAddress : "Connect Wallet"}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="text-sm font-medium py-2 px-4 hover:bg-accent rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              className="w-full gap-2"
              onClick={connectWallet}
            >
              <Wallet className="h-4 w-4" />
              {walletAddress ? walletAddress : "Connect Wallet"}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}