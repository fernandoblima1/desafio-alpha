"use client";

import { MainNavItem } from "@/types";

import useScroll from "@/hooks/use-scroll";

import { MainNav } from "./main-nav";
import { UserLoggedNav } from "./user-logged-nav";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMounted } from "@/hooks/use-mounted";
import { useAuth } from "../providers/auth-provider";
import { LoginButton } from "../buttons/login-button";

interface NavBarProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
}

export function NavBar({
  items,
  children,
  rightElements,
  scroll = false,
}: NavBarProps) {
  const scrolled = useScroll(50);
  const { token } = useAuth();
  const [currentToken, setCurrentToken] = useState(token);

  useEffect(() => {
    setCurrentToken(token);
  }, [token]);
  return (
    <header
      className={`sticky container top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? "border-b" : "bg-background/0") : "border-b"
      }`}
    >
      <div className="flex h-16 w-full items-center justify-between p-4">
        <MainNav items={items}>{children}</MainNav>
        {token ? <UserLoggedNav /> : <LoginButton />}
      </div>
    </header>
  );
}
