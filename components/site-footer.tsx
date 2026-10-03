import { site } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="dd-footer">
      <div className="dd-wrap">
        <div className="dd-footer-top">
          <div>
            <div className="dd-footer-brand">{site.name}</div>
            <p className="dd-footer-summary">
              Product direction, technical judgment, and delivery for founders and leadership teams.
            </p>
          </div>
          <div>
            <p className="dd-footer-label">India</p>
            <address>
              {site.indiaAddressLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
          </div>
          <div>
            <p className="dd-footer-label">United States</p>
            <address>
              {site.USaddressLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
          </div>
        </div>
        <div className="dd-footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <div>
            <a href="#top">Back to top ↑</a>
            <a href={`mailto:${site.email}`}>Email ↗</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
