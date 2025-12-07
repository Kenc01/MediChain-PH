import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function PatientView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Patient Search</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Find Patient Record</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input placeholder="Enter Patient ID, Wallet Address, or Name" className="max-w-md" />
            <Button>
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
          
          <div className="mt-8 text-center py-12 text-muted-foreground bg-muted/10 rounded-lg border border-dashed">
            Search for a patient to view their medical history and active treatments.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}