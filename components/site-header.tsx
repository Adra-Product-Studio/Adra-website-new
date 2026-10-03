import Image from "next/image";
import { Menu } from "lucide-react";
import { SectionLink } from "@/components/studio-navigation";
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
import { site } from "@/lib/site-content";

const chapters = [
  { number: "01", label: "Approach", href: "#approach" },
  { number: "02", label: "Startups", href: "#startups" },
  { number: "03", label: "Enterprises", href: "#enterprises" },
  { number: "04", label: "Capabilities", href: "#capabilities" },
  { number: "05", label: "Engagement", href: "#engagement" }
];
function Logo() {
  return (
    <>
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
    </>
  );
}
export function SiteHeader() {
  return (
    <header className="studio-header e-header sticky top-0 z-50 w-full border-b">
      <div className="e-wrap e-header-inner">
        <SectionLink className="e-brand" href="#top">
          <Logo />
        </SectionLink>
        <nav aria-label="Main navigation" className="e-desktop-index hidden lg:flex">
          <span className="e-index-rule" aria-hidden="true" />
          {chapters.map((chapter) => (
            <SectionLink key={chapter.href} href={chapter.href}>
              <span className="e-nav-number" aria-hidden="true">
                {chapter.number}
              </span>
              <span>{chapter.label}</span>
            </SectionLink>
          ))}
        </nav>
        <div className="e-header-actions">
          <ModeToggle />
          <a
            className="e-header-contact hidden lg:inline-flex"
            href={`mailto:${site.email}?subject=Adra%20Product%20Studio%20%E2%80%94%20Intro`}
          >
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="e-menu-trigger" aria-label="Open menu">
                  <span>Index</span>
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="studio-menu e-contents w-[430px] max-w-full">
                <SheetClose asChild>
                  <SectionLink className="e-brand" href="#top">
                    <Logo />
                  </SectionLink>
                </SheetClose>
                <div className="e-contents-intro">
                  <SheetTitle>Inside the studio</SheetTitle>
                  <SheetDescription>A shared direction. A product you own.</SheetDescription>
                </div>
                <nav aria-label="Mobile navigation">
                  {[...chapters, { number: "06", label: "Contact", href: "#contact" }].map(
                    (chapter) => (
                      <SheetClose asChild key={chapter.href}>
                        <SectionLink href={chapter.href}>
                          <span className="e-mobile-number" aria-hidden="true">
                            {chapter.number}
                          </span>
                          <span>{chapter.label}</span>
                          <span className="e-mobile-arrow" aria-hidden="true">
                            ↗
                          </span>
                        </SectionLink>
                      </SheetClose>
                    )
                  )}
                </nav>
                <p className="e-contents-note">
                  Product direction.
                  <br />
                  Technical judgment.
                  <br />
                  Delivery.
                </p>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
