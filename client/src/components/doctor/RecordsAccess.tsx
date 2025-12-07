import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RecordsAccess() {
  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold tracking-tight">Access Requests</h2>
       
       <Card>
         <CardHeader>
           <CardTitle>Pending Requests</CardTitle>
           <CardDescription>Requests for patient data access pending approval.</CardDescription>
         </CardHeader>
         <CardContent>
            <p className="text-sm text-muted-foreground">No pending requests at this time.</p>
         </CardContent>
       </Card>

       <Card>
         <CardHeader>
           <CardTitle>Active Permissions</CardTitle>
           <CardDescription>Patients who have granted you access to their records.</CardDescription>
         </CardHeader>
         <CardContent>
           <div className="space-y-4">
             {["Juan Dela Cruz", "Maria Santos", "Pedro Reyes"].map((name, i) => (
               <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                 <div>
                   <p className="font-medium">{name}</p>
                   <p className="text-xs text-muted-foreground">Access Level: Full History</p>
                 </div>
                 <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Active</Badge>
               </div>
             ))}
           </div>
         </CardContent>
       </Card>
    </div>
  );
}