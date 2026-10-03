import { expect, test } from "@playwright/test";

test("security headers cover the page, missing routes and public assets", async ({ request }) => {
  for (const [path, status] of [
    ["/", 200],
    ["/missing-security-check", 404],
    ["/missing.png", 404],
    ["/images/adra_logo_dark.png", 200]
  ] as const) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(status);
    const headers = response.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["strict-transport-security"]).toBe("max-age=63072000");
    expect(headers["x-powered-by"]).toBeUndefined();
    if (!path.startsWith("/images/")) {
      expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
      expect(headers["cache-control"]).toContain("no-store");
      const nonce = headers["content-security-policy"].match(/'nonce-([^']+)'/)?.[1];
      const scripts = [...(await response.text()).matchAll(/<script\b([^>]*)>/g)];
      expect(scripts.length).toBeGreaterThan(0);
      for (const script of scripts) expect(script[1]).toContain(`nonce="${nonce}"`);
    }
  }
});

test("document nonces are unpredictable, request-bound and cannot be supplied by clients", async ({
  request
}) => {
  const seen = new Set<string>();
  const variants: Record<string, string>[] = [
    {},
    { "x-nonce": "chosen-by-client", "content-security-policy": "script-src 'unsafe-inline'" },
    { "next-router-prefetch": "1", purpose: "prefetch" },
    { "x-middleware-subrequest": "proxy:proxy:proxy:proxy:proxy" }
  ];
  for (const headers of variants) {
    const response = await request.get("/", { headers });
    expect(response.status()).toBe(200);
    const policy = response.headers()["content-security-policy"];
    const nonce = policy.match(/'nonce-([^']+)'/)?.[1];
    expect(nonce).toBeTruthy();
    expect(Buffer.from(nonce!, "base64").length).toBe(32);
    expect(seen.has(nonce!)).toBe(false);
    seen.add(nonce!);
    expect(policy).not.toContain("chosen-by-client");
    expect(policy.split(";").find((part) => part.trim().startsWith("script-src "))).not.toMatch(
      /unsafe-inline|unsafe-eval/
    );
    expect(policy).toContain("base-uri 'none'");
    expect(policy).toContain("form-action 'none'");
    const html = await response.text();
    const scripts = [...html.matchAll(/<script\b([^>]*)>/g)];
    expect(scripts.length).toBeGreaterThan(0);
    for (const script of scripts) expect(script[1]).toContain(`nonce="${nonce}"`);
  }
});

test("image optimization and private development files are unavailable", async ({ request }) => {
  for (const path of [
    "/_next/image?url=%2Fimages%2Fadra_logo_dark.png&w=128&q=75",
    "/_next/image?url=https%3A%2F%2Fexample.com%2Fimage.png&w=128&q=75",
    "/.env",
    "/.git/config",
    "/package.json",
    "/proxy.ts",
    "/app/page.tsx",
    "/api/unknown"
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
});

test("write methods are rejected and HEAD remains available", async ({ request }) => {
  for (const method of ["POST", "PUT", "PATCH", "DELETE", "OPTIONS"]) {
    const response = await request.fetch("/", { method, data: "security-check" });
    expect(response.status()).toBe(405);
    expect(response.headers().allow).toBe("GET, HEAD");
    expect(await response.text()).toBe("Method Not Allowed");
  }
  const head = await request.head("/");
  expect(head.status()).toBe(200);
  expect((await head.body()).length).toBe(0);
});

test("legacy redirects remain local even with an external return URL", async ({ request }) => {
  for (const section of [
    "home",
    "about",
    "startups",
    "enterprises",
    "capabilities",
    "engagement",
    "clients",
    "contact"
  ]) {
    const response = await request.get(`/${section}?next=https://example.com`, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    const destination = new URL(response.headers().location, response.url());
    expect(destination.origin).toBe(new URL(response.url()).origin);
    expect(destination.pathname).toBe("/");
    expect(destination.hash).toBe(`#${section}`);
  }
});

test("query input is not interpreted as HTML or script", async ({ request }) => {
  const marker = "<script>window.__securityProbe=true</script>";
  const response = await request.get(`/?q=${encodeURIComponent(marker)}`);
  expect(response.status()).toBe(200);
  expect(await response.text()).not.toContain(marker);
});
