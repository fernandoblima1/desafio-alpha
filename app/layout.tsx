import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
import { fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/auth-provider";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontUrban.variable,
            fontHeading.variable
          )}
        >
          {children}
          <Toaster />
          <ModalProvider />
          <TailwindIndicator />
        </body>
      </html>
    </AuthProvider>
  );
}
