import { SectionLink as Link } from "@/components/studio-navigation";

import {
  clientLinks,
  coreDisciplines,
  engagementModels,
  enterpriseCapabilities,
  site,
  stealthNote
} from "@/lib/site-content";

import { ProductStory } from "@/components/product-story";
import { StudioMotion } from "@/components/studio-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="studio-heading max-w-2xl">
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-6 bg-gradient-to-r from-transparent via-muted-foreground to-transparent" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  const cardClassName =
    "studio-card border-border/60 bg-card/90 text-card-foreground";

  return (
    <div id="top" className="studio-home relative">
      <StudioMotion />

      {/* Hero */}
      <section className="studio-hero relative">
        <div className="container pb-12 pt-16 sm:pb-16 sm:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap items-center gap-2 rounded-full border border-muted/60 bg-background/80 px-3 py-2 shadow-sm">
                <Badge>Startups</Badge>
                <Badge>Enterprises</Badge>
                <Badge variant="secondary">
                  Product · Technology · Delivery
                </Badge>
              </div>

              <h1 className="mt-8 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Clarity on what to build. A team to deliver.
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                We partner with founders and leadership teams to turn business
                goals into a roadmap, a team, and working software. We lead
                delivery and keep decisions, costs, and progress visible.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <a
                    href={`mailto:${site.email}?subject=Adra%20Product%20Studio%20%E2%80%94%20Intro`}
                  >
                    Start a conversation
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#engagement">How we partner</Link>
                </Button>
              </div>
            </div>

            <div className="flex min-w-0 justify-center lg:justify-end">
              <ProductStory />
            </div>
          </div>
        </div>

        <div className="container">
          <Separator />
        </div>
      </section>

      {/* Principles */}
      <section id="approach" className="studio-principles section-invert bg-background text-foreground">
        <div className="container py-16">
          <SectionHeading
            eyebrow="How we work"
            title="Direction, decisions, and delivery—in one team."
            description="Align the roadmap, budget, team, and architecture around what the business needs next."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>Start with the goal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Agree on the problem and success measures before committing
                  to a build.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Long-term direction, near-term priorities</li>
                  <li>• Roadmap and milestones</li>
                  <li>• Scope and budget tradeoffs</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>Choose for context</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fit the architecture to the work, budget, and team running it.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Build, buy, or integrate</li>
                  <li>• Running cost and maintainability</li>
                  <li>• Security and compliance needs</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>Set the right pace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Match the team and process to risk. Move fast where change
                  is cheap.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Roles and decision owners</li>
                  <li>• Review and release controls</li>
                  <li>• Team practices and AI adoption</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>Keep progress visible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Own delivery commitments. Report spend and risks. Adapt as
                  evidence changes.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Demos and agreed measures</li>
                  <li>• Stakeholder decisions</li>
                  <li>• Adoption and ownership</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Startups */}
      <section
        id="startups"
        className="scroll-mt-24 bg-background text-foreground"
      >
        <div className="container py-16">
          <SectionHeading
            eyebrow="Startups"
            title="Make sense of the idea. Build what matters first."
            description="Work through ambiguity together. Decide what to test, build, and defer, then turn that direction into a roadmap and working product."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>From open questions to a plan</CardTitle>
                <CardDescription>
                  Test the assumptions and set a practical first phase.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Customer problem, assumptions, and validation plan</li>
                  <li>• Product vision, priorities, and first release</li>
                  <li>• Budget, milestones, and explicit tradeoffs</li>
                  <li>• Architecture that fits today and leaves room to grow</li>
                  <li>• Roles to staff now and capabilities to add later</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>From plan to use</CardTitle>
                <CardDescription>
                  Stay close to the vision and the customer while we lead
                  day-to-day delivery with you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• UX, engineering, data, and quality in one team</li>
                  <li>• Short releases and real user feedback</li>
                  <li>• Clear progress, costs, and decisions to make</li>
                  <li>• Launch readiness and customer success enablement</li>
                  <li>• Hiring, onboarding, and ownership as you grow</li>
                </ul>

                <div className="mt-6 rounded-xl border border-muted/50 bg-muted/30 p-4">
                  <div className="text-sm font-medium">
                    Build your ability to own it
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Decisions, code, and context stay accessible. We help your
                    team take ownership or keep working alongside you.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enterprises */}
      <section
        id="enterprises"
        className="section-invert border-t border-border/60 bg-background text-foreground"
      >
        <div className="container scroll-mt-24 py-16">
          <SectionHeading
            eyebrow="Enterprises"
            title="From leadership priority to daily use."
            description="Translate a leadership priority into an executable plan. Align stakeholders, work with existing systems, and set a pace that fits the operational risk."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card className={`${cardClassName} lg:col-span-2`}>
              <CardHeader>
                <CardTitle>The plan includes the organization</CardTitle>
                <CardDescription>
                  Technology, people, and adoption need to move together.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  <li>• Roadmap, budget, dependencies, and decision owners</li>
                  <li>• Architecture and integration with existing systems</li>
                  <li>• Security, compliance, and review requirements</li>
                  <li>• Staffing and coordination across internal teams</li>
                  <li>• Pilot, rollout, and team training</li>
                  <li>• Progress, risks, and decisions reported to leadership</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>Common initiatives</CardTitle>
                <CardDescription>
                  New products, better operations, and systems ready for change.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {enterpriseCapabilities.map((c) => (
                    <li key={c}>• {c}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section
        id="capabilities"
        className="scroll-mt-24 bg-background text-foreground"
      >
        <div className="container py-16">
          <SectionHeading
            eyebrow="Capabilities"
            title="Product, technology, and operations."
            description="Bring the skills the work needs, with clear ownership as the team evolves."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {coreDisciplines.map((d) => (
              <Card key={d.title} className={cardClassName}>
                <CardHeader>
                  <CardTitle>{d.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {d.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-muted/50 bg-gradient-to-br from-muted/40 via-background to-background p-6 shadow-sm">
            <div className="text-sm font-medium">
              AI changes the work. Judgment still matters.
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Adopt AI and coding agents with clear architecture, review,
              tests, and ownership. Faster code is one part of delivery; teams
              and working practices need to evolve too.
            </p>
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section
        id="engagement"
        className="section-invert border-t border-border/60 bg-background text-foreground"
      >
        <div className="container scroll-mt-24 py-16">
          <SectionHeading
            eyebrow="Engagement"
            title="Work with us at the level you need."
            description="Start with an open question, a defined initiative, or an existing team. Agree on what we own."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {engagementModels.map((m) => (
              <Card key={m.title} className={cardClassName}>
                <CardHeader>
                  <CardTitle>{m.title}</CardTitle>
                  <CardDescription>{m.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {m.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section
        id="clients"
        className="scroll-mt-24 bg-background text-foreground"
      >
        <div className="container py-16">
          <SectionHeading
            eyebrow="Clients"
            title="Teams we’ve partnered with."
          />

          <div className="studio-clients mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clientLinks.map((c) => (
              <a
                key={c.href}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-muted/60 bg-background/70 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-muted/30 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold tracking-tight">
                    {c.name}
                  </div>
                  <div className="text-xs text-muted-foreground group-hover:text-foreground">
                    ↗
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  {c.href
                    .replace("https://", "")
                    .replace("www.", "")
                    .replace(/\/$/, "")}
                </div>
              </a>
            ))}

            <div className="rounded-2xl border border-muted/50 bg-muted/20 p-6 shadow-sm">
              <div className="text-sm font-semibold tracking-tight">
                {stealthNote}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                We can share additional references in conversation when it’s
                appropriate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="questions" className="studio-questions section-invert border-t border-border/60 bg-background text-foreground">
        <div className="container py-16">
          <SectionHeading eyebrow="FAQ" title="A few practical questions." />

          <div className="studio-faq mt-10 max-w-3xl">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How do we start?</AccordionTrigger>
                <AccordionContent>
                  We start with the business goal and constraints, then propose a
                  first phase with priorities, budget, team shape, and decision
                  points.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Can you work with our team and help it grow?
                </AccordionTrigger>
                <AccordionContent>
                  Yes. We embed or lead an initiative alongside your team. We can
                  also shape roles, assess technical hires, and onboard people.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How do you handle handoff?</AccordionTrigger>
                <AccordionContent>
                  We document decisions, keep code maintainable, and build runbooks
                  as we go. Walkthroughs and a planned transition give your team
                  the context to operate and extend the product.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  How do you stay accountable?
                </AccordionTrigger>
                <AccordionContent>
                  We agree on delivery commitments and success measures, then
                  review demos, spend, risks, and decisions with you. Customer
                  feedback and adoption data guide what changes next.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  What does engagement look like commercially?
                </AccordionTrigger>
                <AccordionContent>
                  A monthly retainer or a scoped initiative with milestones.
                  We agree on responsibilities, budget, and review points up
                  front, and make changes to scope or staffing explicit.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="border-t border-border/60 bg-background text-foreground"
      >
        <div className="container scroll-mt-24 py-16">
          <SectionHeading
            eyebrow="Contact"
            title="What are you trying to achieve?"
            description="Bring the goal, the constraints, and the questions you haven’t resolved. You don’t need a finished brief."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>Email</CardTitle>
                <CardDescription>
                  A short note is enough to start.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a
                    href={`mailto:${site.email}?subject=Adra%20Product%20Studio%20%E2%80%94%20Intro`}
                  >
                    {site.email}
                  </a>
                </Button>

                <div className="mt-6 rounded-xl border border-muted/50 bg-muted/20 p-4">
                  <div className="text-sm font-medium">What to include</div>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li>• The goal and where things stand</li>
                    <li>• Your team, budget, and timing</li>
                    <li>• The decisions or delivery you need help with</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>Address</CardTitle>
                <CardDescription>
                  Administrative address (remote delivery is typical).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="text-sm text-muted-foreground">
                    <div className="mb-2 text-xs font-medium text-muted-foreground">
                      India Address
                    </div>
                    {site.indiaAddressLines.map((line) => (
                      <div key={`in-${line}`}>{line}</div>
                    ))}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <div className="mb-2 text-xs font-medium text-muted-foreground">
                      US Address
                    </div>
                    {site.USaddressLines.map((line) => (
                      <div key={`us-${line}`}>{line}</div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-muted/50 bg-muted/20 p-4">
                  <div className="text-sm font-medium">Working style</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Clear owners. Visible decisions. Regular reviews. Enough
                    structure for the risk and complexity of the work.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
