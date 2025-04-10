// src/components/ui/Skeleton.tsx
import { clsx } from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx("bg-muted/40 rounded animate-pulse", className)}
    />
  );
}
