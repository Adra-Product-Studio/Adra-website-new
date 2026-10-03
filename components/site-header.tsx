import Link from "next/link";
import { Menu } from "lucide-react";

import { navItems, site } from "@/lib/site-content";
import { cn } from "@/lib/utils";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription } from "@/components/ui/sheet";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      {/* <div className="relative flex h-8 w-8 items-center justify-center  border bg-background"> */}
      {/* <span className="text-sm font-semibold tracking-tight">A</span> */}

      {/* Light theme logo */}
      <Image
        src="/images/adra_logo_dark.png"
        width={70}
        height={10}
        alt="Adra Product Studio"
        className="dark:hidden h-auto w-[70px]"
      />

      {/* Dark theme logo */}
      <Image
        src="/images/adra_logo_light.png"
        alt="Adra Product Studio"
        width={70}
        height={10}
        className="hidden dark:block h-auto w-[70px]"
      />
      {/* </div> */}
      {/* <span className="text-sm font-semibold tracking-tight">
        Adra Product Studio
      </span> */}
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="studio-header sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="#top" className="hover:opacity-90">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />

          <Button asChild className="hidden lg:inline-flex">
            <a href={`mailto:${site.email}?subject=Adra%20Product%20Studio%20%E2%80%94%20Intro`}>Contact</a>
          </Button>

          {/* Mobile */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="studio-menu w-[320px] max-w-full">
                <SheetTitle className="sr-only">Site navigation</SheetTitle>
                <SheetDescription className="sr-only">Explore Adra Product Studio.</SheetDescription>
                <div className="flex items-center justify-between">
                  <SheetClose asChild>
                    <Link href="#top" className="hover:opacity-90"><Logo /></Link>
                  </SheetClose>
                </div>

                <nav aria-label="Mobile navigation" className="mt-8 flex flex-col gap-4">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <a href={item.href} className="py-2 text-sm text-muted-foreground hover:text-foreground">
                        {item.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-8">
                  <Button asChild className="w-full">
                    <a href={`mailto:${site.email}?subject=Adra%20Product%20Studio%20%E2%80%94%20Intro`}>Contact</a>
                  </Button>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Email is the fastest way to reach us.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
