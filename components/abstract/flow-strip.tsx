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
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-2.5 w-2.5 rounded-full bg-foreground/60" />
                <div className="absolute -inset-2 rounded-full border border-foreground/15" />
              </div>
              <div className="text-sm font-medium">{s.title}</div>
            </div>
            {s.desc ? (
              <div className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {s.desc}
              </div>
            ) : null}

            {idx < steps.length - 1 ? (
              <div
                aria-hidden
                className="absolute left-1.5 top-3 hidden h-px w-full -translate-x-0 bg-border sm:block"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
