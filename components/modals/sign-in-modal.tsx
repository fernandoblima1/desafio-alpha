"use client";

import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { Modal } from "@/components/shared/modal";
import { toast } from "sonner";

export const SignInModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [taxNumber, setTaxNumber] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const signInModal = useSigninModal();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login(taxNumber, password);
      toast("Sucesso!", {
        description: "Você logou com sucesso.",
      });
      signInModal.onClose();
    } catch (error) {
      console.error(error);
      toast("Oops...", {
        description: "Credenciais inválidas. Por favor, tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <Icons.logo className="h-10 w-10" />

          <h3 className="font-urban text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Unlock AI-Powered Money Management. Sign in seamlessly to access
            tailored financial insights, customized budget tracking and spending
            analysis from Badget.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          <input
            type="text"
            placeholder="CPF ou CNPJ"
            value={taxNumber}
            onChange={(e) => setTaxNumber(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <Button variant="default" disabled={isLoading} onClick={handleLogin}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.lock className="mr-2 h-4 w-4" />
            )}
            Sign In
          </Button>
        </div>
      </div>
    </Modal>
  );
};
