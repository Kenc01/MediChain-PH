import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Share2 } from "lucide-react";

const MOCK_RECORDS = [
  { id: "REC-001", date: "2024-12-01", type: "Laboratory Result", provider: "St. Luke's Medical Center", doctor: "Dr. Santos", status: "Verified" },
  { id: "REC-002", date: "2024-11-15", type: "Prescription", provider: "Makati Medical Center", doctor: "Dr. Reyes", status: "Active" },
  { id: "REC-003", date: "2024-10-30", type: "Check-up Summary", provider: "The Medical City", doctor: "Dr. Cruz", status: "Verified" },
];

export default function MedicalRecords() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical History</CardTitle>
        <CardDescription>A secure log of your health interactions stored on the blockchain.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_RECORDS.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    {record.type}
                  </div>
                </TableCell>
                <TableCell>{record.provider}</TableCell>
                <TableCell>{record.doctor}</TableCell>
                <TableCell>
                  <Badge variant={record.status === 'Verified' ? 'default' : 'secondary'} className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Share Record">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}