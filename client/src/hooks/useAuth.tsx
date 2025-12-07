import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface User {
  id: string;
  email: string;
  role: "patient" | "doctor" | "hospital_admin";
  status: "pending" | "active" | "suspended" | "rejected";
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithEmergencyCode: (email: string, emergencyCode: string) => Promise<void>;
  registerPatient: (data: PatientRegistrationData) => Promise<void>;
  registerDoctor: (data: DoctorRegistrationData) => Promise<void>;
  registerHospital: (data: HospitalRegistrationData) => Promise<void>;
  logout: () => Promise<void>;
  generateQRToken: () => Promise<string>;
  pollQRLogin: (token: string) => Promise<boolean>;
  setup2FA: (type: "totp" | "sms" | "email") => Promise<{ secret?: string }>;
  request2FAChallenge: (action: "grant_access" | "sell_data" | "emergency_settings") => Promise<{ code?: string }>;
  verify2FA: (code: string, action: string) => Promise<boolean>;
  generateEmergencyCode: () => Promise<string>;
}

interface PatientRegistrationData {
  email: string;
  phone?: string;
  password: string;
  firstName: string;
  lastName: string;
  governmentId?: {
    documentType: string;
    documentNumber: string;
  };
}

interface DoctorRegistrationData {
  email: string;
  phone?: string;
  password: string;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  issuingBody: string;
  specialization?: string;
  hospitalId?: string;
}

interface HospitalRegistrationData {
  email: string;
  phone?: string;
  password: string;
  firstName: string;
  lastName: string;
  hospitalName: string;
  licenseNumber: string;
  address: string;
  contactNumber: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("authToken"));
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  const fetchUser = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        localStorage.removeItem("authToken");
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const loginWithEmergencyCode = async (email: string, emergencyCode: string) => {
    const response = await fetch("/api/auth/login/emergency", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, emergencyCode }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Emergency login failed");
    }

    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const registerPatient = async (data: PatientRegistrationData) => {
    const response = await fetch("/api/auth/register/patient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }

    const result = await response.json();
    if (result.token) {
      localStorage.setItem("authToken", result.token);
      setToken(result.token);
      setUser(result.user);
    }
  };

  const registerDoctor = async (data: DoctorRegistrationData) => {
    const response = await fetch("/api/auth/register/doctor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }
  };

  const registerHospital = async (data: HospitalRegistrationData) => {
    const response = await fetch("/api/auth/register/hospital", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }

    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    queryClient.clear();
  };

  const generateQRToken = async (): Promise<string> => {
    const response = await fetch("/api/auth/qr/generate", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to generate QR token");
    }

    const data = await response.json();
    return data.qrToken;
  };

  const pollQRLogin = async (qrToken: string): Promise<boolean> => {
    const response = await fetch(`/api/auth/qr/poll/${qrToken}`);

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    
    if (data.authenticated && data.token) {
      localStorage.setItem("authToken", data.token);
      setToken(data.token);
      setUser(data.user);
      return true;
    }

    return false;
  };

  const setup2FA = async (type: "totp" | "sms" | "email"): Promise<{ secret?: string }> => {
    const response = await fetch("/api/auth/2fa/setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to set up 2FA");
    }

    return response.json();
  };

  const request2FAChallenge = async (action: "grant_access" | "sell_data" | "emergency_settings"): Promise<{ code?: string }> => {
    const response = await fetch("/api/auth/2fa/challenge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create 2FA challenge");
    }

    return response.json();
  };

  const verify2FA = async (code: string, action: string): Promise<boolean> => {
    const response = await fetch("/api/auth/2fa/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code, action }),
    });

    return response.ok;
  };

  const generateEmergencyCode = async (): Promise<string> => {
    const response = await fetch("/api/auth/emergency-code/generate", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to generate emergency code");
    }

    const data = await response.json();
    return data.emergencyCode;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithEmergencyCode,
        registerPatient,
        registerDoctor,
        registerHospital,
        logout,
        generateQRToken,
        pollQRLogin,
        setup2FA,
        request2FAChallenge,
        verify2FA,
        generateEmergencyCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
