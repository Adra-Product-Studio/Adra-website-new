"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { SectionLink } from "@/components/studio-navigation";
import { useCurrentChapter } from "@/components/chapter-location";
import { site } from "@/lib/site-content";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";

const chapters = [
  { id: "approach", number: "00", label: "Approach" },
  { id: "startups", number: "01", label: "Startups" },
  { id: "enterprises", number: "02", label: "Enterprises" },
  { id: "capabilities", number: "03", label: "Capabilities" },
  { id: "engagement", number: "04", label: "Partnership" },
  { id: "questions", number: "05", label: "Questions" },
  { id: "contact", number: "06", label: "Contact" }
] as const;

function Logo() {
  return (
    <span className="block">
      <Image
        src="/images/adra_logo_dark.png"
        width={70}
        height={48}
        alt="Adra Product Studio"
        className="dark:hidden h-auto w-[70px]"
      />
      <Image
        src="/images/adra_logo_light.png"
        width={70}
        height={48}
        alt="Adra Product Studio"
        className="hidden dark:block h-auto w-[70px]"
      />
    </span>
  );
}

export function SiteHeader() {
  const current = useCurrentChapter();
  return (
    <header
      className="studio-header sticky top-0 z-50 w-full border-b backdrop-blur"
      data-chapter-navigation
    >
      <div className="container flex items-center justify-between">
        <SectionLink href="#top" aria-label="Adra Product Studio — back to top">
          <Logo />
        </SectionLink>
        <nav aria-label="Chapters" className="hidden items-center lg:flex">
          {chapters.slice(0, 5).map((chapter) => (
            <SectionLink
              key={chapter.id}
              href={`#${chapter.id}`}
              aria-current={current.id === chapter.id ? "location" : undefined}
            >
              <span className="dd-nav-number" aria-hidden="true">
                {chapter.number}
              </span>
              {chapter.label}
            </SectionLink>
          ))}
        </nav>
        <span className="dd-chapter-location">
          <span className="sr-only">Current section: </span>
          {current.label}
        </span>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <a
            className="dd-header-contact hidden lg:inline-flex"
            href={`mailto:${site.email}?subject=Adra%20Product%20Studio%20%E2%80%94%20Intro`}
          >
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open chapter navigation">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="studio-menu dd-menu w-[380px] max-w-full">
                <SheetTitle className="sr-only">Site chapters</SheetTitle>
                <SheetDescription className="sr-only">
                  Explore how Adra works with founders and leadership teams.
                </SheetDescription>
                <SheetClose asChild>
                  <SectionLink
                    href="#top"
                    className="inline-block"
                    aria-label="Adra Product Studio — back to top"
                  >
                    <Logo />
                  </SectionLink>
                </SheetClose>
                <div className="dd-menu-heading">
                  <span>Contents</span>
                  <SheetClose asChild>
                    <SectionLink
                      href="#clients"
                      aria-current={current.id === "clients" ? "location" : undefined}
                    >
                      Our clients <span aria-hidden="true">↗</span>
                    </SectionLink>
                  </SheetClose>
                </div>
                <nav aria-label="Mobile chapters">
                  {chapters.map((chapter) => (
                    <SheetClose key={chapter.id} asChild>
                      <SectionLink
                        className="dd-menu-link"
                        href={`#${chapter.id}`}
                        aria-current={current.id === chapter.id ? "location" : undefined}
                      >
                        <span className="dd-menu-number" aria-hidden="true">
                          {chapter.number}
                        </span>
                        <span>{chapter.label}</span>
                        <span className="dd-menu-marker" aria-hidden="true">
                          ↗
                        </span>
                      </SectionLink>
                    </SheetClose>
                  ))}
                </nav>
                <div className="dd-menu-footer">
                  <p>
                    Product direction.
                    <br />
                    Technical judgment. Delivery.
                  </p>
                  <a href={`mailto:${site.email}`}>
                    {site.email}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
