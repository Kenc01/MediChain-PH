import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ShieldCheck, Key } from "lucide-react";

export default function DataWallet() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Data Wallet</CardTitle>
          <CardDescription>Manage your decentralized identity and data permissions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
            <div className="p-3 bg-primary/10 rounded-full">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Connected Wallet</p>
              <p className="text-sm text-muted-foreground font-mono">0x71C...9A21</p>
            </div>
            <Button variant="outline" className="ml-auto">Disconnect</Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Privacy Score</h3>
              </div>
              <p className="text-2xl font-bold">98/100</p>
              <p className="text-xs text-muted-foreground">Your data is highly secure.</p>
            </div>
             <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Key className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold">Encryption Keys</h3>
              </div>
              <p className="text-2xl font-bold">Active</p>
              <p className="text-xs text-muted-foreground">Last rotated: 3 months ago.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}