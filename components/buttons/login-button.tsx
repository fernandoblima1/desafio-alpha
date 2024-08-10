"use client";

import { useSigninModal } from "@/hooks/use-signin-modal";
import { Button, buttonVariants } from "@/components/ui/button";

export function LoginButton() {
  const signInModal = useSigninModal();

  return <Button onClick={signInModal.onOpen}>Entrar</Button>;
}
