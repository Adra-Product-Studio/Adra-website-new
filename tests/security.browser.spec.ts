import { test as base, expect, type Page, type Response } from "@playwright/test";

const cspError = /content security policy|violates the following.*directive|refused to (frame|execute|load)/i;

// Every ordinary interaction fails on hydration/runtime errors, blocked assets,
// or CSP violations. Only the deliberate attack tests allow CSP console errors.
const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const errors: string[] = [];
    const failedAssets: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => {
      if (message.type() !== "error") return;
      if (testInfo.annotations.some(a => a.type === "intentional-csp") && cspError.test(message.text())) return;
      errors.push(message.text());
    });
    page.on("response", response => {
      if (response.status() >= 400 && ["script", "stylesheet", "image", "font"].includes(response.request().resourceType())) {
        failedAssets.push(`${response.status()} ${response.url()}`);
      }
    });
    page.on("requestfailed", request => {
      if (request.failure()?.errorText === "net::ERR_ABORTED") return;
      if (["script", "stylesheet", "image", "font"].includes(request.resourceType())) {
        failedAssets.push(`${request.failure()?.errorText} ${request.url()}`);
      }
    });
    await use(page);
    expect(errors, "unexpected browser/CSP errors").toEqual([]);
    expect(failedAssets, "failed application assets").toEqual([]);
  }
});

function responseNonce(response: Response | null) {
  expect(response).not.toBeNull();
  const policy = response!.headers()["content-security-policy"] || "";
  const nonce = policy.match(/'nonce-([^']+)'/)?.[1];
  expect(nonce, "document has a fresh 256-bit nonce").toMatch(/^[A-Za-z0-9+/]{43}=$/);
  const scriptPolicy = policy.split(";").find(part => part.trim().startsWith("script-src "));
  expect(scriptPolicy).toContain("'strict-dynamic'");
  expect(scriptPolicy).not.toMatch(/unsafe-inline|unsafe-eval/);
  return nonce!;
}

async function expectHeadingFocus(page: Page, id: string) {
  const heading = page.locator(`#${id}`).getByRole("heading").first();
  await expect(heading).toBeFocused();
  const inset = await heading.evaluate(element => ({
    top: element.getBoundingClientRect().top,
    headerBottom: document.querySelector("header")!.getBoundingClientRect().bottom
  }));
  expect(inset.top).toBeGreaterThanOrEqual(inset.headerBottom);
}

test("fresh nonces hydrate the app and preserve the selected theme", async ({ page }) => {
  const firstNonce = responseNonce(await page.goto("/"));
  const scriptNonces = await page.locator("script").evaluateAll(scripts =>
    scripts.filter(script => script.textContent || script.getAttribute("src")).map(script => (script as HTMLScriptElement).nonce)
  );
  expect(scriptNonces.length).toBeGreaterThan(0);
  expect(scriptNonces.every(nonce => nonce === firstNonce)).toBe(true);
  await page.getByRole("button", { name: "Toggle theme", exact: true }).click();
  await page.getByRole("menuitemradio", { name: "Dark", exact: true }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  const nextNonce = responseNonce(await page.reload());
  expect(nextNonce).not.toBe(firstNonce);
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: "Toggle theme", exact: true }).click();
  await expect(page.getByRole("menuitemradio", { name: "Dark", exact: true })).toHaveAttribute("aria-checked", "true");
});

test("client-supplied nonce/CSP and prefetch headers cannot select the document nonce", async ({ page }) => {
  const suppliedNonce = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  await page.setExtraHTTPHeaders({
    "x-nonce": suppliedNonce,
    "Content-Security-Policy": `script-src 'nonce-${suppliedNonce}'`,
    "next-router-prefetch": "1",
    Purpose: "prefetch"
  });
  const actualNonce = responseNonce(await page.goto("/"));
  expect(actualNonce).not.toBe(suppliedNonce);
  expect(await page.locator("script[nonce]").first().evaluate(script => (script as HTMLScriptElement).nonce)).toBe(actualNonce);
  await page.getByRole("button", { name: "Toggle theme", exact: true }).click();
  await expect(page.getByRole("menuitemradio", { name: "Light", exact: true })).toBeVisible();
});

test("CSP blocks injected scripts and event handlers but permits the server nonce", async ({ page }) => {
  test.info().annotations.push({ type: "intentional-csp", description: "Two deliberate inline script violations" });
  // Model an HTML injection, not a script created by DevTools/trusted JS:
  // strict-dynamic intentionally propagates trust to non-parser insertions.
  // Only the response body changes; the real production CSP remains enforced.
  await page.route(url => url.pathname === "/", async route => {
    const response = await route.fetch();
    const nonce = response.headers()["content-security-policy"].match(/'nonce-([^']+)'/)![1];
    const probe = `<script nonce="${nonce}">
      document.documentElement.dataset.permittedScript='ran';
      document.documentElement.dataset.cspViolations='[]';
      document.addEventListener('securitypolicyviolation',function(event){
        var list=JSON.parse(document.documentElement.dataset.cspViolations);
        list.push(event.effectiveDirective);
        document.documentElement.dataset.cspViolations=JSON.stringify(list);
      });
    </script>
    <script>document.documentElement.dataset.blockedScript='ran'</script>
    <button id="injected-event-probe" onclick="document.documentElement.dataset.blockedHandler='ran'">Security probe</button>`;
    await route.fulfill({ response, body: (await response.text()).replace("</body>", probe + "</body>") });
  });
  responseNonce(await page.goto("/"));
  await page.locator("#injected-event-probe").click();
  await expect.poll(() => page.evaluate(() => JSON.parse(document.documentElement.dataset.cspViolations || "[]"))).toEqual(
    expect.arrayContaining(["script-src-elem", "script-src-attr"])
  );
  const result = await page.evaluate(() => ({
    blockedScript: document.documentElement.dataset.blockedScript,
    blockedHandler: document.documentElement.dataset.blockedHandler,
    permittedScript: document.documentElement.dataset.permittedScript
  }));
  expect(result.blockedScript).toBeUndefined();
  expect(result.blockedHandler).toBeUndefined();
  expect(result.permittedScript).toBe("ran");
});

test("the production page refuses even same-origin framing", async ({ page, baseURL }) => {
  test.info().annotations.push({ type: "intentional-csp", description: "Deliberate frame-ancestors violation" });
  const blockedMessages: string[] = [];
  page.on("console", message => { if (/frame-ancestors|refused to frame/i.test(message.text())) blockedMessages.push(message.text()); });
  // Only the parent harness is supplied by the test. The framed page is the
  // actual production response, with its own unmodified security headers.
  await page.route("**/__security_frame_harness", route => route.fulfill({
    contentType: "text/html", body: `<title>Embedding probe</title><iframe src="${baseURL}/" title="Target"></iframe>`
  }));
  await page.goto("/__security_frame_harness");
  await expect.poll(() => blockedMessages.length).toBeGreaterThan(0);
  await expect(page.frameLocator("iframe").getByRole("heading", { level: 1 })).toHaveCount(0);
});

test("desktop keyboard navigation preserves focus and browser history", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation", exact: true });
  await nav.getByRole("link", { name: "Startups", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#startups$/);
  await expectHeadingFocus(page, "startups");
  await nav.getByRole("link", { name: "Capabilities", exact: true }).click();
  await expectHeadingFocus(page, "capabilities");
  await page.goBack();
  await expect(page).toHaveURL(/#startups$/);
  await expect(page.locator("#startups h2")).toBeInViewport();
  await page.goForward();
  await expect(page).toHaveURL(/#capabilities$/);
  await expect(page.locator("#capabilities h2")).toBeInViewport();
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`layout stays within ${width}px in light and dark modes`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1020 });
    await page.goto("/");
    for (const mode of ["Light", "Dark"]) {
      await page.getByRole("button", { name: "Toggle theme", exact: true }).click();
      await page.getByRole("menuitemradio", { name: mode, exact: true }).click();
      const dimensions = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      expect(dimensions.scroll, mode).toBeLessThanOrEqual(dimensions.width + 1);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const contact = page.locator("#contact a[href^='mailto:']").first();
      const bounds = await contact.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
    }
  });
}

for (const width of [320, 390]) {
  test(`mobile menu closes, restores focus, and reaches chapters at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open menu", exact: true });
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await trigger.click();
    await page.getByRole("dialog").getByRole("link", { name: "Startups", exact: true }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expectHeadingFocus(page, "startups");
    await trigger.click();
    await expect(page.getByRole("dialog").getByRole("link", { name: "Startups", exact: true })).toHaveAttribute("aria-current", "location");
    await page.getByRole("dialog").locator("a[href='#top']").click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(5);
  });
}

test("FAQ and keyboard story controls remain interactive", async ({ page }) => {
  await page.goto("/");
  const story = page.getByRole("figure", { name: "How Adra turns business goals into a product" });
  const align = story.getByRole("tab", { name: "Align", exact: true });
  await align.focus();
  await page.keyboard.press("ArrowRight");
  await expect(story.getByRole("tab", { name: "Shape", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(story.getByRole("heading", { name: "The direction becomes something you can try." })).toBeVisible();
  const question = page.locator("#questions").getByRole("button").first();
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  const answer = page.locator(`#${await question.getAttribute("aria-controls")}`);
  await expect(answer).toBeVisible();
  expect((await answer.textContent())!.trim().length).toBeGreaterThan(20);
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
});

test("normal-motion story can pause and illustrations can replay without CSP errors", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const story = page.getByRole("figure", { name: "How Adra turns business goals into a product" });
  await story.getByRole("button", { name: "Pause story", exact: true }).click();
  await expect(story).toHaveAttribute("data-artwork-paused", "true");
  await story.getByRole("tab", { name: "Ship", exact: true }).click();
  await expect(story.getByRole("tab", { name: "Ship", exact: true })).toHaveAttribute("aria-selected", "true");
  await story.getByRole("button", { name: "Play story", exact: true }).click();
  await expect(story.getByRole("button", { name: "Pause story", exact: true })).toBeVisible();
  for (const kind of ["startup", "enterprise", "ownership"]) {
    const illustration = page.locator(`figure[data-kind='${kind}']`);
    await illustration.evaluate(element => element.scrollIntoView({ block: "center" }));
    await expect(illustration).toHaveAttribute("data-running", "true");
    await illustration.getByRole("button", { name: `Pause ${kind} illustration`, exact: true }).click();
    await expect(illustration).toHaveAttribute("data-running", "false");
    await illustration.getByRole("button", { name: `Play ${kind} illustration`, exact: true }).click();
    await expect(illustration.getByRole("button", { name: `Replay ${kind} illustration`, exact: true })).toBeVisible();
    await illustration.getByRole("button", { name: `Replay ${kind} illustration`, exact: true }).click();
    await expect(illustration).toHaveAttribute("data-running", "true");
  }
});

test("reduced motion leaves complete illustrations and a motionless mobile sheet", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  for (const kind of ["startup", "enterprise", "ownership"]) {
    const illustration = page.locator(`figure[data-kind='${kind}']`);
    await illustration.scrollIntoViewIfNeeded();
    await expect(illustration).toHaveAttribute("data-animate", "false");
    await expect(illustration.getByRole("button")).toHaveCount(0);
  }
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate(element => getComputedStyle(element).animationName)).toBe("none");
});

test("the product story and core content remain readable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#startups h2")).toBeVisible();
    await expect(page.locator("#capabilities h2")).toBeVisible();
    await expect(page.locator("figure[data-kind] figcaption")).toHaveCount(3);
    await expect(page.locator("#contact a[href^='mailto:']").first()).toBeVisible();
  } finally { await context.close(); }
});
