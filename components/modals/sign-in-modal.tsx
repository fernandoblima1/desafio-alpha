"use client";

import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { Modal } from "@/components/shared/modal";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  taxNumber: z
    .string()
    .min(11, "CPF ou CNPJ deve ter pelo menos 11 caracteres.")
    .max(14, "CPF ou CNPJ deve ter no máximo 14 caracteres."),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres."),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
  mail: z.string().email("Digite um e-mail válido."),
  phone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 caracteres.")
    .max(15, "Telefone deve ter no máximo 15 caracteres."),
});

export const SignInModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { login, register } = useAuth();
  const signInModal = useSigninModal();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  const handleAuth = async (data: any) => {
    setIsLoading(true);
    try {
      if (isRegister) {
        await register(
          data.name,
          data.taxNumber,
          data.mail,
          data.phone,
          data.password
        );
        toast.success("Sucesso!", {
          description: "Usuário registrado com sucesso.",
        });
      } else {
        await login(data.taxNumber, data.password);
        toast.success("Sucesso!", {
          description: "Você logou com sucesso.",
        });
      }
      signInModal.onClose();
    } catch (error) {
      console.error(error);
      toast.error("Oops...", {
        description: isRegister
          ? "Falha no registro. Por favor, tente novamente."
          : "Credenciais inválidas. Por favor, tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <form onSubmit={handleSubmit(handleAuth)} className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <Icons.lock className="h-10 w-10" />

          <h3 className="font-urban text-2xl font-bold">
            {isRegister ? "Registrar" : "Entrar"}
          </h3>
          <p className="text-sm text-gray-500">
            {isRegister
              ? "Preencha os campos abaixo para criar sua conta."
              : "Digite seu CPF ou CNPJ e senha para acessar sua conta."}
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Nome"
                {...formRegister("name")}
                className="p-2 border rounded"
              />
              {errors.name && (
                <p className="text-red-500">
                  {errors.name.message?.toString()}
                </p>
              )}

              <input
                type="email"
                placeholder="E-mail"
                {...formRegister("mail")}
                className="p-2 border rounded"
              />
              {errors.mail && (
                <p className="text-red-500">
                  {errors.mail.message?.toString()}
                </p>
              )}

              <input
                type="tel"
                placeholder="Telefone"
                {...formRegister("phone")}
                className="p-2 border rounded"
              />
              {errors.phone && (
                <p className="text-red-500">
                  {errors.phone?.message?.toString()}
                </p>
              )}
            </>
          )}
          <input
            type="text"
            placeholder="CPF ou CNPJ"
            {...formRegister("taxNumber")}
            className="p-2 border rounded"
          />
          {errors.taxNumber && (
            <p className="text-red-500">
              {errors.taxNumber?.message?.toString()}
            </p>
          )}

          <input
            type="password"
            placeholder="Senha"
            {...formRegister("password")}
            className="p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500">
              {errors.password?.message?.toString()}
            </p>
          )}

          <Button variant="default" disabled={isLoading} type="submit">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.lock className="mr-2 h-4 w-4" />
            )}
            {isRegister ? "Registrar" : "Entrar"}
          </Button>
          <p
            className="text-sm text-center text-gray-500 cursor-pointer"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Já tem uma conta? Faça login."
              : "Não tem uma conta? Registre-se."}
          </p>
        </div>
      </form>
    </Modal>
  );
};
