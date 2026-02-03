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
  // Layout: stages flow outward on a subtle spiral to show evolution and scaling.
  const positions = Array.from({ length: nodes.length }, (_, i) => {
    const t = nodes.length === 1 ? 0 : i / (nodes.length - 1);
    const angle = -Math.PI / 2 + t * Math.PI * 2.2;
    const r = 42 + t * 96;
    const x = 160 + Math.cos(angle) * r;
    const y = 160 + Math.sin(angle) * r;
    return {
      x,
      y,
      size: 3.5 + t * 3.5,
      glow: 10 + t * 6,
      labelOffset: {
        x: Math.cos(angle) * 14,
        y: Math.sin(angle) * 14
      }
    };
  });
  const pathD = positions
    .map((p, index) => `${index === 0 ? "M" : "L"}${p.x} ${p.y}`)
    .join(" ");

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
        aria-label="A flowing diagram showing stages evolving from core strategy to scaled outcomes."
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
          <linearGradient id="flowLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="70%" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Soft vignette */}
        <circle cx="160" cy="160" r="150" fill="url(#fade)" />

        {/* Evolution flow */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#flowLine)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="3 9"
          className="animate-dash"
        />
        <g opacity="0.7">
          <circle r="3.2" fill="currentColor" opacity="0.65" />
          <animateMotion
            dur="14s"
            repeatCount="indefinite"
            rotate="auto"
            path={pathD}
            keyTimes="0;1"
            keySplines="0.42 0 0.58 1"
            calcMode="spline"
          />
        </g>
        <g opacity="0.55">
          <circle r="2.6" fill="currentColor" opacity="0.5" />
          <animateMotion
            begin="-5s"
            dur="18s"
            repeatCount="indefinite"
            rotate="auto"
            path="M164 112 C196 118 220 142 228 168 C236 194 224 222 198 234 C172 246 144 238 128 214 C112 190 118 156 148 138 C178 120 202 120 220 132"
            keyTimes="0;1"
            keySplines="0.45 0 0.55 1"
            calcMode="spline"
          />
        </g>
        <g opacity="0.5">
          <rect
            x="-2"
            y="-2"
            width="4"
            height="4"
            rx="1"
            fill="currentColor"
            opacity="0.5"
          />
          <animateMotion
            begin="-9s"
            dur="22s"
            repeatCount="indefinite"
            rotate="auto"
            path="M120 150 C136 124 164 112 192 120 C220 128 238 156 236 186 C234 216 206 236 176 232 C146 228 124 202 126 174 C128 146 146 134 168 130"
            keyTimes="0;1"
            keySplines="0.4 0 0.6 1"
            calcMode="spline"
          />
        </g>

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
            style={{ animationDelay: `${idx * 0.5}s` }}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={p.glow}
              fill="url(#nodeGlow)"
              opacity="0.25"
              className="animate-pulse-soft"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r={p.size}
              fill="currentColor"
              opacity={0.55 + idx * 0.04}
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
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/65 px-2.5 py-1 text-[11px] font-medium text-foreground/75 shadow-[0_0_12px_rgba(8,10,18,0.2)] backdrop-blur-sm animate-handoff"
            style={{
              left: `calc(${(p.x / 320) * 100}% + ${p.labelOffset.x}px)`,
              top: `calc(${(p.y / 320) * 100}% + ${p.labelOffset.y}px)`,
              animationDelay: `${idx * 0.5}s`
            }}
          >
            {nodes[idx]}
          </div>
        ))}
      </div>
    </div>
  );
}
