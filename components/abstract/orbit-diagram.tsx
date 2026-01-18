import * as React from "react";

import { cn } from "@/lib/utils";

type OrbitDiagramProps = {
  className?: string;
  centerLabel?: string;
  nodes?: string[];
};

export function OrbitDiagram({
  className,
  centerLabel = "Adra",
  nodes = [
    "Product",
    "UX",
    "Full-stack",
    "Data Eng",
    "Data Science",
    "Analytics",
    "Product Ops",
    "Customer Success"
  ]
}: OrbitDiagramProps) {
  // Layout: 8 nodes around a circle.
  const positions = Array.from({ length: nodes.length }, (_, i) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    const r = 120;
    return {
      x: 160 + Math.cos(angle) * r,
      y: 160 + Math.sin(angle) * r
    };
  });

  return (
    <div
      aria-hidden
      className={cn(
        "relative aspect-square w-full max-w-[420px]",
        "rounded-2xl border bg-background/60",
        "backdrop-blur supports-[backdrop-filter]:bg-background/40",
        className
      )}
    >
      <svg
        viewBox="0 0 320 320"
        className="h-full w-full"
        role="img"
        aria-label="A network diagram showing product and engineering capabilities orbiting a central team."
      >
        <defs>
          <radialGradient id="fade" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft vignette */}
        <circle cx="160" cy="160" r="150" fill="url(#fade)" />

        {/* Orbits */}
        <circle
          cx="160"
          cy="160"
          r="120"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <circle
          cx="160"
          cy="160"
          r="78"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="6 10"
          className="animate-dash"
        />

        {/* Connectors */}
        {positions.map((p, idx) => (
          <line
            key={idx}
            x1="160"
            y1="160"
            x2={p.x}
            y2={p.y}
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        ))}

        {/* Center */}
        <g>
          <circle
            cx="160"
            cy="160"
            r="34"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <circle
            cx="160"
            cy="160"
            r="24"
            fill="currentColor"
            opacity="0.05"
          />
        </g>

        {/* Nodes */}
        {positions.map((p, idx) => (
          <g key={idx}>
            <circle
              cx={p.x}
              cy={p.y}
              r="10"
              fill="currentColor"
              opacity="0.05"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r="4"
              fill="currentColor"
              opacity="0.55"
            />
          </g>
        ))}

        {/* Labels */}
        <text
          x="160"
          y="166"
          textAnchor="middle"
          fontSize="12"
          fill="currentColor"
          opacity="0.85"
          style={{ fontWeight: 600, letterSpacing: 0.6 }}
        >
          {centerLabel}
        </text>
      </svg>

      {/* Node labels (HTML for crisp type) */}
      <div className="pointer-events-none absolute inset-0">
        {positions.map((p, idx) => (
          <div
            key={idx}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] text-muted-foreground"
            style={{ left: `${(p.x / 320) * 100}%`, top: `${(p.y / 320) * 100}%` }}
          >
            {nodes[idx]}
          </div>
        ))}
      </div>

      {/* Subtle floating marker */}
      <div className="absolute left-6 top-6 h-2 w-2 rounded-full bg-foreground/30 animate-pulse-soft" />
      <div className="absolute bottom-8 right-10 h-1.5 w-1.5 rounded-full bg-foreground/20 animate-pulse-soft" />
    </div>
  );
}
