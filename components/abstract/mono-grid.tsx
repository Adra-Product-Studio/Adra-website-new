import * as React from "react";

import { cn } from "@/lib/utils";

type MonoGridProps = {
  className?: string;
};

export function MonoGrid({ className }: MonoGridProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0",
        "[background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)]",
        "[background-size:72px_72px]",
        "opacity-25",
        "[mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_75%)]",
        className
      )}
    />
  );
}
