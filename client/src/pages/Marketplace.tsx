import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Marketplace() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Health Data Marketplace</h1>
        <p className="text-muted-foreground">Monetize your anonymized health data for research.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
         <Card>
           <CardHeader>
             <div className="flex justify-between items-start">
               <Badge>Research Study</Badge>
               <span className="text-green-600 font-bold">500 PHP</span>
             </div>
             <CardTitle className="mt-2">Diabetes Pattern Analysis</CardTitle>
             <CardDescription>UP Manila Research Inst.</CardDescription>
           </CardHeader>
           <CardContent>
             <p className="text-sm">Looking for anonymized blood sugar logs from patients aged 40-60.</p>
           </CardContent>
           <CardFooter>
             <Button className="w-full">Contribute Data</Button>
           </CardFooter>
         </Card>
      </div>
    </div>
  );
}