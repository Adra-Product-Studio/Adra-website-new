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
    "Strategy",
    "Discovery",
    "Design",
    "Build",
    "QA",
    "Launch",
    "Growth",
    "Support"
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
        "rounded-2xl border border-white/10 bg-background/70",
        "backdrop-blur supports-[backdrop-filter]:bg-background/50",
        "shadow-[0_0_40px_rgba(8,10,18,0.35)_inset]",
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
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="70%" stopColor="currentColor" stopOpacity="0.06" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <path
            id="outerOrbit"
            d="M160 40 a120 120 0 1 1 -0.1 0"
          />
          <path id="innerOrbit" d="M160 68 a92 92 0 1 1 -0.1 0" />
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
          strokeOpacity="0.2"
          strokeWidth="1"
        />
        <circle
          cx="160"
          cy="160"
          r="92"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeDasharray="10 12"
          className="animate-dash"
        />
        <g className="animate-orbit-slow origin-center">
          <circle
            cx="160"
            cy="160"
            r="78"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray="6 10"
          />
          <circle cx="160" cy="82" r="4" fill="currentColor" opacity="0.55" />
        </g>
        <g className="animate-orbit-reverse origin-center">
          <circle cx="160" cy="238" r="3" fill="currentColor" opacity="0.4" />
        </g>

        {/* Collaboration handoffs */}
        <g opacity="0.85">
          <g>
            <circle r="4.5" fill="currentColor" opacity="0.7">
              <animate
                attributeName="r"
                values="3;6;4"
                dur="10s"
                repeatCount="indefinite"
              />
            </circle>
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              rotate="auto"
              path="M160 40 a120 120 0 1 1 -0.1 0"
            />
          </g>
          <g>
            <rect
              x="-4"
              y="-4"
              width="8"
              height="8"
              rx="1.5"
              fill="currentColor"
              opacity="0.6"
            >
              <animate
                attributeName="rx"
                values="1;4;1"
                dur="12s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="width"
                values="6;10;7"
                dur="12s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="height"
                values="6;10;7"
                dur="12s"
                repeatCount="indefinite"
              />
            </rect>
            <animateMotion
              begin="-4s"
              dur="12s"
              repeatCount="indefinite"
              rotate="auto"
              path="M160 68 a92 92 0 1 1 -0.1 0"
            />
          </g>
          <g>
            <circle r="3.5" fill="currentColor" opacity="0.5">
              <animate
                attributeName="r"
                values="2;5;3"
                dur="8s"
                repeatCount="indefinite"
              />
            </circle>
            <animateMotion
              begin="-6s"
              dur="8s"
              repeatCount="indefinite"
              rotate="auto"
              path="M160 40 a120 120 0 1 1 -0.1 0"
            />
          </g>
        </g>

        {/* Connectors */}
        {positions.map((p, idx) => (
          <line
            key={idx}
            x1="160"
            y1="160"
            x2={p.x}
            y2={p.y}
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray={idx % 2 === 0 ? "6 8" : "0"}
            className={idx % 2 === 0 ? "animate-dash" : undefined}
          />
        ))}

        {/* Center */}
        <g>
          <circle
            cx="160"
            cy="160"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
          <circle
            cx="160"
            cy="160"
            r="26"
            fill="currentColor"
            opacity="0.08"
          />
          <circle
            cx="160"
            cy="160"
            r="42"
            fill="url(#nodeGlow)"
            opacity="0.35"
            className="animate-pulse-soft"
          />
        </g>

        {/* Nodes */}
        {positions.map((p, idx) => (
          <g
            key={idx}
            className="animate-handoff"
            style={{ animationDelay: `${idx * 0.6}s` }}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r="12"
              fill="url(#nodeGlow)"
              opacity="0.35"
              className="animate-pulse-soft"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r="4.5"
              fill="currentColor"
              opacity="0.7"
            />
          </g>
        ))}

        {/* Labels */}
        <text
          x="160"
          y="166"
          textAnchor="middle"
          fontSize="13"
          fill="currentColor"
          opacity="0.9"
          style={{ fontWeight: 600, letterSpacing: 0.8 }}
        >
          {centerLabel}
        </text>
      </svg>

      {/* Node labels (HTML for crisp type) */}
      <div className="pointer-events-none absolute inset-0">
        {positions.map((p, idx) => (
          <div
            key={idx}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-background/70 px-2.5 py-1 text-[11px] font-medium text-foreground/80 shadow-[0_0_18px_rgba(8,10,18,0.25)] backdrop-blur-sm animate-handoff"
            style={{
              left: `${(p.x / 320) * 100}%`,
              top: `${(p.y / 320) * 100}%`,
              animationDelay: `${idx * 0.6}s`
            }}
          >
            {nodes[idx]}
          </div>
        ))}
      </div>

      {/* Subtle floating marker */}
      <div className="absolute left-6 top-6 h-2.5 w-2.5 rounded-full bg-foreground/40 animate-pulse-soft" />
      <div className="absolute bottom-8 right-10 h-1.5 w-1.5 rounded-full bg-foreground/30 animate-pulse-soft" />
    </div>
  );
}
