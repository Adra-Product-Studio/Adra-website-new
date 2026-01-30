import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Adra Product Studio",
    template: "%s · Adra Product Studio"
  },
  description:
    "A product, design, and engineering team you can plug in—supporting startups and enterprises from fuzzy beginnings to shipped software.",
  metadataBase: new URL("https://adraproductstudio.com"),
  openGraph: {
    title: "Adra Product Studio",
    description:
      "Product, UX, full-stack, and data—delivered with clear ownership and clean handoff.",
    url: "https://adraproductstudio.com",
    siteName: "Adra Product Studio",
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={plusJakartaSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <SiteHeader />
            <main className="relative">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
