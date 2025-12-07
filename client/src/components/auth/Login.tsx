import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Mail, QrCode, Shield, AlertCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login, loginWithEmergencyCode, generateQRToken, pollQRLogin, isAuthenticated } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emergencyCode, setEmergencyCode] = useState("");
  const [qrToken, setQrToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("email");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    if (activeTab === "qr" && qrToken) {
      pollInterval = setInterval(async () => {
        const authenticated = await pollQRLogin(qrToken);
        if (authenticated) {
          navigate("/");
        }
      }, 2000);
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [activeTab, qrToken, pollQRLogin, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmergencyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await loginWithEmergencyCode(email, emergencyCode);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Emergency login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQR = async () => {
    setError("");
    setIsLoading(true);

    try {
      const token = await generateQRToken();
      setQrToken(token);
    } catch (err: any) {
      setError(err.message || "Failed to generate QR code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Choose your preferred login method</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Email</span>
              </TabsTrigger>
              <TabsTrigger value="qr" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">QR</span>
              </TabsTrigger>
              <TabsTrigger value="emergency" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Emergency</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4 mt-4">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="qr" className="space-y-4 mt-4">
              <div className="text-center space-y-4">
                {qrToken ? (
                  <>
                    <div className="p-8 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-4">
                        Scan this code with your MediChain app
                      </p>
                      <div className="bg-white p-4 rounded inline-block">
                        <code className="text-xs break-all">{qrToken}</code>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Waiting for authentication...
                    </p>
                    <Button variant="outline" onClick={handleGenerateQR}>
                      Generate New Code
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground">
                      Use the MediChain mobile app to scan a QR code and log in securely.
                    </p>
                    <Button onClick={handleGenerateQR} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate QR Code"
                      )}
                    </Button>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-4 mt-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Emergency codes can only be used once. After using this code, you'll need to set up a new authentication method.
                </AlertDescription>
              </Alert>
              <form onSubmit={handleEmergencyLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency-email">Email</Label>
                  <Input
                    id="emergency-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency-code">Emergency Code</Label>
                  <Input
                    id="emergency-code"
                    type="text"
                    placeholder="Enter your emergency code"
                    value={emergencyCode}
                    onChange={(e) => setEmergencyCode(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Login with Emergency Code"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
