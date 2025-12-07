import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function EmergencyAccess() {
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardHeader>
        <div className="flex items-center gap-2">
           <AlertTriangle className="h-5 w-5 text-destructive" />
           <CardTitle className="text-destructive">Emergency Access Override</CardTitle>
        </div>
        <CardDescription>
          This will grant temporary access to patient records. All actions are logged on the immutable ledger.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="destructive" className="w-full">Activate Emergency Access</Button>
      </CardContent>
    </Card>
  );
}