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
  token: string | null;
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
    let token = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("authToken");
    }
    if (!token) {
      router.push("/");
      router.refresh;
    } else {
      setLoading(false);
    }
  }, [children]);

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

      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", data.token);
      }

      router.push("/dashboard");
      router.refresh();
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
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
    router.push("/");
    router.refresh();
  };
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("authToken");
  }
  return (
    <AuthContext.Provider
      value={{
        token: token,
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
