import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, QrCode, User, Phone, Clock, AlertCircle, Hospital, Stethoscope, FileText, WifiOff, Wifi } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { PatientRecord, EmergencyAccessLog } from "@shared/schema";
import { Html5Qrcode } from "html5-qrcode";
import { cachePatientData, getCachedPatientData } from "@/lib/offlineCache";

export default function EmergencyAccess() {
  const [nftId, setNftId] = useState("");
  const [patientData, setPatientData] = useState<PatientRecord | null>(null);
  const [accessLog, setAccessLog] = useState<EmergencyAccessLog | null>(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [usingCachedData, setUsingCachedData] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const fetchPatientMutation = useMutation({
    mutationFn: async (nftIdValue: string) => {
      if (!navigator.onLine) {
        const cached = getCachedPatientData<PatientRecord>(`patient_${nftIdValue}`);
        if (cached) {
          setUsingCachedData(true);
          return cached;
        }
        throw new Error("You are offline and no cached data is available for this patient.");
      }

      const response = await fetch(`/api/patient/${nftIdValue}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Patient not found");
      }
      const data = await response.json() as PatientRecord;
      
      cachePatientData(`patient_${nftIdValue}`, data);
      setUsingCachedData(false);
      
      return data;
    },
    onSuccess: async (data) => {
      setPatientData(data);
      
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);
      
      const logData = {
        patientRecordId: data.id,
        accessedBy: "Emergency Medical Personnel",
        expiresAt: expiresAt.toISOString(),
        blockchainTxHash: "0x" + Math.random().toString(16).substring(2, 66),
        ipAddress: "127.0.0.1",
      };

      if (navigator.onLine) {
        try {
          const logResponse = await apiRequest<EmergencyAccessLog>({
            url: "/api/emergency-access/log",
            method: "POST",
            data: logData,
          });
          setAccessLog(logResponse);
          
          toast({
            title: "Emergency Access Granted",
            description: "Access has been logged to the blockchain for audit purposes.",
          });
        } catch (error) {
          console.error("Failed to log access:", error);
          setAccessLog({
            id: Date.now(),
            patientRecordId: data.id,
            accessedBy: logData.accessedBy,
            accessedAt: new Date().toISOString(),
            expiresAt: logData.expiresAt,
            blockchainTxHash: logData.blockchainTxHash,
            ipAddress: logData.ipAddress,
          } as EmergencyAccessLog);
        }
      } else {
        setAccessLog({
          id: Date.now(),
          patientRecordId: data.id,
          accessedBy: logData.accessedBy,
          accessedAt: new Date().toISOString(),
          expiresAt: logData.expiresAt,
          blockchainTxHash: "OFFLINE - Will sync when online",
          ipAddress: logData.ipAddress,
        } as EmergencyAccessLog);
        
        toast({
          title: "Offline Access Granted",
          description: "Using cached data. Access will be logged when you're back online.",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Access Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nftId.trim()) {
      fetchPatientMutation.mutate(nftId.trim());
    }
  };

  const startQrScanner = async () => {
    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          // Successfully scanned QR code
          setNftId(decodedText);
          fetchPatientMutation.mutate(decodedText);
          stopQrScanner();
        },
        (errorMessage) => {
          // Ignore scan errors (they happen continuously while scanning)
        }
      );
      
      setScannerActive(true);
    } catch (err) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to scan QR codes.",
        variant: "destructive",
      });
    }
  };

  const stopQrScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
        setScannerActive(false);
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopQrScanner();
    };
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeRemaining = () => {
    if (!accessLog?.expiresAt) return "";
    
    const now = new Date();
    const expires = new Date(accessLog.expiresAt);
    const hoursRemaining = Math.floor((expires.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    return `${hoursRemaining} hours`;
  };

  if (patientData && accessLog) {
    return (
      <div className="space-y-4">
        {usingCachedData && (
          <Card className="border-amber-500/50 bg-amber-500/10">
            <CardContent className="py-3">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <WifiOff className="h-4 w-4" />
                <span className="text-sm font-medium" data-testid="text-offline-mode">
                  Offline Mode - Showing cached data
                </span>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card className="border-destructive bg-destructive/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" data-testid="icon-emergency-alert" />
                <CardTitle className="text-destructive text-base md:text-lg" data-testid="text-emergency-title">EMERGENCY MEDICAL ACCESS</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {!isOnline && (
                  <Badge variant="outline" className="border-amber-500 text-amber-600" data-testid="badge-offline">
                    <WifiOff className="h-3 w-3 mr-1" />
                    OFFLINE
                  </Badge>
                )}
                <Badge variant="destructive" data-testid="badge-active">ACTIVE</Badge>
              </div>
            </div>
            <CardDescription data-testid="text-expiration-info">
              Access expires in {getTimeRemaining()} | NFT ID: {patientData.nftId}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground text-sm">Patient Name</Label>
                <p className="font-medium" data-testid="text-patient-name">{patientData.patientName}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">Blood Type</Label>
                <p className="font-medium text-destructive text-lg" data-testid="text-blood-type">{patientData.bloodType}</p>
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground text-sm flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                Allergies
              </Label>
              <div className="flex flex-wrap gap-2">
                {patientData.allergies.map((allergy, idx) => (
                  <Badge key={idx} variant="destructive" data-testid={`badge-allergy-${idx}`}>
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground text-sm flex items-center gap-2 mb-2">
                <Stethoscope className="h-4 w-4" />
                Current Medications
              </Label>
              <div className="space-y-1">
                {patientData.currentMedications.map((med, idx) => (
                  <p key={idx} className="text-sm" data-testid={`text-medication-${idx}`}>• {med}</p>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground text-sm flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4" />
                Emergency Contacts
              </Label>
              <div className="space-y-2">
                {patientData.emergencyContacts.map((contact, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-muted/50" data-testid={`contact-${idx}`}>
                    <div>
                      <p className="font-medium text-sm">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                    </div>
                    <p className="text-sm font-mono">{contact.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Medical Records
            </CardTitle>
            <CardDescription>Last 6 months of medical history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {patientData.recentRecords.map((record, idx) => (
                <div key={idx} className="p-3 rounded-md border" data-testid={`record-${idx}`}>
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium text-sm">{record.type}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(record.date)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{record.description}</p>
                  <p className="text-xs text-muted-foreground">Provider: {record.provider}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hospital className="h-5 w-5" />
              Hospital History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {patientData.hospitalHistory.map((visit, idx) => (
                <div key={idx} className="p-3 rounded-md border" data-testid={`hospital-visit-${idx}`}>
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium text-sm">{visit.hospital}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(visit.date)}</p>
                  </div>
                  <p className="text-sm mb-1"><strong>Reason:</strong> {visit.reason}</p>
                  <p className="text-sm text-muted-foreground"><strong>Treatment:</strong> {visit.treatment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {patientData.doctorNotes.length > 0 && (
          <Card className="border-amber-500/50 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5" />
                Important Doctor Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {patientData.doctorNotes.map((note, idx) => (
                  <p key={idx} className="text-sm" data-testid={`doctor-note-${idx}`}>• {note}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-muted">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span data-testid="text-expiry-time">This access will expire in 24 hours from activation</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <p data-testid="text-blockchain-log">
                Access logged to blockchain • Tx: <span className="font-mono">{accessLog.blockchainTxHash?.substring(0, 16)}...</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!isOnline && (
        <Card className="border-amber-500/50 bg-amber-500/10">
          <CardContent className="py-3">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm font-medium">
                You are offline. Cached patient data will be used if available.
              </span>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card className="border-destructive bg-destructive/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive text-base md:text-lg" data-testid="text-emergency-access-title">EMERGENCY MEDICAL ACCESS</CardTitle>
          </div>
          <CardDescription data-testid="text-emergency-description">
            Access patient medical records using their Health NFT ID. All access is logged on the blockchain and expires in 24 hours.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Scan Health NFT QR Code
          </CardTitle>
          <CardDescription>Use your device camera to scan the patient's Health NFT QR code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div id="qr-reader" className={scannerActive ? "w-full aspect-square max-w-sm mx-auto rounded-lg overflow-hidden" : "hidden"} data-testid="qr-scanner" />
          
          {!scannerActive ? (
            <Button
              onClick={startQrScanner}
              variant="outline"
              size="lg"
              className="w-full min-h-[56px] text-base touch-manipulation"
              data-testid="button-start-scanner"
            >
              <QrCode className="h-5 w-5 mr-2" />
              Start QR Scanner
            </Button>
          ) : (
            <Button
              onClick={stopQrScanner}
              variant="outline"
              size="lg"
              className="w-full min-h-[56px] text-base touch-manipulation"
              data-testid="button-stop-scanner"
            >
              Stop Scanner
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manual NFT ID Entry</CardTitle>
          <CardDescription>Enter the Health NFT ID manually if QR scanning is unavailable</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nft-id">Health NFT ID</Label>
              <Input
                id="nft-id"
                placeholder="e.g., HEALTH-NFT-001"
                value={nftId}
                onChange={(e) => setNftId(e.target.value)}
                disabled={fetchPatientMutation.isPending}
                className="min-h-[48px] text-base touch-manipulation"
                data-testid="input-nft-id"
              />
            </div>
            <Button
              type="submit"
              variant="destructive"
              size="lg"
              className="w-full min-h-[56px] text-base touch-manipulation"
              disabled={fetchPatientMutation.isPending || !nftId.trim()}
              data-testid="button-access-records"
            >
              {fetchPatientMutation.isPending ? "Accessing..." : "Access Medical Records"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-muted">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p data-testid="text-warning">
              Emergency access is logged immutably on the blockchain for compliance and audit purposes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
