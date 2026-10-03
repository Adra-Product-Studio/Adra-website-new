export const site = {
  name: "Adra Product Studio",
  url: "https://adraproductstudio.com",
  email: "vedha@adraproductstudio.com",
  indiaAddressLines: [
    "Sf No. 415, Codissia Road,",
    "Thaneerpandal Rd, Peelamedu,",
    "Coimbatore, Tamil Nadu 641004",
  ],
  USaddressLines: [
    "Adra Product Studio LLC",
    "3167 Davenport Rd",
    "Duluth, Georgia - 30096",
  ],
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
    title: "Product direction & design",
    items: [
      "Discovery, priorities, and product roadmaps",
      "UX/UI design and prototyping",
      "Usability testing and design systems",
      "Success measures and release planning"
    ]
  },
  {
    title: "Architecture & engineering",
    items: [
      "Technology choices and cost tradeoffs",
      "Web, mobile, APIs, and integrations",
      "Quality assurance, DevOps, and releases",
      "Security, observability, and maintainability"
    ]
  },
  {
    title: "Data & AI",
    items: [
      "Data engineering and analytics",
      "Dashboards and decision systems",
      "AI agents, ML, and automation where useful",
      "Evaluation, controls, and operational fit"
    ]
  },
  {
    title: "Teams & delivery",
    items: [
      "Staffing, budgets, and delivery planning",
      "Stakeholder alignment and progress reporting",
      "Product ops and customer success enablement",
      "Change management, documentation, and handoff"
    ]
  }
] as const;

export const enterpriseCapabilities = [
  "New products and internal applications",
  "Data platforms and decision systems",
  "AI agents and workflow automation",
  "Application modernization and integration",
  "Managed hosting, monitoring, and updates"
] as const;

export const engagementModels = [
  {
    title: "Product & delivery partner",
    description:
      "Work with leadership from problem framing through roadmap, team setup, and delivery.",
    bullets: [
      "Product and technical decisions together",
      "Budget, milestones, and team shape",
      "Execution with regular progress reviews"
    ]
  },
  {
    title: "Embedded team",
    description:
      "Add product, design, engineering, or data capability to an existing team or a defined initiative.",
    bullets: [
      "Clear responsibilities and shared cadence",
      "Works within your tools and constraints",
      "Scales with the work and internal hiring"
    ]
  },
  {
    title: "Ongoing product care",
    description:
      "Keep improving and operating the product after launch, with a team that knows its context.",
    bullets: [
      "Iteration, hosting, and monitoring",
      "Security and dependency updates",
      "Documentation and planned handoff"
    ]
  }
] as const;
