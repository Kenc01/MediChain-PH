import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  FileText, ShieldCheck, Activity, Users, 
  Upload, Search, Filter, AlertTriangle, 
  Wallet, Share2, Plus, Clock, MapPin, 
  Coins, FileBadge, Lock, ChevronRight 
} from "lucide-react";
import { QrCode } from "lucide-react";

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header with Title and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Health Dashboard</h1>
          <p className="text-muted-foreground">Manage your health data, access, and earnings.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2">
             <QrCode className="h-4 w-4" /> My QR Code
           </Button>
           <Button className="gap-2 bg-destructive hover:bg-destructive/90 text-white">
             <AlertTriangle className="h-4 w-4" /> Emergency Mode
           </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto">
          <TabsTrigger value="overview" className="py-2">Overview</TabsTrigger>
          <TabsTrigger value="records" className="py-2">Records</TabsTrigger>
          <TabsTrigger value="wallet" className="py-2">Data Wallet</TabsTrigger>
          <TabsTrigger value="access" className="py-2">Access</TabsTrigger>
          <TabsTrigger value="emergency" className="py-2">Emergency</TabsTrigger>
          <TabsTrigger value="marketplace" className="py-2">Marketplace</TabsTrigger>
        </TabsList>

        {/* 1. Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Records" value="24" icon={<FileText className="h-4 w-4 text-muted-foreground" />} description="+2 new this month" />
            <StatsCard title="Connected Hospitals" value="3" icon={<Activity className="h-4 w-4 text-muted-foreground" />} description="Verified partners" />
            <StatsCard title="Data Value" value="₱1,250" icon={<Coins className="h-4 w-4 text-muted-foreground" />} description="Potential earnings" />
            <StatsCard title="Security Score" value="98%" icon={<ShieldCheck className="h-4 w-4 text-green-500" />} description="Excellent" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Health Activity</CardTitle>
                <CardDescription>Your latest medical interactions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Laboratory Results", date: "Dec 01, 2024", provider: "St. Luke's Medical Center", type: "Lab" },
                  { title: "Cardiology Checkup", date: "Nov 15, 2024", provider: "Makati Medical Center", type: "Visit" },
                  { title: "Prescription Refill", date: "Oct 30, 2024", provider: "Mercury Drug", type: "Rx" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {item.type}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.provider} • {item.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("records")}>View All Records</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Access Grants</CardTitle>
                <CardDescription>Who can see your data right now.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Dr. Maria Santos", role: "Cardiologist", expiry: "Expires in 2 days" },
                  { name: "Makati Med ER", role: "Emergency", expiry: "Expires in 4 hours" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.role} • {item.expiry}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">Revoke</Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("access")}>Manage Access</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* 2. Medical Records Tab */}
        <TabsContent value="records" className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search records..." 
                  className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Button className="gap-2">
              <Upload className="h-4 w-4" /> Upload Record
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Medical History Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-muted ml-4 space-y-8 pb-4">
                {[
                  { date: "Dec 01", title: "Comprehensive Blood Panel", hospital: "St. Luke's Medical Center", status: "Verified on Blockchain" },
                  { date: "Nov 15", title: "Cardiology Consultation", hospital: "Makati Medical Center", status: "Verified on Blockchain" },
                  { date: "Oct 20", title: "Annual Physical Exam", hospital: "The Medical City", status: "Pending Verification" },
                ].map((record, i) => (
                  <div key={i} className="ml-6 relative">
                    <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border p-4 rounded-lg bg-card shadow-sm">
                      <div>
                        <p className="text-sm font-bold text-muted-foreground mb-1">{record.date}</p>
                        <h3 className="font-semibold text-lg">{record.title}</h3>
                        <p className="text-sm text-muted-foreground">{record.hospital}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={record.status.includes("Pending") ? "secondary" : "default"} className="whitespace-nowrap">
                          {record.status}
                        </Badge>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. Data Wallet Tab */}
        <TabsContent value="wallet" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">My Health NFTs</h2>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Mint New NFT
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden border-2 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
                   <FileBadge className="h-16 w-16 text-primary/40 group-hover:text-primary/60 transition-colors" />
                   <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur text-foreground hover:bg-background/90">
                     ERC-721
                   </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">Lab Results #{1000 + i}</CardTitle>
                    <span className="text-xs text-muted-foreground font-mono">#8X92...A1</span>
                  </div>
                  <CardDescription>Minted on Dec 01, 2024</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Hospital:</span>
                      <span className="font-medium text-foreground">St. Luke's</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Access Count:</span>
                      <span className="font-medium text-foreground">3 Doctors</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 p-3 flex gap-2">
                   <Button variant="outline" size="sm" className="flex-1 text-xs h-8">Transfer</Button>
                   <Button variant="secondary" size="sm" className="flex-1 text-xs h-8 gap-1">
                     <Share2 className="h-3 w-3" /> Share
                   </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 4. Access Control Tab */}
        <TabsContent value="access" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                 <CardTitle>Access Management</CardTitle>
                 <CardDescription>Control who has permission to view your encrypted data.</CardDescription>
               </div>
               <Button className="gap-2">
                 <UserPlus className="h-4 w-4" /> Grant New Access
               </Button>
            </CardHeader>
            <CardContent>
               {/* Access List would go here - reusing previous components for brevity */}
               <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                 Access Control List UI
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 5. Emergency Settings Tab */}
        <TabsContent value="emergency" className="space-y-6">
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader>
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-6 w-6" />
                <CardTitle>Emergency Mode</CardTitle>
              </div>
              <CardDescription>
                When active, any accredited ER doctor can access your critical health data (blood type, allergies, medications) without your explicit approval.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between p-6 bg-background rounded-lg border mx-6 mb-6">
              <div className="space-y-1">
                <Label htmlFor="emergency-mode" className="text-lg font-semibold">Enable Emergency Access</Label>
                <p className="text-sm text-muted-foreground">Allow first responders to scan your QR code for vital info.</p>
              </div>
              <Switch id="emergency-mode" />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center justify-between p-3 border rounded-lg">
                   <div>
                     <p className="font-medium">Maria Dela Cruz (Wife)</p>
                     <p className="text-sm text-muted-foreground">+63 917 123 4567</p>
                   </div>
                   <Button variant="ghost" size="sm">Edit</Button>
                 </div>
                 <Button variant="outline" className="w-full gap-2">
                   <Plus className="h-4 w-4" /> Add Contact
                 </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Critical Data to Share</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center justify-between">
                   <Label>Blood Type (O+)</Label>
                   <Switch defaultChecked disabled />
                 </div>
                 <div className="flex items-center justify-between">
                   <Label>Allergies (Penicillin)</Label>
                   <Switch defaultChecked disabled />
                 </div>
                 <div className="flex items-center justify-between">
                   <Label>Current Medications</Label>
                   <Switch defaultChecked />
                 </div>
                 <div className="flex items-center justify-between">
                   <Label>Recent Surgeries</Label>
                   <Switch />
                 </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 6. Marketplace Tab */}
        <TabsContent value="marketplace" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Research Opportunities</CardTitle>
                <CardDescription>Share anonymized data to earn tokens and help medical science.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Diabetes Management Study", org: "UP Manila", reward: "500 PHP", type: "Survey + Logs" },
                  { title: "Sleep Pattern Analysis", org: "Asian Hospital", reward: "250 PHP", type: "Wearable Data" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                     <div>
                       <h3 className="font-semibold">{item.title}</h3>
                       <p className="text-sm text-muted-foreground">{item.org} • {item.type}</p>
                     </div>
                     <div className="flex items-center gap-3">
                       <Badge variant="secondary" className="text-green-600 bg-green-50 hover:bg-green-100">
                         {item.reward}
                       </Badge>
                       <Button size="sm">Participate</Button>
                     </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Earnings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-4">
                  <span className="text-4xl font-bold text-primary">₱1,250.00</span>
                  <p className="text-sm text-muted-foreground mt-1">Total Earned</p>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span>Pending Payout</span>
                     <span className="font-medium">₱500.00</span>
                   </div>
                   <Progress value={66} className="h-2" />
                </div>
                <Button className="w-full gap-2">
                  <Wallet className="h-4 w-4" /> Withdraw to Wallet
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}

function StatsCard({ title, value, icon, description }: { title: string, value: string, icon: React.ReactNode, description: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function UserPlus({ className }: { className?: string }) {
  return <Users className={className} />;
}
