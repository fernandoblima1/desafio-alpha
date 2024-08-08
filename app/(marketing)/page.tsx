import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { socialConfig } from "@/config/social-config";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GetStartedButton } from "@/components/buttons/get-started-button";

import { Icons } from "@/components/shared/icons";

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-12 pt-16 lg:py-28">
        <div className="container flex max-w-[64rem] flex-col items-center gap-5 text-center">
          <Link
            href={socialConfig.links.linkedin}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "animate-fade-up opacity-0"
            )}
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            target="_blank"
          >
            Disponível em <Icons.linkedin className="ml-2 h-4 w-4" />
          </Link>

          <h1
            className="animate-fade-up font-urban text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>
              <span className="relative bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text font-extrabold text-transparent">
                Alpha
              </span>
            </Balancer>
          </h1>

          <p
            className="max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Com nosso sistema de gerenciamento de produtos, você pode
              adicionar, editar e excluir produtos num piscar de olhos.
            </Balancer>
          </p>

          <div
            className="flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <GetStartedButton />
            <Link
              href="https://www.t-alpha.com.br/"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-4"
              )}
            >
              <p>
                <span className="hidden mr-2 sm:inline-block">
                  Vem conhecer a Alpha
                </span>
              </p>
              <Icons.arrowUpRight className=" h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
