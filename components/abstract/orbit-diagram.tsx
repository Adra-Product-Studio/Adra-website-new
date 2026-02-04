import * as React from "react";

import { cn } from "@/lib/utils";

type OrbitDiagramProps = {
  className?: string;
  centerLabel?: string;
};

export function OrbitDiagram({
  className,
  centerLabel = "Adra"
}: OrbitDiagramProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative aspect-square w-full max-w-[420px]",
        className
      )}
    >
      <svg
        viewBox="0 0 320 320"
        className="h-full w-full"
        role="img"
        aria-label="A nonlinear product journey from ambiguity to clarity and growth."
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="clarityLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="60%" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Phase 1: Fuzziness */}
        <g opacity="1">
          <animate
            attributeName="opacity"
            dur="2.6s"
            repeatCount="indefinite"
            values="0;1;1;0"
            keyTimes="0;0.12;0.38;0.48"
            keySplines="0.3 0 0.6 1;0.4 0 0.6 1;0.3 0 0.6 1"
            calcMode="spline"
          />
          <g opacity="0.6">
            <circle cx="126" cy="146" r="2.2" fill="currentColor" opacity="0.3" />
            <circle cx="176" cy="128" r="1.8" fill="currentColor" opacity="0.22" />
            <circle cx="148" cy="182" r="2.1" fill="currentColor" opacity="0.26" />
            <circle cx="198" cy="168" r="1.6" fill="currentColor" opacity="0.2" />
            <circle cx="140" cy="124" r="1.4" fill="currentColor" opacity="0.18" />
            <circle cx="184" cy="148" r="2.4" fill="currentColor" opacity="0.25" />
            <circle cx="152" cy="156" r="1.5" fill="currentColor" opacity="0.2" />
            <circle cx="170" cy="186" r="1.9" fill="currentColor" opacity="0.22" />
            <circle cx="116" cy="170" r="1.6" fill="currentColor" opacity="0.18" />
          </g>
          <g opacity="0.5">
            <circle r="2.4" fill="currentColor" opacity="0.35" />
            <animateMotion
              dur="1.2s"
              repeatCount="indefinite"
              path="M150 150 C136 140 126 146 120 160 C116 172 122 186 136 192 C150 198 164 194 174 184 C184 174 186 160 178 150 C170 140 160 138 150 150"
              keyTimes="0;1"
              keySplines="0.4 0 0.6 1"
              calcMode="spline"
            />
          </g>
          <g opacity="0.4">
            <circle r="2.1" fill="currentColor" opacity="0.28" />
            <animateMotion
              begin="0.2s"
              dur="1.4s"
              repeatCount="indefinite"
              path="M178 140 C196 148 206 164 204 182 C202 200 186 212 168 214 C150 216 134 208 126 194 C118 180 120 162 130 150 C140 138 158 134 178 140"
              keyTimes="0;1"
              keySplines="0.42 0 0.58 1"
              calcMode="spline"
            />
          </g>
        </g>
        <g opacity="1">
          <animate
            attributeName="opacity"
            begin="0.2s"
            dur="2.6s"
            repeatCount="indefinite"
            values="0;0.75;0.75;0"
            keyTimes="0;0.15;0.36;0.46"
            keySplines="0.3 0 0.6 1;0.4 0 0.6 1;0.3 0 0.6 1"
            calcMode="spline"
          />
          <g opacity="0.5">
            <circle cx="138" cy="162" r="1.4" fill="currentColor" opacity="0.18" />
            <circle cx="188" cy="158" r="2" fill="currentColor" opacity="0.24" />
            <circle cx="156" cy="132" r="1.6" fill="currentColor" opacity="0.2" />
            <circle cx="170" cy="176" r="1.7" fill="currentColor" opacity="0.22" />
            <circle cx="120" cy="152" r="1.3" fill="currentColor" opacity="0.16" />
          </g>
        </g>

        {/* Phase 2: Clarity */}
        <g opacity="1">
          <animate
            attributeName="opacity"
            dur="2.6s"
            repeatCount="indefinite"
            values="0;1;1;0"
            keyTimes="0.28;0.42;0.62;0.72"
            keySplines="0.2 0 0.6 1;0.4 0 0.6 1;0.2 0 0.6 1"
            calcMode="spline"
          />
          <path
            d="M118 188 C134 150 168 128 202 138 C236 148 244 182 220 206 C196 230 156 232 130 212"
            fill="none"
            stroke="url(#clarityLine)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="6 8"
          />
          <g opacity="0.7">
            <circle cx="132" cy="180" r="2" fill="currentColor" opacity="0.4">
              <animate
                attributeName="cx"
                dur="2.6s"
                repeatCount="indefinite"
                values="128;132;132"
                keyTimes="0.28;0.42;0.62"
                keySplines="0.2 0 0.6 1;0.4 0 0.6 1"
                calcMode="spline"
              />
              <animate
                attributeName="cy"
                dur="2.6s"
                repeatCount="indefinite"
                values="174;180;180"
                keyTimes="0.28;0.42;0.62"
                keySplines="0.2 0 0.6 1;0.4 0 0.6 1"
                calcMode="spline"
              />
              <animate
                attributeName="opacity"
                dur="2.6s"
                repeatCount="indefinite"
                values="0.2;0.55;0.55"
                keyTimes="0.28;0.42;0.62"
                keySplines="0.2 0 0.6 1;0.4 0 0.6 1"
                calcMode="spline"
              />
            </circle>
            <circle cx="162" cy="150" r="2.4" fill="currentColor" opacity="0.45">
              <animate
                attributeName="cx"
                dur="2.6s"
                repeatCount="indefinite"
                values="158;162;162"
                keyTimes="0.28;0.42;0.62"
                keySplines="0.2 0 0.6 1;0.4 0 0.6 1"
                calcMode="spline"
              />
              <animate
                attributeName="cy"
                dur="2.6s"
                repeatCount="indefinite"
                values="156;150;150"
                keyTimes="0.28;0.42;0.62"
                keySplines="0.2 0 0.6 1;0.4 0 0.6 1"
                calcMode="spline"
              />
              <animate
                attributeName="opacity"
                dur="2.6s"
                repeatCount="indefinite"
                values="0.25;0.65;0.65"
                keyTimes="0.28;0.42;0.62"
                keySplines="0.2 0 0.6 1;0.4 0 0.6 1"
                calcMode="spline"
              />
            </circle>
            <circle cx="196" cy="156" r="2" fill="currentColor" opacity="0.4">
              <animate
                attributeName="cx"
                dur="2.6s"
                repeatCount="indefinite"
                values="202;196;196"
                keyTimes="0.28;0.42;0.62"
                keySplines="0.2 0 0.6 1;0.4 0 0.6 1"
                calcMode="spline"
              />
              <animate
                attributeName="cy"
                dur="2.6s"
                repeatCount="indefinite"
                values="162;156;156"
                keyTimes="0.28;0.42;0.62"
                keySplines="0.2 0 0.6 1;0.4 0 0.6 1"
                calcMode="spline"
              />
              <animate
                attributeName="opacity"
                dur="2.6s"
                repeatCount="indefinite"
                values="0.2;0.6;0.6"
                keyTimes="0.28;0.42;0.62"
                keySplines="0.2 0 0.6 1;0.4 0 0.6 1"
                calcMode="spline"
              />
            </circle>
          </g>
          <g opacity="0.6">
            <circle r="2.6" fill="currentColor" opacity="0.5" />
            <animateMotion
              dur="1.4s"
              repeatCount="indefinite"
              path="M126 196 C146 170 168 156 190 156 C212 156 224 170 218 190 C212 210 190 220 166 220 C142 220 126 210 126 196"
              keyTimes="0;1"
              keySplines="0.4 0 0.6 1"
              calcMode="spline"
            />
          </g>
        </g>
        <g opacity="1">
          <animate
            attributeName="opacity"
            begin="0.25s"
            dur="2.6s"
            repeatCount="indefinite"
            values="0;0.8;0.8;0"
            keyTimes="0.3;0.46;0.6;0.7"
            keySplines="0.2 0 0.6 1;0.4 0 0.6 1;0.2 0 0.6 1"
            calcMode="spline"
          />
          <circle cx="178" cy="190" r="2.6" fill="currentColor" opacity="0.6" />
          <circle cx="150" cy="206" r="2.2" fill="currentColor" opacity="0.5" />
          <circle cx="206" cy="174" r="2.4" fill="currentColor" opacity="0.55" />
        </g>

        {/* Phase 3: Growth */}
        <g opacity="1">
          <animate
            attributeName="opacity"
            dur="2.6s"
            repeatCount="indefinite"
            values="0;1;1;0"
            keyTimes="0.55;0.68;0.95;1"
            keySplines="0.2 0 0.6 1;0.3 0 0.6 1;0.3 0 0.6 1"
            calcMode="spline"
          />
          <path
            d="M124 214 C146 182 184 164 224 166 C264 168 290 190 294 220"
            fill="none"
            stroke="url(#clarityLine)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M188 176 C202 160 220 150 238 150 C252 150 262 156 270 164"
            fill="none"
            stroke="url(#clarityLine)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M206 192 C224 206 238 218 256 222"
            fill="none"
            stroke="url(#clarityLine)"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.5"
          />
          <g opacity="0.75">
            <circle cx="140" cy="206" r="3.2" fill="currentColor" opacity="0.6">
              <animate
                attributeName="r"
                dur="2.6s"
                repeatCount="indefinite"
                values="2.4;3.6;4"
                keyTimes="0.55;0.72;0.95"
                keySplines="0.2 0 0.6 1;0.3 0 0.6 1"
                calcMode="spline"
              />
            </circle>
            <circle cx="198" cy="186" r="3" fill="currentColor" opacity="0.6">
              <animate
                attributeName="r"
                dur="2.6s"
                repeatCount="indefinite"
                values="2.2;3.4;3.8"
                keyTimes="0.55;0.72;0.95"
                keySplines="0.2 0 0.6 1;0.3 0 0.6 1"
                calcMode="spline"
              />
            </circle>
            <circle cx="246" cy="196" r="3.6" fill="currentColor" opacity="0.65">
              <animate
                attributeName="r"
                dur="2.6s"
                repeatCount="indefinite"
                values="2.6;3.8;4.6"
                keyTimes="0.55;0.72;0.95"
                keySplines="0.2 0 0.6 1;0.3 0 0.6 1"
                calcMode="spline"
              />
            </circle>
          </g>
          <g opacity="0.6">
            <circle r="3" fill="currentColor" opacity="0.6" />
            <animateMotion
              dur="1.6s"
              repeatCount="indefinite"
              path="M170 192 C198 180 220 178 242 186 C264 194 274 210 272 226 C270 242 254 254 230 256 C206 258 186 250 172 236 C158 222 156 204 170 192"
              keyTimes="0;1"
              keySplines="0.38 0 0.6 1"
              calcMode="spline"
            />
          </g>
        </g>

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
    </div>
  );
}
