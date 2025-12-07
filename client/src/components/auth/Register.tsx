import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, User, Stethoscope, Building2, AlertCircle, CheckCircle } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { registerPatient, registerDoctor, registerHospital, isAuthenticated } = useAuth();
  
  const [activeTab, setActiveTab] = useState("patient");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [patientData, setPatientData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    documentType: "",
    documentNumber: "",
  });

  const [doctorData, setDoctorData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    licenseNumber: "",
    issuingBody: "",
    specialization: "",
    hospitalId: "",
  });

  const [hospitalData, setHospitalData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    hospitalName: "",
    licenseNumber: "",
    address: "",
    contactNumber: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (patientData.password !== patientData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (patientData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      await registerPatient({
        email: patientData.email,
        phone: patientData.phone || undefined,
        password: patientData.password,
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        governmentId: patientData.documentNumber ? {
          documentType: patientData.documentType,
          documentNumber: patientData.documentNumber,
        } : undefined,
      });
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (doctorData.password !== doctorData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (doctorData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      await registerDoctor({
        email: doctorData.email,
        phone: doctorData.phone || undefined,
        password: doctorData.password,
        firstName: doctorData.firstName,
        lastName: doctorData.lastName,
        licenseNumber: doctorData.licenseNumber,
        issuingBody: doctorData.issuingBody,
        specialization: doctorData.specialization || undefined,
        hospitalId: doctorData.hospitalId || undefined,
      });
      setSuccess("Registration submitted! Your account is pending admin approval. You will be notified once approved.");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHospitalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (hospitalData.password !== hospitalData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (hospitalData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      await registerHospital({
        email: hospitalData.email,
        phone: hospitalData.phone || undefined,
        password: hospitalData.password,
        firstName: hospitalData.firstName,
        lastName: hospitalData.lastName,
        hospitalName: hospitalData.hospitalName,
        licenseNumber: hospitalData.licenseNumber,
        address: hospitalData.address,
        contactNumber: hospitalData.contactNumber,
      });
      setSuccess("Registration submitted! Your hospital account is pending admin approval. You will be notified once approved.");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle>Registration Submitted</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{success}</p>
            <Button onClick={() => navigate("/login")}>Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Choose your account type to get started</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setStep(1); setError(""); }}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="patient" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Patient</span>
              </TabsTrigger>
              <TabsTrigger value="doctor" className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                <span className="hidden sm:inline">Doctor</span>
              </TabsTrigger>
              <TabsTrigger value="hospital" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Hospital</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="patient" className="mt-4">
              <form onSubmit={handlePatientSubmit} className="space-y-4">
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="p-first-name">First name</Label>
                        <Input
                          id="p-first-name"
                          placeholder="Juan"
                          value={patientData.firstName}
                          onChange={(e) => setPatientData({ ...patientData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="p-last-name">Last name</Label>
                        <Input
                          id="p-last-name"
                          placeholder="Dela Cruz"
                          value={patientData.lastName}
                          onChange={(e) => setPatientData({ ...patientData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="p-email">Email</Label>
                      <Input
                        id="p-email"
                        type="email"
                        placeholder="you@example.com"
                        value={patientData.email}
                        onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="p-phone">Phone (optional)</Label>
                      <Input
                        id="p-phone"
                        type="tel"
                        placeholder="+63 912 345 6789"
                        value={patientData.phone}
                        onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                      />
                    </div>
                    <Button type="button" className="w-full" onClick={() => setStep(2)}>
                      Continue
                    </Button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="p-password">Password</Label>
                      <Input
                        id="p-password"
                        type="password"
                        value={patientData.password}
                        onChange={(e) => setPatientData({ ...patientData, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="p-confirm-password">Confirm Password</Label>
                      <Input
                        id="p-confirm-password"
                        type="password"
                        value={patientData.confirmPassword}
                        onChange={(e) => setPatientData({ ...patientData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="p-doc-type">Government ID Type (optional)</Label>
                      <Select
                        value={patientData.documentType}
                        onValueChange={(v) => setPatientData({ ...patientData, documentType: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="philippine_id">Philippine National ID</SelectItem>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="drivers_license">Driver's License</SelectItem>
                          <SelectItem value="philhealth">PhilHealth ID</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {patientData.documentType && (
                      <div className="space-y-2">
                        <Label htmlFor="p-doc-number">ID Number</Label>
                        <Input
                          id="p-doc-number"
                          placeholder="Enter ID number"
                          value={patientData.documentNumber}
                          onChange={(e) => setPatientData({ ...patientData, documentNumber: e.target.value })}
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" className="w-full" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </TabsContent>

            <TabsContent value="doctor" className="mt-4">
              <form onSubmit={handleDoctorSubmit} className="space-y-4">
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="d-first-name">First name</Label>
                        <Input
                          id="d-first-name"
                          placeholder="Dr. Maria"
                          value={doctorData.firstName}
                          onChange={(e) => setDoctorData({ ...doctorData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="d-last-name">Last name</Label>
                        <Input
                          id="d-last-name"
                          placeholder="Santos"
                          value={doctorData.lastName}
                          onChange={(e) => setDoctorData({ ...doctorData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="d-email">Email</Label>
                      <Input
                        id="d-email"
                        type="email"
                        placeholder="doctor@hospital.com"
                        value={doctorData.email}
                        onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="d-phone">Phone (optional)</Label>
                      <Input
                        id="d-phone"
                        type="tel"
                        placeholder="+63 912 345 6789"
                        value={doctorData.phone}
                        onChange={(e) => setDoctorData({ ...doctorData, phone: e.target.value })}
                      />
                    </div>
                    <Button type="button" className="w-full" onClick={() => setStep(2)}>
                      Continue
                    </Button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="d-license">PRC License Number</Label>
                      <Input
                        id="d-license"
                        placeholder="0123456"
                        value={doctorData.licenseNumber}
                        onChange={(e) => setDoctorData({ ...doctorData, licenseNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="d-issuing">Issuing Body</Label>
                      <Select
                        value={doctorData.issuingBody}
                        onValueChange={(v) => setDoctorData({ ...doctorData, issuingBody: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select issuing body" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prc">Professional Regulation Commission (PRC)</SelectItem>
                          <SelectItem value="pma">Philippine Medical Association</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="d-spec">Specialization (optional)</Label>
                      <Input
                        id="d-spec"
                        placeholder="e.g., Cardiology"
                        value={doctorData.specialization}
                        onChange={(e) => setDoctorData({ ...doctorData, specialization: e.target.value })}
                      />
                    </div>
                    <Button type="button" className="w-full" onClick={() => setStep(3)}>
                      Continue
                    </Button>
                    <Button type="button" variant="outline" className="w-full" onClick={() => setStep(1)}>
                      Back
                    </Button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="d-password">Password</Label>
                      <Input
                        id="d-password"
                        type="password"
                        value={doctorData.password}
                        onChange={(e) => setDoctorData({ ...doctorData, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="d-confirm-password">Confirm Password</Label>
                      <Input
                        id="d-confirm-password"
                        type="password"
                        value={doctorData.confirmPassword}
                        onChange={(e) => setDoctorData({ ...doctorData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Doctor accounts require admin approval. You'll be notified once your license is verified.
                      </AlertDescription>
                    </Alert>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" className="w-full" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit for Approval"
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </TabsContent>

            <TabsContent value="hospital" className="mt-4">
              <form onSubmit={handleHospitalSubmit} className="space-y-4">
                {step === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="h-hospital-name">Hospital Name</Label>
                      <Input
                        id="h-hospital-name"
                        placeholder="City General Hospital"
                        value={hospitalData.hospitalName}
                        onChange={(e) => setHospitalData({ ...hospitalData, hospitalName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="h-license">Hospital License Number</Label>
                      <Input
                        id="h-license"
                        placeholder="DOH-XXX-XXXXX"
                        value={hospitalData.licenseNumber}
                        onChange={(e) => setHospitalData({ ...hospitalData, licenseNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="h-address">Hospital Address</Label>
                      <Input
                        id="h-address"
                        placeholder="123 Healthcare St, City"
                        value={hospitalData.address}
                        onChange={(e) => setHospitalData({ ...hospitalData, address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="h-contact">Contact Number</Label>
                      <Input
                        id="h-contact"
                        placeholder="+63 2 1234 5678"
                        value={hospitalData.contactNumber}
                        onChange={(e) => setHospitalData({ ...hospitalData, contactNumber: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="button" className="w-full" onClick={() => setStep(2)}>
                      Continue
                    </Button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <p className="text-sm text-muted-foreground">Administrator Information</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="h-first-name">First name</Label>
                        <Input
                          id="h-first-name"
                          placeholder="Admin"
                          value={hospitalData.firstName}
                          onChange={(e) => setHospitalData({ ...hospitalData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="h-last-name">Last name</Label>
                        <Input
                          id="h-last-name"
                          placeholder="User"
                          value={hospitalData.lastName}
                          onChange={(e) => setHospitalData({ ...hospitalData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="h-email">Admin Email</Label>
                      <Input
                        id="h-email"
                        type="email"
                        placeholder="admin@hospital.com"
                        value={hospitalData.email}
                        onChange={(e) => setHospitalData({ ...hospitalData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="h-phone">Admin Phone (optional)</Label>
                      <Input
                        id="h-phone"
                        type="tel"
                        placeholder="+63 912 345 6789"
                        value={hospitalData.phone}
                        onChange={(e) => setHospitalData({ ...hospitalData, phone: e.target.value })}
                      />
                    </div>
                    <Button type="button" className="w-full" onClick={() => setStep(3)}>
                      Continue
                    </Button>
                    <Button type="button" variant="outline" className="w-full" onClick={() => setStep(1)}>
                      Back
                    </Button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="h-password">Password</Label>
                      <Input
                        id="h-password"
                        type="password"
                        value={hospitalData.password}
                        onChange={(e) => setHospitalData({ ...hospitalData, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="h-confirm-password">Confirm Password</Label>
                      <Input
                        id="h-confirm-password"
                        type="password"
                        value={hospitalData.confirmPassword}
                        onChange={(e) => setHospitalData({ ...hospitalData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Hospital accounts require admin approval. You'll be notified once your hospital license is verified.
                      </AlertDescription>
                    </Alert>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" className="w-full" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit for Approval"
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
