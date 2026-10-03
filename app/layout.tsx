import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import "./studio.css";

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
    "A product and technology partner for founders and leadership teams. Turn business goals into a roadmap, the right team, and working software.",
  metadataBase: new URL("https://adraproductstudio.com"),
  openGraph: {
    title: "Adra Product Studio",
    description:
      "Product direction, technical judgment, and delivery. Roadmaps, architecture, teams, and execution shaped around your business goals.",
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
      <body className={`${plusJakartaSans.className} studio-shell`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <a href="#main-content" className="studio-skip">Skip to content</a>
            <SiteHeader />
            <main id="main-content" className="relative">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
