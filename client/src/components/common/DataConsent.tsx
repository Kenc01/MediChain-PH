import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function DataConsent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Sharing Preferences</CardTitle>
        <CardDescription>Control which parts of your medical history are shared.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="general" className="flex flex-col space-y-1">
            <span>General Health Info</span>
            <span className="font-normal text-xs text-muted-foreground">Blood type, allergies, vaccinations.</span>
          </Label>
          <Switch id="general" defaultChecked />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="history" className="flex flex-col space-y-1">
            <span>Medical History</span>
            <span className="font-normal text-xs text-muted-foreground">Past procedures, diagnoses.</span>
          </Label>
          <Switch id="history" defaultChecked />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="sensitive" className="flex flex-col space-y-1">
            <span>Sensitive Data</span>
            <span className="font-normal text-xs text-muted-foreground">Mental health, reproductive health.</span>
          </Label>
          <Switch id="sensitive" />
        </div>
      </CardContent>
    </Card>
  );
}