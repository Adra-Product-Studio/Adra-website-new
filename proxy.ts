import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const nonce = randomBytes(32).toString("base64");
  const policy = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDevelopment ? " 'unsafe-eval'" : ""}`,
    "script-src-attr 'none'",
    // Radix portals, theme transitions and the illustrations use inline styles.
    // This exception permits CSS only, never inline JavaScript.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src 'self'${isDevelopment ? " ws: wss:" : ""}`,
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    "frame-src 'none'",
    "worker-src 'none'",
    "frame-ancestors 'none'",
    ...(!isDevelopment ? ["upgrade-insecure-requests"] : [])
  ].join("; ");

  // This marketing site has no write endpoints or Server Actions.
  // Revisit this allowlist before adding a form or API.
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new NextResponse("Method Not Allowed", {
      status: 405,
      headers: {
        Allow: "GET, HEAD",
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Security-Policy": policy,
        "Cache-Control": "private, no-store"
      }
    });
  }

  // Always overwrite inbound values: a client must not choose its own nonce/CSP.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", policy);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", policy);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  // Apply to every document, including 404s and prefetches. Only framework
  // assets and the site's known static image paths can bypass document policy.
  matcher: [
    "/((?!_next/static/|_next/image(?:/|$)|images/(?:adra_logo_dark\\.png|adra_logo_light\\.png|studio-brief\\.svg|studio-focus\\.svg|studio-handoff\\.svg|studio-structure\\.svg)$|icon\\.png$).*)"
  ]
};
