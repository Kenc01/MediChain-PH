import EmergencyAccess from "@/components/common/EmergencyAccess";
import { AlertTriangle } from "lucide-react";

export default function Emergency() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-destructive/10 rounded-full mb-4">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-3xl font-bold text-destructive mb-2">Emergency Access Portal</h1>
        <p className="text-muted-foreground max-w-md">
          Use only in life-threatening situations. Unauthorized access is a punishable offense under the Data Privacy Act.
        </p>
      </div>
      <div className="w-full max-w-md">
        <EmergencyAccess />
      </div>
    </div>
  );
}