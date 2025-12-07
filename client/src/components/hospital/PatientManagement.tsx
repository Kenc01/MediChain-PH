import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PatientManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Patient Management</h2>
        <Button>Register New Patient</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Admissions</CardTitle>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">List of patients admitted to the hospital facility.</p>
           {/* Table would go here */}
        </CardContent>
      </Card>
    </div>
  );
}