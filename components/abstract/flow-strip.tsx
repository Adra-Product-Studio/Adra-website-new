import * as React from "react";

import { cn } from "@/lib/utils";

type FlowStripProps = {
  className?: string;
  steps?: Array<{ title: string; desc?: string }>;
};

export function FlowStrip({
  className,
  steps = [
    { title: "Align", desc: "Goal, constraints, success signal" },
    { title: "Shape", desc: "Scope, UX, architecture decisions" },
    { title: "Ship", desc: "Short cycles, demos, QA" },
    { title: "Handoff", desc: "Docs, training, ownership transfer" }
  ]
}: FlowStripProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-background/60 p-6",
        "backdrop-blur supports-[backdrop-filter]:bg-background/40",
        className
      )}
    >
      <div className="grid gap-6 sm:grid-cols-4">
        {steps.map((s, idx) => (
          <div key={s.title} className="relative">
            <div className="relative z-10 flex items-center gap-3">
              <div className="relative">
                <div className="h-2.5 w-2.5 rounded-full bg-foreground/60" />
                <div className="absolute -inset-2 rounded-full border border-foreground/15" />
              </div>
              <div className="rounded bg-background/90 px-1.5 text-sm font-medium">
                {s.title}
              </div>
            </div>
            {s.desc ? (
              <div className="relative z-10 mt-2 text-xs leading-relaxed text-muted-foreground">
                {s.desc}
              </div>
            ) : null}

            {idx < steps.length - 1 ? (
              <div
                aria-hidden
                className="absolute left-1.5 top-3 z-0 hidden h-0.5 w-full -translate-x-0 bg-gradient-to-r from-border/0 via-border/70 to-border/0 sm:block"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
