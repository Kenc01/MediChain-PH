import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Users, Activity, FileText, AlertCircle, CheckCircle2, Clock } from "lucide-react";

export default function HospitalDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hospital Administration</h1>
          <p className="text-muted-foreground">St. Luke's Medical Center - Global City</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Node Active
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
            <Activity className="w-3 h-3 mr-1" /> Syncing
          </Badge>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard 
          title="Total Patients" 
          value="12,450" 
          change="+12% this month"
          icon={<Users className="h-4 w-4 text-muted-foreground" />} 
        />
        <StatsCard 
          title="Records Added" 
          value="1,203" 
          change="+8% this week"
          icon={<FileText className="h-4 w-4 text-muted-foreground" />} 
        />
        <StatsCard 
          title="Access Requests" 
          value="45" 
          change="12 pending"
          icon={<AlertCircle className="h-4 w-4 text-amber-500" />} 
        />
        <StatsCard 
          title="Daily Admissions" 
          value="128" 
          change="Normal volume"
          icon={<Building2 className="h-4 w-4 text-muted-foreground" />} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Access Requests */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Access Requests</CardTitle>
            <CardDescription>Pending data access requests from other institutions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { hospital: "Makati Medical Center", patient: "Juan Dela Cruz", purpose: "Emergency Transfer", time: "10 mins ago", status: "Urgent" },
                { hospital: "The Medical City", patient: "Maria Santos", purpose: "Specialist Referral", time: "2 hours ago", status: "Standard" },
                { hospital: "PGH", patient: "Pedro Penduko", purpose: "History Review", time: "5 hours ago", status: "Standard" },
              ].map((req, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{req.hospital}</span>
                      {req.status === "Urgent" && <Badge variant="destructive" className="text-[10px] h-5">Urgent</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">Re: {req.patient} • {req.purpose}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Deny</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-muted-foreground">View All Requests</Button>
          </CardFooter>
        </Card>

        {/* Audit Log */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Access Audit</CardTitle>
            <CardDescription>Log of patient data accessed by staff.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
              {[
                { user: "Dr. A. Lim", action: "Viewed Record", target: "Patient #8821", time: "Just now" },
                { user: "Nurse J. Cruz", action: "Added Vitals", target: "Patient #9920", time: "5 mins ago" },
                { user: "Dr. B. Tan", action: "Minted NFT", target: "Lab Result #1029", time: "15 mins ago" },
                { user: "System", action: "Backup Sync", target: "Blockchain Node", time: "1 hour ago" },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{log.user}</p>
                      <p className="text-xs text-muted-foreground">{log.action} • {log.target}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{log.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}