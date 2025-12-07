import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-primary mb-4 block">MediChain-PH</Link>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Empowering Filipinos with secure, decentralized, and portable medical records. Your health, your data, your control.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Facebook className="h-4 w-4" />} />
              <SocialLink icon={<Twitter className="h-4 w-4" />} />
              <SocialLink icon={<Instagram className="h-4 w-4" />} />
              <SocialLink icon={<Linkedin className="h-4 w-4" />} />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/patient" className="hover:text-primary transition-colors">Patient Portal</Link></li>
              <li><Link to="/doctor" className="hover:text-primary transition-colors">Doctor Portal</Link></li>
              <li><Link to="/hospital" className="hover:text-primary transition-colors">Hospital Partners</Link></li>
              <li><Link to="/marketplace" className="hover:text-primary transition-colors">Data Marketplace</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/compliance" className="hover:text-primary transition-colors">Data Privacy Act</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MediChain-PH. Built for the Philippines healthcare system.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>support@medichain.ph</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-background border hover:border-primary hover:text-primary transition-all">
      {icon}
    </a>
  );
}