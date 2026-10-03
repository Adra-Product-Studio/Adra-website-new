import { SectionLink } from "@/components/studio-navigation";
import { ProductStory } from "@/components/product-story";
import { ProcessVignette } from "@/components/process-vignette";
import { EditorialMotion } from "@/components/editorial-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  clientLinks,
  coreDisciplines,
  engagementModels,
  enterpriseCapabilities,
  site
} from "@/lib/site-content";

const principles = [
  {
    title: "Start with the goal",
    text: "Agree on the problem and success measures. Connect the long-term direction to near-term priorities, milestones, and budget."
  },
  {
    title: "Choose for context",
    text: "Build, buy, or integrate. Weigh running costs, maintainability, security, and compliance against the work ahead."
  },
  {
    title: "Set the right pace",
    text: "Name decision owners. Match the team, review process, release controls, and AI practices to the risk."
  },
  {
    title: "Keep progress visible",
    text: "Review demos, spend, risks, and adoption against agreed commitments. Make decisions together as the evidence changes."
  }
];
const startupDecisions = [
  {
    title: "Establish what matters",
    text: "The customer problem, the assumptions behind it, and the evidence needed to move forward."
  },
  {
    title: "Make the first commitments",
    text: "A product vision and first release. Clear priorities, budget, milestones, and tradeoffs—with architecture and staffing that leave room to grow."
  },
  {
    title: "Deliver, learn, adjust",
    text: "UX, engineering, data, and quality in one team. Short releases, real user feedback, visible costs, and the preparation to launch and support customers."
  }
];
const enterpriseDecisions = [
  {
    title: "Align the organization",
    text: "A roadmap with a budget, dependencies, and decision owners. Staffing and coordination across the teams involved."
  },
  {
    title: "Respect the operating context",
    text: "Architecture that works with existing systems. Security, compliance, and review built into the plan."
  },
  {
    title: "Make change usable",
    text: "Pilot, rollout, and training. Clear reporting on progress, risks, and the decisions leadership needs to make."
  }
];
const capabilityQuestions = [
  "What should we build next?",
  "What will support it over time?",
  "Where does intelligence help?",
  "How will the work get done?"
];
const engagementFit = [
  "An outcome to work towards",
  "An initiative or team to strengthen",
  "A product to keep improving"
];
const questions = [
  [
    "How do we start?",
    "We start with the business goal and constraints, then propose a first phase with priorities, budget, team shape, and decision points."
  ],
  [
    "Can you work with our team and help it grow?",
    "Yes. We embed or lead an initiative alongside your team. We can also shape roles, assess technical hires, and onboard people."
  ],
  [
    "How do you handle handoff?",
    "We document decisions, keep code maintainable, and build runbooks as we go. Walkthroughs and a planned transition give your team the context to operate and extend the product."
  ],
  [
    "How do you stay accountable?",
    "We agree on delivery commitments and success measures, then review demos, spend, risks, and decisions with you. Customer feedback and adoption data guide what changes next."
  ],
  [
    "What does engagement look like commercially?",
    "A monthly retainer or a scoped initiative with milestones. We agree on responsibilities, budget, and review points up front, and make changes to scope or staffing explicit."
  ]
];

function Chapter({ number, children }: { number?: string; children: React.ReactNode }) {
  return (
    <p className="e-chapter">
      {number && <span>{number}</span>}
      {children}
    </p>
  );
}
function DecisionRows({ items }: { items: { title: string; text: string }[] }) {
  return (
    <dl className="e-decisions">
      {items.map((item, index) => (
        <div key={item.title} className="e-decision">
          <dt>
            <span aria-hidden="true">0{index + 1}</span>
            {item.title}
          </dt>
          <dd>{item.text}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function HomePage() {
  return (
    <div id="top" className="editorial-home">
      <EditorialMotion />
      <section className="studio-hero editorial-hero" aria-labelledby="hero-title">
        <div className="e-wrap">
          <div className="e-masthead">
            <span>Independent product &amp; technology studio</span>
            <span>Direction. Decisions. Delivery.</span>
          </div>
          <div className="e-hero-layout">
            <div className="e-hero-copy">
              <h1 id="hero-title">
                <span>Clarity on what to build.</span>
                <span>A team to deliver.</span>
              </h1>
              <p>
                We partner with founders and leadership teams to turn business goals into a roadmap,
                a team, and working software.
              </p>
              <p className="e-hero-secondary">
                We lead delivery and keep decisions, costs, and progress visible.
              </p>
              <div className="e-actions">
                <a
                  className="e-button"
                  href={`mailto:${site.email}?subject=Adra%20Product%20Studio%20%E2%80%94%20Intro`}
                >
                  Start a conversation <span aria-hidden="true">↗</span>
                </a>
                <SectionLink className="e-text-link" href="#approach">
                  Explore our approach <span aria-hidden="true">↓</span>
                </SectionLink>
              </div>
            </div>
            <div className="e-hero-art">
              <ProductStory />
            </div>
          </div>
          <div className="e-hero-foot">
            <span>A shared direction. A product you own.</span>
            <span aria-hidden="true">Scroll to explore ↓</span>
          </div>
        </div>
      </section>

      <section id="clients" className="e-clients" aria-labelledby="clients-title">
        <div className="e-wrap e-client-layout">
          <h2 id="clients-title">
            Teams we’ve
            <br /> partnered with
          </h2>
          <div className="e-client-names">
            {clientLinks.map((client) => (
              <a key={client.name} href={client.href} target="_blank" rel="noreferrer">
                {client.name}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <p>
            Other teams work in stealth.
            <br />
            References in conversation.
          </p>
        </div>
      </section>

      <section id="approach" className="e-principles" aria-labelledby="approach-title">
        <div className="e-wrap e-principle-layout">
          <div className="e-principle-intro" data-editorial-reveal>
            <Chapter number="01">How we work</Chapter>
            <h2 id="approach-title">
              Direction, decisions,
              <br />
              and delivery.
              <br />
              <span>One team.</span>
            </h2>
            <p>
              Align the roadmap, budget, team, and architecture around what the business needs next.
            </p>
            <div className="e-small-rule" aria-hidden="true" />
          </div>
          <div className="e-principle-rows">
            {principles.map((principle, index) => (
              <article key={principle.title}>
                <span className="e-principle-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="startups" className="e-section e-startups" aria-labelledby="startups-title">
        <div className="e-wrap">
          <header className="e-section-heading" data-editorial-reveal>
            <Chapter number="02">For startups</Chapter>
            <h2 id="startups-title">
              Make sense of the idea.
              <br />
              <span>Build what matters first.</span>
            </h2>
          </header>
          <div className="e-startup-layout">
            <div className="e-startup-copy">
              <p className="e-lead">
                Work through ambiguity together. Decide what to test, build, and defer—then turn
                that direction into a working product.
              </p>
              <DecisionRows items={startupDecisions} />
            </div>
            <div className="e-startup-art">
              <ProcessVignette kind="startup" />
            </div>
          </div>
          <div className="e-continuity">
            <span>Built for what comes next</span>
            <p>
              Hire, onboard, and grow with the product. Decisions, code, and context stay accessible
              as your team takes ownership—or we keep working alongside you.
            </p>
          </div>
        </div>
      </section>

      <section
        id="enterprises"
        className="e-section e-enterprises"
        aria-labelledby="enterprises-title"
      >
        <div className="e-wrap">
          <header className="e-split-heading" data-editorial-reveal>
            <div>
              <Chapter number="03">For enterprises</Chapter>
              <h2 id="enterprises-title">
                From leadership priority
                <br />
                <span>to daily use.</span>
              </h2>
            </div>
            <p className="e-lead">
              Translate a leadership priority into an executable plan. Align stakeholders, work with
              existing systems, and set a pace that fits the operational risk.
            </p>
          </header>
          <div className="e-enterprise-layout">
            <div className="e-enterprise-art">
              <ProcessVignette kind="enterprise" />
            </div>
            <DecisionRows items={enterpriseDecisions} />
          </div>
          <div className="e-initiatives">
            <h3>Common initiatives</h3>
            <div>
              {enterpriseCapabilities.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        className="e-section e-capabilities"
        aria-labelledby="capabilities-title"
      >
        <div className="e-wrap">
          <header className="e-split-heading" data-editorial-reveal>
            <div>
              <Chapter number="04">Our capabilities</Chapter>
              <h2 id="capabilities-title">
                Judgment across
                <br />
                <span>the whole product.</span>
              </h2>
            </div>
            <p className="e-lead">
              Product, technology, and operations. Bring the skills the work needs, with clear
              ownership as the team evolves.
            </p>
          </header>
          <div className="e-capability-index">
            {coreDisciplines.map((discipline, index) => (
              <article className="e-capability-row" key={discipline.title}>
                <span className="e-row-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="e-capability-title">
                  <h3>{discipline.title}</h3>
                  <p>{capabilityQuestions[index]}</p>
                </div>
                <div className="e-capability-detail">
                  {discipline.items.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <aside className="e-ai-note">
            <span className="e-chapter">AI &amp; the team</span>
            <div>
              <h3>AI changes the work. Judgment still matters.</h3>
              <p>
                Adopt AI and coding agents with clear architecture, review, tests, and ownership.
                Faster code is one part of delivery; teams and working practices need to evolve too.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="e-ownership" aria-labelledby="ownership-title">
        <div className="e-wrap e-ownership-layout">
          <div className="e-ownership-copy" data-editorial-reveal>
            <Chapter>Built together. Yours to build on.</Chapter>
            <h2 id="ownership-title">
              The work stays.
              <br />
              <span>So does the context.</span>
            </h2>
            <p>
              Decisions, code, and documentation stay accessible. We build runbooks as we go, then
              prepare your team to operate and extend the product.
            </p>
            <p>
              Continue together, or make a planned transition. Ownership should never be an
              afterthought.
            </p>
          </div>
          <div className="e-ownership-art">
            <ProcessVignette kind="ownership" />
          </div>
        </div>
      </section>

      <section
        id="engagement"
        className="e-section e-engagement"
        aria-labelledby="engagement-title"
      >
        <div className="e-wrap">
          <header className="e-split-heading" data-editorial-reveal>
            <div>
              <Chapter number="05">Ways to work together</Chapter>
              <h2 id="engagement-title">
                A partner at the
                <br />
                <span>level you need.</span>
              </h2>
            </div>
            <p className="e-lead">
              Start with an open question, a defined initiative, or an existing team. Agree on what
              we own.
            </p>
          </header>
          <div className="e-engagement-index">
            {engagementModels.map((model, index) => (
              <article key={model.title} className="e-engagement-row">
                <div>
                  <span className="e-row-index">0{index + 1}</span>
                  <h3>{model.title}</h3>
                  <p className="e-engagement-fit">{engagementFit[index]}</p>
                </div>
                <p className="e-engagement-description">{model.description}</p>
                <div className="e-engagement-detail">
                  {model.bullets.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="questions" className="e-questions" aria-labelledby="questions-title">
        <div className="e-wrap e-question-layout">
          <div>
            <Chapter>Before we begin</Chapter>
            <h2 id="questions-title">
              A few practical
              <br />
              questions.
            </h2>
          </div>
          <Accordion type="single" collapsible className="e-faq">
            {questions.map(([question, answer], index) => (
              <AccordionItem key={question} value={`question-${index}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contact" className="e-contact" aria-labelledby="contact-title">
        <div className="e-wrap">
          <Chapter number="06">Start a conversation</Chapter>
          <h2 id="contact-title" data-editorial-reveal>
            What are you trying
            <br />
            <span>to achieve?</span>
          </h2>
          <div className="e-contact-bottom">
            <div>
              <p>
                Bring the goal, the constraints, and the questions you haven’t resolved. You don’t
                need a finished brief.
              </p>
              <a
                className="e-contact-email"
                href={`mailto:${site.email}?subject=Adra%20Product%20Studio%20%E2%80%94%20Intro`}
              >
                {site.email}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="e-contact-prompts">
              <span>A short note is enough</span>
              <p>The goal and where things stand</p>
              <p>Your team, budget, and timing</p>
              <p>The decisions you need help with</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
