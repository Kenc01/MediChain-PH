import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Server, Database } from "lucide-react";

const monthlyData = [
  { name: "Jan", admissions: 120, records: 450 },
  { name: "Feb", admissions: 145, records: 520 },
  { name: "Mar", admissions: 160, records: 600 },
  { name: "Apr", admissions: 130, records: 480 },
  { name: "May", admissions: 180, records: 650 },
  { name: "Jun", admissions: 210, records: 780 },
];

const deptData = [
  { name: "Cardiology", value: 35, color: "hsl(var(--primary))" },
  { name: "Pediatrics", value: 25, color: "hsl(var(--secondary))" },
  { name: "Emergency", value: 20, color: "hsl(var(--destructive))" },
  { name: "Oncology", value: 20, color: "#f59e0b" },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Hospital Analytics</h2>
      
      {/* Integration Status */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-green-100 rounded-full">
                 <Server className="h-6 w-6 text-green-600" />
               </div>
               <div>
                 <p className="text-sm font-medium text-muted-foreground">System Status</p>
                 <div className="flex items-center gap-2">
                   <span className="font-bold text-lg">Operational</span>
                   <Badge className="bg-green-500 hover:bg-green-600 h-2 w-2 rounded-full p-0" />
                 </div>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-3 bg-blue-100 rounded-full">
                 <Database className="h-6 w-6 text-blue-600" />
               </div>
               <div>
                 <p className="text-sm font-medium text-muted-foreground">Blockchain Node</p>
                 <div className="flex items-center gap-2">
                   <span className="font-bold text-lg">Synced</span>
                   <span className="text-xs text-muted-foreground">Block #12,405,291</span>
                 </div>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-3 bg-purple-100 rounded-full">
                 <CheckCircle2 className="h-6 w-6 text-purple-600" />
               </div>
               <div>
                 <p className="text-sm font-medium text-muted-foreground">API Requests</p>
                 <div className="flex items-center gap-2">
                   <span className="font-bold text-lg">14.2k</span>
                   <span className="text-xs text-green-600 font-medium">+5% 24h</span>
                 </div>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Patient Volume & Records</CardTitle>
            <CardDescription>Monthly trends for H1 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="admissions" name="Admissions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="records" name="Records Minted" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
           <CardHeader>
             <CardTitle>Department Activity</CardTitle>
             <CardDescription>Distribution of blockchain transactions by department</CardDescription>
           </CardHeader>
           <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={deptData}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={5}
                       dataKey="value"
                     >
                       {deptData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                     <Tooltip />
                     <Legend />
                   </PieChart>
                 </ResponsiveContainer>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}