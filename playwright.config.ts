import { defineConfig } from "@playwright/test";

// Run `npm run build` first. An external production server can be supplied with
// SECURITY_BASE_URL; otherwise Playwright starts the existing production build.
const baseURL = process.env.SECURITY_BASE_URL || "http://127.0.0.1:3112";

export default defineConfig({
  testDir: "./tests",
  testMatch: "security*.spec.ts",
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: [["list"], ["html", { open: "never" }]],
  outputDir: "test-results/browser",
  use: {
    baseURL,
    browserName: "chromium",
    viewport: { width: 1440, height: 1020 },
    colorScheme: "light",
    reducedMotion: "reduce",
    // Do not set bypassCSP: these tests must exercise the actual response policy.
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
      args: process.env.PLAYWRIGHT_CHROMIUM_ARGS
        ? JSON.parse(process.env.PLAYWRIGHT_CHROMIUM_ARGS)
        : []
    }
  },
  webServer: process.env.SECURITY_BASE_URL
    ? undefined
    : {
        command: "npm run start -- --hostname 127.0.0.1 --port 3112",
        url: baseURL,
        reuseExistingServer: false,
        timeout: 30_000
      }
});
