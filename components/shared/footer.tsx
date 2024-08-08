import * as React from "react";

import { socialConfig } from "@/config/social-config";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Icons } from "@/components/shared/icons";

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className, "border-t")}>
      <div className="container flex h-12 flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4 md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={socialConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Luis Fernando
            </a>
            . Open source for{" "}
            <a
              href={socialConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              everyone
            </a>
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
