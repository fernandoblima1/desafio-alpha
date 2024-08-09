"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  login: (taxNumber: string, password: string) => Promise<void>;
  register: (
    name: string,
    taxNumber: string,
    mail: string,
    phone: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogin = async (taxNumber: string, password: string) => {
    const response = await fetch(
      "https://interview.t-alpha.com.br/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taxNumber, password }),
      }
    );

    if (response.ok) {
      const { data } = await response.json();
      localStorage.setItem("authToken", data.token);

      router.push("/dashboard");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const handleRegister = async (
    name: string,
    taxNumber: string,
    mail: string,
    phone: string,
    password: string
  ) => {
    const response = await fetch(
      "https://interview.t-alpha.com.br/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, taxNumber, mail, phone, password }),
      }
    );

    if (response.ok) {
      await handleLogin(taxNumber, password);
    } else {
      throw new Error("Registration failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
