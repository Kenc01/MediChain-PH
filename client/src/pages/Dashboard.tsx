import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Share2, Eye, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock Data
const MOCK_RECORDS = [
  { id: "REC-001", date: "2024-12-01", type: "Laboratory Result", provider: "St. Luke's Medical Center", doctor: "Dr. Santos", status: "Verified" },
  { id: "REC-002", date: "2024-11-15", type: "Prescription", provider: "Makati Medical Center", doctor: "Dr. Reyes", status: "Active" },
  { id: "REC-003", date: "2024-10-30", type: "Check-up Summary", provider: "The Medical City", doctor: "Dr. Cruz", status: "Verified" },
  { id: "REC-004", date: "2024-09-12", type: "Vaccination Record", provider: "DOH Clinic", doctor: "Nurse Garcia", status: "Verified" },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Juan Dela Cruz (Wallet: 0x71...9A21)</p>
        </div>
        <Button className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" /> Add External Record
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">Next refill: Dec 15</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Access Grants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">Providers with access</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <Tabs defaultValue="records" className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="records" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search records..." 
                className="pl-8 bg-background" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Medical History</CardTitle>
              <CardDescription>
                A secure log of your health interactions stored on the blockchain.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_RECORDS.filter(r => r.type.toLowerCase().includes(searchTerm.toLowerCase()) || r.provider.toLowerCase().includes(searchTerm.toLowerCase())).map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          {record.type}
                        </div>
                      </TableCell>
                      <TableCell>{record.provider}</TableCell>
                      <TableCell>{record.doctor}</TableCell>
                      <TableCell>
                        <Badge variant={record.status === 'Verified' ? 'default' : 'secondary'} className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Share Record">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>Manage who can view your medical data.</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
              Access Control Module Placeholder
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}