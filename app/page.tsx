import Link from "next/link";

import {
  clientLinks,
  coreDisciplines,
  engagementModels,
  enterpriseCapabilities,
  site,
  stealthNote
} from "@/lib/site-content";

import { OrbitDiagram } from "@/components/abstract/orbit-diagram";
import { FlowStrip } from "@/components/abstract/flow-strip";
import { MonoGrid } from "@/components/abstract/mono-grid";

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
    <div className="max-w-2xl">
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
    "border-border/60 bg-card/90 text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg";

  return (
    <div id="top" className="relative bg-noise">
      <MonoGrid className="-z-10" />

      {/* Hero */}
      <section className="relative">
        <div className="container pb-12 pt-16 sm:pb-16 sm:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap items-center gap-2 rounded-full border border-muted/60 bg-background/80 px-3 py-2 shadow-sm">
                <Badge>Startups</Badge>
                <Badge>Enterprises</Badge>
                <Badge variant="secondary">Product · UX · Engineering · Data</Badge>
              </div>

              <h1 className="mt-8 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                A product & engineering team you can plug in.
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Adra Product Studio helps teams move from early ambiguity to shipped software.
                We bring product thinking, UX, full-stack delivery, data, and ops—then hand off cleanly
                when you want to build internally.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <a href={`mailto:${site.email}?subject=Adra%20Product%20Studio%20%E2%80%94%20Intro`}>
                    Start a conversation
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#clients">View clients</Link>
                </Button>
              </div>

              <div className="mt-12">
                <FlowStrip />
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="rounded-[32px] border border-muted/50 bg-gradient-to-br from-background via-background to-muted/40 p-6 shadow-xl">
                <OrbitDiagram centerLabel="Adra" />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <Separator />
        </div>
      </section>

      {/* Principles */}
      <section className="section-invert bg-background text-foreground">
        <div className="container py-16">
          <SectionHeading
            eyebrow="How we work"
            title="High pace, clear ownership, lightweight structure."
            description="We optimize for shipping reliable product increments with minimal coordination overhead."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>Own outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We take responsibility for delivery and quality, not just tasks.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Clear scope and tradeoffs</li>
                  <li>• Demo-driven iteration</li>
                  <li>• Testing and release discipline</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>Move with focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Small teams with senior attention reduce handoffs and rework.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Tight feedback loops</li>
                  <li>• Practical scoping</li>
                  <li>• Fewer moving parts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>Create structure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Just enough process to keep shipping predictable.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Roadmap and backlog hygiene</li>
                  <li>• Decision logs</li>
                  <li>• Operational checklists</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>Enable handoff</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We build so your team can own, maintain, and extend.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Docs and runbooks</li>
                  <li>• Knowledge transfer</li>
                  <li>• Gradual transition</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Startups */}
      <section id="startups" className="scroll-mt-24 bg-background text-foreground">
        <div className="container py-16">
          <SectionHeading
            eyebrow="Startups"
            title="Tech co‑founding leverage—on demand."
            description="When the problem is still fuzzy and speed matters, you need a team that can own delivery. We work like an early technical founding team: shaping scope, building the product, and putting lightweight structure in place so shipping stays predictable."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>What we take on</CardTitle>
                <CardDescription>
                  Cross-functional execution so you don’t have to assemble a full org up front.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Product shaping: scope, tradeoffs, and release planning</li>
                  <li>• UX/UI and design systems (where it reduces rework)</li>
                  <li>• Full-stack engineering, QA, and deployment</li>
                  <li>• Data engineering, analytics instrumentation, and dashboards</li>
                  <li>• Data science / ML when it directly supports the product</li>
                  <li>• Product ops and customer success enablement as needed</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>What you keep in focus</CardTitle>
                <CardDescription>
                  Founders stay on vision and validation while delivery keeps moving.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Vision and strategy</li>
                  <li>• Customer discovery and go-to-market</li>
                  <li>• Fundraising and capital strategy</li>
                  <li>• Partnerships and business development</li>
                  <li>• Hiring plans and culture (as you scale)</li>
                </ul>

                <div className="mt-6 rounded-xl border border-muted/50 bg-muted/30 p-4">
                  <div className="text-sm font-medium">Handoff is part of the plan</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    As your internal team forms, we document decisions, improve maintainability,
                    and transfer ownership without slowing delivery.
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
            title="A skunk‑works team for new products and new paths."
            description="For enterprise teams exploring new markets or initiatives, we operate as a small, senior product studio that can move with startup pace—while making architecture and delivery choices that won’t block scaling, security, or integration later."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card className={`${cardClassName} lg:col-span-2`}>
              <CardHeader>
                <CardTitle>How we fit</CardTitle>
                <CardDescription>
                  Lean delivery, clear decisions, and practical engineering that respects enterprise constraints.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  <li>• Prototype → pilot → production path</li>
                  <li>• Integration with existing systems and data</li>
                  <li>• Security and operational hygiene from the start</li>
                  <li>• Measurable milestones and demo-driven cadence</li>
                  <li>• Documentation for governance and handoff</li>
                  <li>• Enablement for internal teams to own</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>Common initiatives</CardTitle>
                <CardDescription>
                  Areas we often support in enterprise settings.
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
      <section id="capabilities" className="scroll-mt-24 bg-background text-foreground">
        <div className="container py-16">
          <SectionHeading
            eyebrow="Capabilities"
            title="Depth where it matters, flexibility everywhere else."
            description="We assemble the smallest team needed to ship well. Roles and responsibilities can expand or contract as your product matures."
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
            <div className="text-sm font-medium">A note on technology choices</div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              We bias toward maintainable, well-understood stacks and clear interfaces.
              When you need to scale, we’d rather rely on solid foundations (testing, observability,
              data contracts, and documentation) than last-minute rewrites.
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
            title="Choose the level of ownership you need."
            description="We can join as an embedded extension, run an initiative end-to-end, or stay on for ongoing iteration."
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
      <section id="clients" className="scroll-mt-24 bg-background text-foreground">
        <div className="container py-16">
          <SectionHeading
            eyebrow="Clients"
            title="Teams we’ve partnered with."
            description="A small sample of companies we’ve worked with."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clientLinks.map((c) => (
              <a
                key={c.href}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-muted/60 bg-background/70 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-muted/30 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold tracking-tight">{c.name}</div>
                  <div className="text-xs text-muted-foreground group-hover:text-foreground">
                    ↗
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">{c.href.replace('https://', '').replace('www.', '').replace(/\/$/, '')}</div>
              </a>
            ))}

            <div className="rounded-2xl border border-muted/50 bg-muted/20 p-6 shadow-sm">
              <div className="text-sm font-semibold tracking-tight">{stealthNote}</div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                We can share additional references in conversation when it’s appropriate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-invert border-t border-border/60 bg-background text-foreground">
        <div className="container py-16">
          <SectionHeading
            eyebrow="FAQ"
            title="A few practical questions."
          />

          <div className="mt-10 max-w-3xl">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How do we start?</AccordionTrigger>
                <AccordionContent>
                  We begin by aligning on the problem, constraints, and what “good” looks like.
                  From there, we propose an initial scope and a delivery cadence with regular demos.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you work with existing teams?</AccordionTrigger>
                <AccordionContent>
                  Yes. We can embed with your engineers and designers, or run a defined track in parallel.
                  The goal is clear ownership and minimal coordination overhead.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How do you handle handoff?</AccordionTrigger>
                <AccordionContent>
                  We treat handoff as an outcome, not a last step: decisions are documented, code is
                  reviewed for maintainability, and we can support onboarding so your team can own confidently.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can you help with scaling and hiring?</AccordionTrigger>
                <AccordionContent>
                  We can help define roles, participate in technical interviews, and build onboarding materials.
                  When your internal team is ready, we step back or stay on in a smaller support role.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>What does engagement look like commercially?</AccordionTrigger>
                <AccordionContent>
                  Typically either a monthly retainer for a small team, or a scoped project with milestones.
                  We keep the structure lightweight and the expectations explicit.
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
            title="Let’s talk about what you’re building."
            description="If you’re exploring a new product or need extra delivery bandwidth, email us with a short note on context and timing."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className={cardClassName}>
              <CardHeader>
                <CardTitle>Email</CardTitle>
                <CardDescription>
                  The simplest way to start is a message with your goal and constraints.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a href={`mailto:${site.email}?subject=Adra%20Product%20Studio%20%E2%80%94%20Intro`}>
                    {site.email}
                  </a>
                </Button>

                <div className="mt-6 rounded-xl border border-muted/50 bg-muted/20 p-4">
                  <div className="text-sm font-medium">What to include</div>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li>• A one-paragraph product summary</li>
                    <li>• Current stage (idea, prototype, live, scaling)</li>
                    <li>• Your timeline and constraints</li>
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
                <div className="text-sm text-muted-foreground">
                  {site.addressLines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-muted/50 bg-muted/20 p-4">
                  <div className="text-sm font-medium">Working style</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Small team. Clear ownership. Short cycles. Decisions written down.
                    We optimize for shipping a reliable product—not creating process.
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
