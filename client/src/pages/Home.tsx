import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  AlertCircle, 
  Coins, 
  UserPlus, 
  Building2, 
  FileBadge, 
  Settings 
} from "lucide-react";
import heroBg from "@assets/stock_images/abstract_medical_tec_7e32e9f6.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Medical Technology Background" 
            className="w-full h-full object-cover opacity-5 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Live on Philippines Mainnet Beta
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
              Own Your <span className="text-primary">Health Data</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-2xl mx-auto">
              Secure NFT Medical Records for Filipinos.
              <br className="hidden md:block" />
              Portable, private, and always under your control.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link to="/patient/register">
                <Button size="xl" className="h-14 px-8 text-lg gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all rounded-full">
                  Get Your Health NFT <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/hospital/login">
                <Button variant="outline" size="xl" className="h-14 px-8 text-lg rounded-full border-2">
                  Hospital Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Value Proposition Cards */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={<ShieldCheck className="h-10 w-10 text-primary" />}
              title="Your Data, Your Control"
              description="Your medical history is minted as an NFT. Only you hold the keys to decrypt and share it."
            />
            <ValueCard 
              icon={<Globe className="h-10 w-10 text-secondary" />}
              title="Access Anywhere"
              description="From Manila to Mindanao, or anywhere in the world. Your records travel with you."
            />
            <ValueCard 
              icon={<AlertCircle className="h-10 w-10 text-destructive" />}
              title="Emergency Ready"
              description="First responders can access critical info (blood type, allergies) instantly via QR code."
            />
            <ValueCard 
              icon={<Coins className="h-10 w-10 text-amber-500" />}
              title="Earn from Data"
              description="Opt-in to share anonymized health data for medical research and earn tokens."
            />
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">Four simple steps to sovereign health data.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

            <StepCard 
              number="01"
              icon={<UserPlus className="h-6 w-6" />}
              title="Sign Up & Verify"
              description="Create your account and verify your identity using a government ID."
            />
            <StepCard 
              number="02"
              icon={<Building2 className="h-6 w-6" />}
              title="Connect Hospitals"
              description="Link your profile with accredited MediChain partner hospitals."
            />
            <StepCard 
              number="03"
              icon={<FileBadge className="h-6 w-6" />}
              title="Get Health NFT"
              description="Your records are minted as a dynamic NFT that updates automatically."
            />
            <StepCard 
              number="04"
              icon={<Settings className="h-6 w-6" />}
              title="Control & Monetize"
              description="Manage access permissions or sell anonymized data to researchers."
            />
          </div>
        </div>
      </section>

      {/* 4. Hospital Partners Section */}
      <section className="py-24 bg-secondary/5 border-y">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12">Trusted by Leading Institutions</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Partner Placeholders */}
             <div className="h-24 flex items-center justify-center bg-background rounded-lg border shadow-sm p-6 font-bold text-xl text-muted-foreground">St. Luke's</div>
             <div className="h-24 flex items-center justify-center bg-background rounded-lg border shadow-sm p-6 font-bold text-xl text-muted-foreground">Makati Med</div>
             <div className="h-24 flex items-center justify-center bg-background rounded-lg border shadow-sm p-6 font-bold text-xl text-muted-foreground">The Medical City</div>
             <div className="h-24 flex items-center justify-center bg-background rounded-lg border shadow-sm p-6 font-bold text-xl text-muted-foreground">PGH</div>
          </div>

          <Button variant="outline" size="lg" className="rounded-full">
            Partner with us
          </Button>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16">What Patients Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Finally, I don't have to carry a thick folder of lab results every time I visit a new specialist. It's all on my phone."
              author="Maria Santos"
              role="Patient, Quezon City"
            />
            <TestimonialCard 
              quote="During an emergency trip to Cebu, the ER doctors accessed my allergy info instantly. MediChain literally saved my life."
              author="Juan Dela Cruz"
              role="Frequent Traveler"
            />
            <TestimonialCard 
              quote="I love that I can actually earn from my data while keeping my identity private. It feels empowering."
              author="Sarah Lim"
              role="Wellness Enthusiast"
            />
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is my medical data publicly visible on the blockchain?</AccordionTrigger>
              <AccordionContent>
                No. Your data is encrypted using military-grade encryption. Only the "hash" (a unique fingerprint) is stored on the public blockchain for verification. The actual data is encrypted and only accessible by you and those you explicitly authorize.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What happens if I lose my phone or password?</AccordionTrigger>
              <AccordionContent>
                MediChain uses a multi-signature recovery process involving your trusted contacts (family members) and KYC verification to help you recover access to your account without compromising security.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is this recognized by the Department of Health (DOH)?</AccordionTrigger>
              <AccordionContent>
                We are currently in a pilot program with select DOH-accredited hospitals and strictly adhere to the Data Privacy Act of 2012.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I earn from my data?</AccordionTrigger>
              <AccordionContent>
                You can opt-in to the "Data Marketplace" where pharmaceutical companies and researchers can request access to anonymized datasets. If your profile matches their criteria, you receive tokens as compensation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="h-14 w-14 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function StepCard({ number, icon, title, description }: { number: string, icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="relative flex flex-col items-center text-center group">
      <div className="w-16 h-16 rounded-full bg-background border-2 border-primary/20 text-primary flex items-center justify-center mb-6 relative z-10 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
        {icon}
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold border-2 border-background">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, author, role }: { quote: string, author: string, role: string }) {
  return (
    <Card className="bg-muted/30 border-none">
      <CardContent className="pt-8">
        <div className="mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="text-amber-500 text-lg">★</span>
          ))}
        </div>
        <blockquote className="text-lg font-medium text-foreground mb-6">
          "{quote}"
        </blockquote>
        <div>
          <div className="font-bold">{author}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </CardContent>
    </Card>
  );
}