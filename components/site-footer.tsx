import { site } from "@/lib/site-content";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="text-sm font-semibold">{site.name}</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Product, design, and engineering support for startups and enterprise teams.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <div className="text-xs font-medium text-muted-foreground">Email</div>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-block text-sm hover:underline"
              >
                {site.email}
              </a>
            </div>

            <div>
              <div className="text-xs font-medium text-muted-foreground">Address</div>
              <div className="mt-2 text-sm text-muted-foreground">
                {site.addressLines.map((line) => (
                  <div key={line}>{line}</div>
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
