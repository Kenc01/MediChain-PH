import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, QrCode, User, FilePlus, Calendar, Printer, Download, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function PatientManagement() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Patient Management</h2>
        <Button className="gap-2">
          <QrCode className="h-4 w-4" /> Scan Patient QR
        </Button>
      </div>
      
      <div className="grid md:grid-cols-12 gap-6">
        {/* Search Panel */}
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Search</CardTitle>
              <CardDescription>Find patient by details or NFT ID</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Name, DOB, or Wallet Address" className="pl-9" />
              </div>
              <Button className="w-full">Search Registry</Button>
              
              <div className="pt-4 border-t">
                <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Recent Patients</h4>
                <div className="space-y-2">
                  {[
                    { name: "Juan Dela Cruz", id: "0x71...9A21", time: "10 mins ago" },
                    { name: "Maria Santos", id: "0x82...B223", time: "1 hour ago" },
                    { name: "Pedro Penduko", id: "0x11...C991", time: "3 hours ago" },
                  ].map((p, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer transition-colors"
                      onClick={() => setSelectedPatient(p)}
                    >
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {p.name.charAt(0)}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{p.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{p.id}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{p.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Detail View */}
        <div className="md:col-span-8">
          {selectedPatient ? (
            <Card className="h-full">
              <CardHeader className="flex flex-row items-start justify-between border-b pb-6">
                <div className="flex gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{selectedPatient.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="font-mono text-xs">{selectedPatient.id}</Badge>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Verified</Badge>
                    </div>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> Male, 34</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> DOB: Oct 12, 1990</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" title="Print Record"><Printer className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" title="Export Data"><Download className="h-4 w-4" /></Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="timeline" className="w-full">
                  <div className="border-b px-6">
                    <TabsList className="h-12 bg-transparent p-0">
                      <TabsTrigger value="timeline" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-full px-4">Medical Timeline</TabsTrigger>
                      <TabsTrigger value="add" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-full px-4">Add Record</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="timeline" className="p-6 space-y-6">
                    {[
                      { date: "Dec 01, 2024", title: "Complete Blood Count", type: "Lab Result", doctor: "Dr. A. Lim" },
                      { date: "Nov 15, 2024", title: "Viral Infection Treatment", type: "Diagnosis", doctor: "Dr. B. Tan" },
                    ].map((record, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="h-3 w-3 rounded-full bg-primary" />
                          <div className="w-0.5 h-full bg-border mt-2" />
                        </div>
                        <div className="pb-6">
                          <p className="text-sm font-mono text-muted-foreground mb-1">{record.date}</p>
                          <Card className="w-full min-w-[300px]">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold">{record.title}</h4>
                                <Badge variant="secondary">{record.type}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Attending: {record.doctor}</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="add" className="p-6">
                    <div className="space-y-4 max-w-lg">
                      <div className="space-y-2">
                        <Label>Record Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lab">Laboratory Result</SelectItem>
                            <SelectItem value="diagnosis">Clinical Diagnosis</SelectItem>
                            <SelectItem value="prescription">Prescription</SelectItem>
                            <SelectItem value="imaging">Imaging (X-Ray, MRI)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Diagnosis / Title</Label>
                        <Input placeholder="e.g. Acute Bronchitis" />
                      </div>

                      <div className="space-y-2">
                        <Label>Clinical Notes</Label>
                        <Textarea placeholder="Enter detailed findings..." className="min-h-[100px]" />
                      </div>

                      <div className="pt-4 flex gap-3">
                        <Button className="flex-1 gap-2">
                          <FilePlus className="h-4 w-4" /> Mint & Add Record
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <CheckCircle className="h-4 w-4" /> Request Verification
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Action will be logged on the immutable ledger.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/10 p-12 text-center">
              <div className="max-w-xs space-y-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Select a Patient</h3>
                <p className="text-muted-foreground">Search for a patient or scan their QR code to view records and manage care.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}