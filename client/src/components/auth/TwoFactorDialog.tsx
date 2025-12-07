import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Shield, AlertCircle } from "lucide-react";

interface TwoFactorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: "grant_access" | "sell_data" | "emergency_settings";
  onSuccess: () => void;
  title?: string;
  description?: string;
}

const actionLabels = {
  grant_access: "Grant Access",
  sell_data: "Sell Data",
  emergency_settings: "Change Emergency Settings",
};

export default function TwoFactorDialog({
  open,
  onOpenChange,
  action,
  onSuccess,
  title,
  description,
}: TwoFactorDialogProps) {
  const { request2FAChallenge, verify2FA } = useAuth();
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [devCode, setDevCode] = useState("");

  const handleRequestCode = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await request2FAChallenge(action);
      if (result.code) {
        setDevCode(result.code);
      }
      setStep("verify");
    } catch (err: any) {
      setError(err.message || "Failed to send verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setIsLoading(true);

    try {
      const success = await verify2FA(code, action);
      if (success) {
        onSuccess();
        onOpenChange(false);
        setStep("request");
        setCode("");
        setDevCode("");
      } else {
        setError("Invalid or expired code");
      }
    } catch (err: any) {
      setError(err.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep("request");
    setCode("");
    setError("");
    setDevCode("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {title || "Two-Factor Authentication Required"}
          </DialogTitle>
          <DialogDescription>
            {description || `This action (${actionLabels[action]}) requires additional verification for security.`}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === "request" ? (
          <>
            <p className="text-sm text-muted-foreground">
              Click below to receive a verification code via your registered email or phone.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleRequestCode} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Code"
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="space-y-4">
              {devCode && (
                <Alert>
                  <AlertDescription>
                    Development mode: Your code is <strong>{devCode}</strong>
                  </AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="2fa-code">Verification Code</Label>
                <Input
                  id="2fa-code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("request")}>
                Back
              </Button>
              <Button onClick={handleVerify} disabled={isLoading || code.length !== 6}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
