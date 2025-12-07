import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

export default function QRScanner() {
  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/10">
      <div className="p-4 bg-primary/10 rounded-full mb-4">
        <QrCode className="h-8 w-8 text-primary" />
      </div>
      <p className="text-sm font-medium mb-4">Scan Patient QR Code</p>
      <Button variant="outline">Activate Camera</Button>
    </div>
  );
}