import { site } from "@/lib/site-content";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Left side (smaller) */}
          <div className="md:col-span-4">
            <div className="text-sm font-semibold">{site.name}</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Product, design, and engineering support for startups and
              enterprise teams.
            </p>
          </div>

{/* Right side (responsive) */}
<div className="grid gap-6 md:gap-10 md:col-span-8 md:grid-cols-2 lg:grid-cols-3">
  <div>
    <div className="text-xs font-medium text-muted-foreground">Email</div>
    <a
      href={`mailto:${site.email}`}
      className="mt-2 inline-block text-sm hover:underline break-all md:break-normal"
    >
      {site.email}
    </a>
  </div>

  <div>
    <div className="text-xs font-medium text-muted-foreground">India Address</div>
    <div className="mt-2 text-sm text-muted-foreground">
      {site.indiaAddressLines.map((line) => (
        <div key={`in-${line}`}>{line}</div>
      ))}
    </div>
  </div>

  <div className="md:col-span-2 lg:col-span-1">
    <div className="text-xs font-medium text-muted-foreground">US Address</div>
    <div className="mt-2 text-sm text-muted-foreground">
      {site.USaddressLines.map((line) => (
        <div key={`us-${line}`}>{line}</div>
      ))}
    </div>
  </div>
</div>


        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {site.name}
          </div>
          <div className="flex gap-4">
            <a href="#top" className="hover:underline">
              Back to top
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
