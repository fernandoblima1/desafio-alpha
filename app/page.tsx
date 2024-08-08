import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          fontFamily: '"Inter"',
        }}
        tw="bg-white text-black px-16 py-8"
      >
        <div tw="flex space-y-6 pb-12 py-28">
          <div tw="flex max-w-[64rem] flex-col items-center justify-center gap-5 text-center">
            <p
              tw={cn(
                buttonVariants({ variant: "outline" }),
                "border border-stone-300 h-10 py-2 px-4"
              )}
              style={{
                fontFamily: '"Cal Sans"',
              }}
            >
              Introducing on{" "}
              <span tw="ml-2 h-4 w-4">
                <Icons.twitter width="100%" height="100%" />
              </span>
            </p>

            <h1
              tw="font-urban font-extrabold tracking-tight text-7xl"
              style={{
                fontFamily: '"Cal Sans"',
              }}
            >
              Budget Better, Gain More Experience Badget
            </h1>

            <p tw="max-w-[42rem] text-muted-foreground text-xl leading-8">
              Empower your financial management with AI-driven insights, making
              tracking and optimizing your finances effortless.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
