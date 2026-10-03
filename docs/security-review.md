# Website security review

Reviewed 3 October 2026. Baseline: `333bd2ae883e768748de780ebd9f1380d4133a35`
(the merged Editorial Working Brief). This review covers the repository and a
local production build. It is not a certification or a guarantee against unknown
vulnerabilities, and it does not imply that hosting accounts were audited.

## Scope and threat model

The baseline contains 53 tracked files and one public page route. All content is
repository-controlled. There are no application API handlers, Server Actions,
accounts, sessions, database, uploads, payment flows or form submissions. Contact
links open the visitor's email client. The browser runs local application code,
Radix interactions, theme selection and code-native illustrations. No runtime
third-party scripts or server-side application HTTP fetches were found.

The review included source/configuration/public assets, dependency advisories,
reachable Git history, public production response headers and production-browser
tests. Attack simulations run against the local build, not against the live site
or client links.

## Findings and fixes

| Finding                                    | Evidence                                                                                                  | Patch                                                                                                                |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Unsupported and vulnerable dependency tree | Next.js 14.2.5; baseline `npm audit` reports 23 affected packages: 1 critical, 19 high, 2 moderate, 1 low | Upgrade to Next.js 16.3.8, React 19.3.0 and compatible libraries; refresh the existing lockfile; Node 22 runtime     |
| Vulnerable development dependency chains   | Tailwind 3 and the old lint stack retain vulnerable glob/parser dependencies                              | Move to supported Tailwind 4 tooling and explicit ESLint/TypeScript/hooks checks; preserve the visual utility values |
| Missing browser containment headers        | Baseline config has no CSP, framing, MIME-sniffing, referrer or permissions policy                        | Enforce a per-response nonce CSP and common security headers                                                         |
| Unnecessary server image processing        | Only two local logo PNGs, about 21 KB total, need display                                                 | Disable Next image optimization; retain ordinary local image rendering                                               |
| No repeatable security regression gate     | No tracked CI/security workflow                                                                           | Add production HTTP/browser tests, least-privilege pinned CI and weekly dependency-update proposals                  |

The package counts are audit classifications, not 23 independently demonstrated
exploits in this website. Some framework advisories require features absent here
(for example auth middleware, remote image allowlists, rewrites or Pages Router).
The affected framework is replaced rather than relying on those assumptions.
Missing browser headers are defense-in-depth gaps; no bespoke exploitable XSS
or authentication flaw was found in the application source.

## OWASP coverage

| OWASP Top 10:2025 area                     | Review result                                                                                                                                                                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A01 Broken Access Control                  | No private resources or application roles. Development/source files must return 404. Framing denied.                                                                                        |
| A02 Security Misconfiguration              | Enforced CSP and headers; unnecessary image endpoint disabled; page write methods rejected.                                                                                                 |
| A03 Software Supply Chain Failures         | Dependency tree updated, reproducible `npm ci`, audit gate and Dependabot.                                                                                                                  |
| A04 Cryptographic Failures                 | No custom cryptography or confidential application storage. Nonces use 32 cryptographically random bytes; existing host-only HSTS retained. Hosting TLS/account settings are outside scope. |
| A05 Injection                              | No SQL/shell/XML processing, unsafe HTML insertion or eval sinks. React escapes content. Production browser tests verify blocked injected scripts and event handlers.                       |
| A06 Insecure Design                        | No sensitive transactional workflow. Current public/read-only design is preserved. Future forms/APIs need a new review.                                                                     |
| A07 Authentication Failures                | No application authentication/session feature. GitHub/Vercel identity controls are outside the code patch.                                                                                  |
| A08 Software or Data Integrity Failures    | No runtime external scripts or unsafe deserialization; lockfile and pinned CI actions retained/added.                                                                                       |
| A09 Security Logging and Alerting Failures | Build/audit/regression failures surface in CI. Hosting access logs, alerts and abuse controls remain operator responsibilities.                                                             |
| A10 Mishandling of Exceptional Conditions  | Invalid paths, disallowed methods, malformed fragment handling and production error behavior reviewed/tested.                                                                               |

CSRF, SQL injection, file-upload attacks and custom SSRF have no corresponding
application feature here. This is a scope finding, not a claim that the framework
or hosting platform is immune to those attack classes.

## Secrets and public assets

Gitleaks 8.30.1, downloaded from its official release with the archive checksum
verified, reported zero findings with redaction enabled. The Git scan covered 33
non-merge commits. A second scan covered all 123 unique reachable blobs across 55
commits, including merge snapshots. No credential-like filenames were found.
Deleted/unreachable history, inaccessible branches and platform secret stores
are not covered. Local SVG assets contain no scripts or external references.

## Policy decisions and compatibility

- Fresh CSP nonces are generated in `proxy.ts`; incoming nonce/CSP headers are
  overwritten. The server layout passes the nonce to the theme boot script.
- Production JavaScript has no `unsafe-inline` or `unsafe-eval` allowance.
  Inline event handlers, embedding, objects, forms, workers and external script
  sources are restricted. `strict-dynamic` permits scripts created by an already
  trusted script; it is not a guarantee that all external requests are impossible.
  Development alone permits eval/WebSockets for HMR.
- Inline **CSS** remains allowed because Radix, React styles, theme switching and
  illustrations use it. This does not allow inline JavaScript.
- HTML is now rendered per request and uses private/no-store caching. This is
  required for fresh nonces and can increase server work, latency and hosting
  usage relative to the previous CDN-cached page. Static assets remain cacheable.
- GET/HEAD are the only accepted document methods. Adding APIs, Server Actions,
  forms, embeds, analytics or remote images requires a deliberate policy update.
- HSTS retains the production host's existing two-year lifetime without adding
  `includeSubDomains` or preload. Other domains are not placed under that policy.
- Tailwind 4's supported browser floor is Safari 16.4+, Chrome 111+ and Firefox
  128+. The tests cover modern Chromium; older browsers are not certified here.

## Verification

Validated with Node 22.23.3: clean `npm ci`, lint, TypeScript and production build
all pass. The final full dependency audit reports **zero vulnerabilities**,
including development dependencies, without overrides or advisory exclusions.
All **22 production HTTP/browser tests pass** with no skipped or flaky tests.

Run the commands in the README against a production build. The committed tests
exercise nonce rotation and spoof resistance, real browser CSP enforcement,
framing denial, theme persistence, responsive navigation, focus/history,
illustration controls, reduced motion, FAQs, local redirects, write-method
rejection, absent private files and the disabled image endpoint. Deliberate
attack probes are kept separate from normal interactions; normal interactions
must have no browser/CSP errors or failed application assets.

Final results are recorded in the pull request. The supplied video demonstrates
the tested desktop/mobile build working; it is functional evidence, not a
substitute for the security tests.

## Deployment and account checks outside this patch

The GitHub branch response reported `main` unprotected and the ruleset collection
was empty during this review. A repository administrator should require the new
security/regression check before merging. This PR does not change administrative
permissions, MFA, deployment secrets, DNS, WAF, spend limits or monitoring.

After merge, verify the live deployment uses Node 22 and returns the new headers.
Review Vercel deployment retention/protection: old preview deployments may retain
vulnerable dependencies even after production is updated. No historical
deployments are deleted by this PR. Preview tooling that injects third-party
scripts may be blocked by the strict policy; do not loosen production CSP for it.

## Primary references

- [OWASP Top 10:2025](https://top10.owasp.org/2025/)
- [OWASP ASVS](https://owasp.org/projects/asvs) (review guidance, no certification claimed)
- [OWASP Next.js security](https://cheatsheetseries.owasp.org/cheatsheets/Nextjs_Security_Cheat_Sheet.html)
- [OWASP HTTP headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
- [Next.js support policy](https://nextjs.org/support-policy)
- [Next.js September 2026 security release](https://nextjs.org/blog/september-2026-security-release)
- [Next.js CSP and rendering tradeoffs](https://nextjs.org/docs/app/guides/content-security-policy)
- [Tailwind 4 upgrade guide](https://tailwindcss.com/docs/upgrade-guide)
- [GitHub Actions secure use](https://docs.github.com/en/actions/reference/security/secure-use)
- [Vercel deployment retention](https://vercel.com/docs/deployment-retention)
