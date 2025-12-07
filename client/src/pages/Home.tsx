import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Database, Activity, Lock } from "lucide-react";
import heroBg from "@assets/stock_images/abstract_medical_tec_7e32e9f6.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Medical Technology Background" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary mb-6">
                  Now Live in Philippines Beta
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground sm:text-7xl">
                  Your Health Data, <br />
                  <span className="text-primary">Secured & Owned</span> <br />
                  by You.
                </h1>
                <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                  MediChain-PH leverages blockchain technology to give Filipino patients complete control over their medical history. Secure, interoperable, and immutable.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Link to="/dashboard">
                  <Button size="lg" className="h-12 px-8 text-lg gap-2 shadow-lg shadow-primary/20">
                    Access My Records <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                  For Healthcare Providers
                </Button>
              </motion.div>
            </div>

            {/* Decorative Element */}
            <motion.div 
              className="flex-1 w-full max-w-md md:max-w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative aspect-square rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 p-8 animate-in fade-in zoom-in duration-1000">
                <div className="absolute inset-0 rounded-full border border-primary/10 animate-[spin_10s_linear_infinite]" />
                <div className="w-full h-full rounded-2xl bg-card shadow-2xl border flex items-center justify-center p-8 backdrop-blur-sm bg-card/80">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <FeatureCard icon={<Shield className="h-8 w-8 text-primary" />} title="Encrypted" />
                    <FeatureCard icon={<Database className="h-8 w-8 text-primary" />} title="Immutable" />
                    <FeatureCard icon={<Activity className="h-8 w-8 text-primary" />} title="Real-time" />
                    <FeatureCard icon={<Lock className="h-8 w-8 text-primary" />} title="Private" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why MediChain-PH?</h2>
            <p className="text-lg text-muted-foreground">
              We address the fragmentation of medical records across hospitals and clinics in the Philippines using decentralized ledger technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <InfoCard 
              title="Universal Access" 
              description="Access your records from any accredited clinic or hospital in the network instantly."
            />
            <InfoCard 
              title="Patient Sovereignty" 
              description="You decide who sees your data. Grant and revoke access with a single click."
            />
            <InfoCard 
              title="Tamper-Proof History" 
              description="Every diagnosis and prescription is recorded on the blockchain, preventing fraud and errors."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-background rounded-xl shadow-sm border text-center hover:scale-105 transition-transform">
      <div className="mb-2 bg-primary/10 p-3 rounded-full">{icon}</div>
      <span className="font-semibold text-sm">{title}</span>
    </div>
  );
}

function InfoCard({ title, description }: { title: string, description: string }) {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Activity className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}