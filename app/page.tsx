import { SectionLink } from "@/components/studio-navigation";
import { ProductStory } from "@/components/product-story";
import { ProcessVignette } from "@/components/process-vignette";
import { StudioMotion } from "@/components/studio-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { clientLinks, site } from "@/lib/site-content";

const decisions = [
  {
    question: "What matters next?",
    judgment: "Agree on the problem, success measures, and what to defer.",
    output: "A shared direction and a first phase."
  },
  {
    question: "What should we build on?",
    judgment:
      "Choose what to build, buy, or integrate. Weigh running cost, security, and maintainability.",
    output: "Architecture that fits the work."
  },
  {
    question: "Who needs to be involved?",
    judgment: "Shape the team, budget, and decision ownership. Match release controls to the risk.",
    output: "The right people and working rhythm."
  },
  {
    question: "How will we know?",
    judgment: "Review demos, spend, risks, and feedback. Make the next decision together.",
    output: "Visible progress and clear commitments."
  }
];
const disciplines = [
  {
    title: "Product direction & design",
    description: "Connect the business goal to a product people can use.",
    detail: "Discovery, roadmaps, UX/UI, prototypes, usability testing, and design systems."
  },
  {
    title: "Architecture & engineering",
    description: "Make sound choices. Build software the team can sustain.",
    detail: "Web, mobile, APIs, integrations, QA, DevOps, security, and observability."
  },
  {
    title: "Data & AI",
    description: "Put data and automation to work where they are useful.",
    detail:
      "Data engineering, analytics, decision systems, ML, AI agents, evaluation, and operational controls."
  },
  {
    title: "Teams & delivery",
    description: "Keep people, decisions, and execution moving together.",
    detail: "Staffing, budgets, stakeholder alignment, product operations, and change management."
  }
];
const engagements = [
  {
    title: "Product & delivery partner",
    fit: "An open question or an initiative that needs direction and a team.",
    part: "Work with leadership from problem framing through roadmap, team setup, and delivery.",
    working: "Shared decisions. Agreed budget. Regular progress reviews."
  },
  {
    title: "Embedded team",
    fit: "An existing team that needs product, design, engineering, or data capability.",
    part: "Own a defined part of the work, within your tools, constraints, and delivery cadence.",
    working: "Clear responsibilities. Capacity that evolves with the work and your hiring."
  },
  {
    title: "Ongoing product care",
    fit: "A live product that needs continuity, improvement, and operational care.",
    part: "Keep iterating, hosting, and monitoring. Maintain security, dependencies, and documentation.",
    working: "A team that knows the context. A planned handoff when you need it."
  }
];
function Chapter({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="dd-chapter">
      <span aria-hidden="true">{number}</span>
      {children}
    </p>
  );
}

export default function HomePage() {
  return (
    <div id="top" className="studio-home dd-home">
      <StudioMotion />
      <section className="studio-hero dd-hero" aria-labelledby="hero-title">
        <div className="dd-wrap">
          <div className="dd-hero-grid">
            <div className="dd-hero-copy">
              <p className="dd-eyebrow">Product direction. Technical judgment. Delivery.</p>
              <h1 id="hero-title">
                Clarity on what to build.
                <br />
                <span>A team to deliver.</span>
              </h1>
              <p className="dd-hero-intro">
                We partner with founders and leadership teams to turn business goals into a roadmap,
                a team, and working software. We lead delivery and keep decisions, costs, and
                progress visible.
              </p>
              <div className="dd-hero-actions">
                <a
                  className="dd-button"
                  href={`mailto:${site.email}?subject=Adra%20Product%20Studio%20%E2%80%94%20Intro`}
                >
                  Start a conversation <span aria-hidden="true">↗</span>
                </a>
                <SectionLink className="dd-text-link" href="#engagement">
                  How we partner <span aria-hidden="true">↓</span>
                </SectionLink>
              </div>
              <div className="dd-hero-context">
                <span>Built around your context</span>
                <div>
                  <SectionLink href="#startups">Startups</SectionLink>
                  <span aria-hidden="true">/</span>
                  <SectionLink href="#enterprises">Enterprises</SectionLink>
                </div>
              </div>
            </div>
            <div className="dd-hero-story">
              <ProductStory />
            </div>
          </div>
        </div>
      </section>

      <section id="clients" className="dd-clients" aria-labelledby="clients-title">
        <div className="dd-wrap dd-client-strip">
          <h2 id="clients-title">
            Teams we’ve
            <br className="dd-desktop-break" /> partnered with
          </h2>
          <div className="dd-client-names">
            {clientLinks.map((client) => (
              <a key={client.href} href={client.href} target="_blank" rel="noreferrer">
                {client.name}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <p>And teams building in stealth.</p>
        </div>
      </section>

      <section id="approach" className="dd-section dd-approach" aria-labelledby="approach-title">
        <div className="dd-wrap">
          <Chapter number="00">How we work</Chapter>
          <div className="dd-section-intro">
            <h2 id="approach-title">
              The important decisions
              <br className="dd-desktop-break" /> belong in the same room.
            </h2>
            <p>
              Roadmap, budget, team, and architecture are connected. We work through them together,
              around what the business needs next.
            </p>
          </div>
          <div className="dd-decision-table">
            <div className="dd-table-head" aria-hidden="true">
              <span>The question</span>
              <span>The judgment</span>
              <span>What takes shape</span>
            </div>
            {decisions.map((decision, index) => (
              <article className="dd-decision-row" key={decision.question}>
                <h3>
                  <span className="dd-row-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  {decision.question}
                </h3>
                <p>{decision.judgment}</p>
                <p className="dd-decision-output">
                  <span aria-hidden="true">↳</span>
                  {decision.output}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="startups" className="dd-section dd-startups" aria-labelledby="startups-title">
        <div className="dd-wrap">
          <Chapter number="01">For startups</Chapter>
          <div className="dd-situation-grid">
            <div className="dd-situation-copy">
              <h2 id="startups-title">
                Find the first
                <br /> useful version.
              </h2>
              <p className="dd-lead">
                Make sense of the idea. Decide what to test, build, and defer.
              </p>
              <p>
                Work through ambiguity together. Turn a shared product vision into a practical first
                phase, with the budget, team, and architecture to deliver it.
              </p>
              <SectionLink className="dd-text-link" href="#engagement">
                From idea to working partnership <span aria-hidden="true">↘</span>
              </SectionLink>
            </div>
            <div className="dd-process-stage">
              <ProcessVignette kind="startup" />
            </div>
          </div>
          <div className="dd-three-notes">
            <article>
              <span className="dd-note-label">01 / Find the focus</span>
              <h3>A problem worth solving.</h3>
              <p>
                Test assumptions with customers. Set success measures and a first release. Make
                priorities and tradeoffs explicit.
              </p>
            </article>
            <article>
              <span className="dd-note-label">02 / Shape the work</span>
              <h3>A plan within reach.</h3>
              <p>
                Agree on budget and milestones. Choose architecture that fits today, roles to staff
                now, and capabilities to add later.
              </p>
            </article>
            <article>
              <span className="dd-note-label">03 / Build and learn</span>
              <h3>A product in real use.</h3>
              <p>
                Lead short delivery cycles with design, engineering, data, and quality together.
                Prepare for launch, customer success, and feedback.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="enterprises"
        className="dd-section dd-enterprises"
        aria-labelledby="enterprises-title"
      >
        <div className="dd-wrap">
          <Chapter number="02">For enterprises</Chapter>
          <div className="dd-situation-grid dd-enterprise-grid">
            <div className="dd-situation-copy">
              <h2 id="enterprises-title">
                Make progress.
                <br /> Bring the organization.
              </h2>
              <p className="dd-lead">From leadership priority to daily use.</p>
              <p>
                Translate the goal into an executable plan. Align stakeholders, work with existing
                systems, and set a pace that fits the operational risk.
              </p>
              <SectionLink className="dd-text-link" href="#capabilities">
                The capabilities behind the plan <span aria-hidden="true">↘</span>
              </SectionLink>
            </div>
            <div className="dd-process-stage">
              <ProcessVignette kind="enterprise" />
            </div>
          </div>
          <div className="dd-enterprise-plan">
            <h3>
              The plan includes
              <br className="dd-desktop-break" /> the organization.
            </h3>
            <dl>
              <div>
                <dt>Direction & decisions</dt>
                <dd>Roadmap, budget, dependencies, and clear decision owners.</dd>
              </div>
              <div>
                <dt>Systems & controls</dt>
                <dd>Architecture, integration, security, compliance, and release reviews.</dd>
              </div>
              <div>
                <dt>People & adoption</dt>
                <dd>Internal coordination, staffing, pilots, rollout, and team training.</dd>
              </div>
              <div>
                <dt>Progress & accountability</dt>
                <dd>Spend, risks, demos, and decisions reported to leadership.</dd>
              </div>
            </dl>
          </div>
          <p className="dd-initiative-note">
            <span>Typical work</span>New products and internal applications. Data platforms and
            decision systems. AI agents and workflow automation. Modernization and integration.
          </p>
        </div>
      </section>

      <section
        id="capabilities"
        className="dd-section dd-capabilities"
        aria-labelledby="capabilities-title"
      >
        <div className="dd-wrap">
          <Chapter number="03">Capabilities</Chapter>
          <div className="dd-section-intro">
            <h2 id="capabilities-title">
              The right skills.
              <br /> One shared direction.
            </h2>
            <p>Bring the skills the work needs, with clear ownership as the team evolves.</p>
          </div>
          <div className="dd-capability-index">
            {disciplines.map((discipline, index) => (
              <article key={discipline.title}>
                <span className="dd-row-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{discipline.title}</h3>
                <div>
                  <p>{discipline.description}</p>
                  <p className="dd-capability-detail">{discipline.detail}</p>
                </div>
              </article>
            ))}
          </div>
          <aside className="dd-ai-note">
            <span className="dd-note-label">A changing way of working</span>
            <h3>
              AI changes the work.
              <br /> Judgment still matters.
            </h3>
            <p>
              Adopt AI and coding agents with clear architecture, review, tests, and ownership.
              Faster code is one part of delivery; the team and its working practices need to evolve
              too.
            </p>
          </aside>
        </div>
      </section>

      <section
        id="engagement"
        className="dd-section dd-engagement"
        aria-labelledby="engagement-title"
      >
        <div className="dd-wrap">
          <Chapter number="04">Ways to partner</Chapter>
          <div className="dd-section-intro">
            <h2 id="engagement-title">
              Start where
              <br /> you need us.
            </h2>
            <p>
              An open question, a defined initiative, or an existing team. Agree on what we own and
              how we work together.
            </p>
          </div>
          <div className="dd-engagement-index">
            {engagements.map((model, index) => (
              <article key={model.title}>
                <div className="dd-model-title">
                  <span className="dd-row-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3>{model.title}</h3>
                </div>
                <dl>
                  <div>
                    <dt>When it fits</dt>
                    <dd>{model.fit}</dd>
                  </div>
                  <div>
                    <dt>Our part</dt>
                    <dd>{model.part}</dd>
                    <dd className="dd-model-working">{model.working}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <div className="dd-ownership">
            <div className="dd-process-stage">
              <ProcessVignette kind="ownership" />
            </div>
            <div>
              <span className="dd-note-label">Across every engagement</span>
              <h3>
                Build your ability
                <br /> to own it.
              </h3>
              <p>
                Decisions, code, and context stay accessible. Documentation, runbooks, and
                walkthroughs are part of the work.
              </p>
              <p>
                We help with hiring and onboarding, support a planned handoff, or keep working
                alongside your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="questions" className="dd-section dd-questions" aria-labelledby="questions-title">
        <div className="dd-wrap dd-questions-grid">
          <div>
            <Chapter number="05">Practical questions</Chapter>
            <h2 id="questions-title">
              Before
              <br /> we begin.
            </h2>
          </div>
          <div className="dd-faq">
            <Accordion type="single" collapsible>
              <AccordionItem value="start">
                <AccordionTrigger>How do we start?</AccordionTrigger>
                <AccordionContent>
                  We start with the business goal and constraints, then propose a first phase with
                  priorities, budget, team shape, and decision points.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="team">
                <AccordionTrigger>Can you work with our team and help it grow?</AccordionTrigger>
                <AccordionContent>
                  Yes. We embed or lead an initiative alongside your team. We can also shape roles,
                  assess technical hires, and onboard people.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="handoff">
                <AccordionTrigger>How do you handle handoff?</AccordionTrigger>
                <AccordionContent>
                  We document decisions, keep code maintainable, and build runbooks as we go.
                  Walkthroughs and a planned transition give your team the context to operate and
                  extend the product.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="accountability">
                <AccordionTrigger>How do you stay accountable?</AccordionTrigger>
                <AccordionContent>
                  We agree on delivery commitments and success measures, then review demos, spend,
                  risks, and decisions with you. Customer feedback and adoption data guide what
                  changes next.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="commercial">
                <AccordionTrigger>What does engagement look like commercially?</AccordionTrigger>
                <AccordionContent>
                  A monthly retainer or a scoped initiative with milestones. We agree on
                  responsibilities, budget, and review points up front, and make changes to scope or
                  staffing explicit.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact" className="dd-section dd-contact" aria-labelledby="contact-title">
        <div className="dd-wrap">
          <Chapter number="06">Start a conversation</Chapter>
          <h2 id="contact-title">
            What are you
            <br /> trying to achieve?
          </h2>
          <div className="dd-contact-bottom">
            <p>
              Bring the goal, the constraints, and the questions you haven’t resolved. You don’t
              need a finished brief.
            </p>
            <a href={`mailto:${site.email}?subject=Adra%20Product%20Studio%20%E2%80%94%20Intro`}>
              {site.email}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
