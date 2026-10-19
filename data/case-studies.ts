export type CaseStudy = {
  problem: string;
  attribution: string;
  role: string;
  challenges: string;
  solution: string;
  technologies: string[];
  features: string[];
  outcome: string;
  todos: string[];
};

// Evidence: existing projects.json, skills.json and experience.json only.
// These describe products and employer context, not sole authorship or measured impact.
export const featuredProjectIds = [
  "product-subscription-app",
  "payment-service-api-docs",
  "reviewhub-stellen-infotech",
  "white-rabbit-rice-store",
];

export const caseStudies: Record<string, CaseStudy> = {
  "product-subscription-app": {
    problem:
      "Recurring purchases involve more than a repeat order: customers and administrators need to manage payment methods, delivery schedules and changes to a subscription.",
    attribution: "Webkul product · employer project contribution",
    role: "My Webkul experience includes developing Shopify subscription applications with PHP, Symfony, Shopify APIs and backend services. This is a team product; the specific modules I owned still need to be documented.",
    challenges:
      "The documented scope spans recurring billing, wallet and card payments, and pause, skip, cancel and renew actions. Specific implementation challenges and their resolutions need confirmation.",
    solution:
      "The product connects subscription management with recurring billing and flexible delivery schedules. Customers and administrators can manage the subscription lifecycle. Internal architecture and API choices have not been documented in the portfolio.",
    technologies: [
      "Shopify",
      "PHP / Symfony (Webkul experience)",
      "Shopify APIs",
    ],
    features: [
      "Recurring billing",
      "Flexible delivery schedules",
      "Wallet and card payment management",
      "Pause, skip, cancel and renew subscriptions",
    ],
    outcome:
      "A public Shopify App Store listing is available for the product. The portfolio documents its capabilities; adoption, revenue and performance results have not been supplied.",
    todos: [
      "Confirm individual modules, responsibilities and collaboration boundaries.",
      "Add an approved architecture diagram, exact API details and a resolved technical challenge.",
      "Add permission-cleared results with a source and measurement period.",
    ],
  },
  "payment-service-api-docs": {
    problem:
      "Applications integrating several payment providers need a consistent way to work with payments, refunds, webhooks and transaction status.",
    attribution: "Payment integration project · Webkul experience context",
    role: "My Webkul experience records development of payment integration services using PHP, Symfony, secure APIs and webhooks. The Payment Service API is listed in my portfolio; its exact ownership and delivery context need confirmation.",
    challenges:
      "The documented scope brings Stripe, PayPal and Razorpay behind reusable endpoints. Provider-specific payment state and webhook behavior are relevant integration concerns; the actual implementation decisions are not yet documented.",
    solution:
      "A unified Payment Service API exposes reusable endpoints for external applications, covering provider integrations, payment webhooks, refunds and transaction status tracking. The existing API documentation link is retained below.",
    technologies: ["Stripe", "PayPal", "Razorpay", "Payment APIs", "Webhooks"],
    features: [
      "Three payment provider integrations",
      "Reusable endpoints for external applications",
      "Payment webhooks",
      "Refund handling",
      "Transaction status tracking",
    ],
    outcome:
      "The portfolio includes a link to API documentation. No transaction volume, availability, reconciliation accuracy or revenue results have been provided.",
    todos: [
      "Confirm ownership, employer attribution and which endpoints I implemented.",
      "Add a sanitized request-flow diagram and verified retry/security design.",
      "Confirm documentation availability and provide permission-cleared outcome evidence.",
    ],
  },
  "reviewhub-stellen-infotech": {
    problem:
      "Merchants need a way to collect and manage customer feedback and display it alongside products on their storefront.",
    attribution: "Stellen Infotech product · employer project context",
    role: "ReviewHub is attributed to Stellen Infotech in the existing portfolio. My role there includes Shopify app development and maintenance using PHP and Shopify APIs. My precise ReviewHub contribution needs confirmation before attributing specific features to me.",
    challenges:
      "The product spans feedback collection, management and storefront display. Specific technical constraints and implementation decisions have not been recorded.",
    solution:
      "The app combines review collection and management with storefront widgets for product reviews, star ratings and testimonials. The portfolio does not yet document its internal architecture.",
    technologies: [
      "Shopify",
      "Storefront widgets",
      "Shopify APIs (employer experience)",
    ],
    features: [
      "Customer feedback collection",
      "Review management",
      "Product review widgets",
      "Star ratings and testimonial display",
    ],
    outcome:
      "A Shopify App Store listing is available. These are product capabilities, not claims of review volume, improved conversion or individual ownership.",
    todos: [
      "Confirm my responsibilities and separate them from the team's work.",
      "Document approved architecture, exact stack and a technical challenge I resolved.",
      "Add approved screenshots and measured outcomes if available.",
    ],
  },
  "white-rabbit-rice-store": {
    problem:
      "A premium rice storefront needs to bring product discovery, brand storytelling and online purchasing into a coherent shopping experience.",
    attribution: "Portfolio storefront project · contribution details pending",
    role: "This storefront appears in my existing project portfolio. The original record does not identify my specific sections, delivery arrangement or ownership, so those details remain to be confirmed.",
    challenges:
      "The documented scope combines brand content with product discovery and purchasing. No specific engineering constraint, before/after audit or implementation challenge has been supplied.",
    solution:
      "A branded Shopify storefront presents White Rabbit's premium rice range with product discovery, storytelling and online purchasing. The existing storefront link and preview are retained.",
    technologies: ["Shopify", "Storefront"],
    features: [
      "Premium rice product discovery",
      "Brand storytelling",
      "Online purchasing",
      "Branded shopping experience",
    ],
    outcome:
      "The existing portfolio provides a storefront link and preview. Sales, page-speed and conversion measurements are not available.",
    todos: [
      "Confirm my role, client/employer attribution and delivered customizations.",
      "Document the theme stack, technical decisions and an approved challenge/solution example.",
      "Supply verified outcomes and confirm whether the demo requires a storefront password.",
    ],
  },
};

export function orderProjects<T extends { id: string }>(projects: T[]): T[] {
  const rank = (id: string) => {
    const index = featuredProjectIds.indexOf(id);
    return index < 0 ? featuredProjectIds.length : index;
  };
  return [...projects].sort((a, b) => rank(a.id) - rank(b.id));
}

export function getCaseStudy(id: string): CaseStudy {
  return (
    caseStudies[id] ?? {
      problem:
        "Editorial TODO: add the original business problem and the requirements behind this project.",
      attribution:
        "Existing portfolio project · individual contribution pending confirmation",
      role: "Editorial TODO: confirm my responsibilities, employer/client context and team contributions.",
      challenges:
        "Editorial TODO: describe a specific technical challenge I worked on and how it was resolved.",
      solution:
        "Only the project overview above is documented. Editorial TODO: add an approved architecture description and implementation decisions.",
      technologies: [],
      features: [],
      outcome:
        "No measured results have been supplied. The original preview and project link are preserved.",
      todos: [
        "Confirm the exact stack and features delivered by me.",
        "Provide permission-cleared architecture, screenshots and outcome evidence.",
      ],
    }
  );
}
