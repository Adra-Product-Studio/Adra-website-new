export const site = {
  name: "Adra Product Studio",
  url: "https://adraproductstudio.com",
  email: "vedha@adraproductstudio.com",
  addressLines: [
    "Sf No. 415, Codissia Road,",
    "Thaneerpandal Rd, Peelamedu,",
    "Coimbatore, Tamil Nadu 641004"
  ]
} as const;

export const navItems = [
  { label: "Startups", href: "#startups" },
  { label: "Enterprises", href: "#enterprises" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Engagement", href: "#engagement" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" }
] as const;

export const clientLinks = [
  { name: "Model Rocket", href: "https://www.modelrocket.ai/" },
  { name: "GoComet", href: "https://www.gocomet.com/" },
  { name: "People+AI", href: "https://peopleplus.ai/" },
  { name: "Ripple", href: "https://useripple.io/" },
  { name: "2nd Careers", href: "https://2ndcareers.com/" }
] as const;

export const stealthNote = "Other stealth mode startups";

export const coreDisciplines = [
  {
    title: "Product & UX",
    items: [
      "Discovery & scope shaping",
      "UX/UI design",
      "Design systems",
      "Prototyping & usability testing"
    ]
  },
  {
    title: "Full-stack engineering",
    items: [
      "Web & mobile applications",
      "API design",
      "Quality assurance",
      "DevOps & release tooling"
    ]
  },
  {
    title: "Data & analytics",
    items: [
      "Data engineering",
      "Analytics instrumentation",
      "Dashboards & reporting",
      "Data science / ML where it fits"
    ]
  },
  {
    title: "Ops & delivery",
    items: [
      "Product ops",
      "Customer success enablement",
      "Playbooks & documentation",
      "Clean handoff to internal teams"
    ]
  }
] as const;

export const enterpriseCapabilities = [
  "Algorithmic insights & decision systems",
  "Conversational AI agents",
  "Application modernization",
  "Custom application development",
  "Managed services (hosting, monitoring, updates)"
] as const;

export const engagementModels = [
  {
    title: "Team extension",
    description:
      "Add senior product, design, and engineering capacity without changing your org structure.",
    bullets: [
      "Works inside your tooling and cadence",
      "Fills specific skill gaps",
      "Scales up/down as needed"
    ]
  },
  {
    title: "End-to-end delivery",
    description:
      "We own delivery for a defined product or initiative—from problem framing to production.",
    bullets: [
      "Clear scope, milestones, and demos",
      "Architecture + UX decisions captured",
      "Documentation and handoff included"
    ]
  },
  {
    title: "Managed capability",
    description:
      "Ongoing iteration and maintenance when you want a small, reliable team on the line.",
    bullets: [
      "Monitoring and operational hygiene",
      "Incremental improvements",
      "Security and dependency updates"
    ]
  }
] as const;
