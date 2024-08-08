import { Suspense } from "react";

import { marketingConfig } from "@/config/marketing";
import { NavBar } from "@/components/shared/nav-bar";
import { Footer } from "@/components/shared/footer";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback="...">
        <NavBar items={marketingConfig.mainNav} scroll={true} />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
