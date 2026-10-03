import { site } from "@/lib/site-content";
import { SectionLink } from "@/components/studio-navigation";

export function SiteFooter() {
  return (
    <footer className="e-footer">
      <div className="e-wrap">
        <div className="e-footer-main">
          <div>
            <p className="e-footer-name">{site.name}</p>
            <p>
              Product direction, technical judgment,
              <br />
              and delivery.
            </p>
            <p className="e-footer-note">For founders and leadership teams.</p>
          </div>
          <div>
            <h2>India</h2>
            <address>
              {site.indiaAddressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>
          <div>
            <h2>United States</h2>
            <address>
              {site.USaddressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>
        </div>
        <div className="e-footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Remote collaboration. Shared ownership.</span>
          <SectionLink href="#top">
            Back to the beginning <span aria-hidden="true">↑</span>
          </SectionLink>
        </div>
      </div>
    </footer>
  );
}
