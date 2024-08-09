import { Skeleton } from "@/components/ui/skeleton";

export function InputSkeleton() {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="h-8 w-full" />
    </div>
  );
}
