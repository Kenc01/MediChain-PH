import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { name: "Jan", total: 120 },
  { name: "Feb", total: 145 },
  { name: "Mar", total: 160 },
  { name: "Apr", total: 130 },
  { name: "May", total: 180 },
  { name: "Jun", total: 210 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Hospital Analytics</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Consultations</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
           <CardHeader>
             <CardTitle>Department Activity</CardTitle>
           </CardHeader>
           <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <span className="text-sm font-medium">Cardiology</span>
                   <div className="w-1/2 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                   </div>
                   <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-sm font-medium">Pediatrics</span>
                   <div className="w-1/2 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                   </div>
                   <span className="text-sm text-muted-foreground">60%</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-sm font-medium">Emergency</span>
                   <div className="w-1/2 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                   </div>
                   <span className="text-sm text-muted-foreground">90%</span>
                </div>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}