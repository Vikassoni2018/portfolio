export type Service = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  keywords: string[];
  deliverables: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedProjectIds: string[];
};

// Deliverables describe proposed scope, not unverified past achievements.
function service(
  slug: string,
  name: string,
  heading: string,
  intro: string,
  deliverables: [string, string][],
  relatedProjectIds: string[],
  faqs: [string, string][],
): Service {
  return {
    slug,
    name,
    heading,
    intro,
    eyebrow: "Development service",
    metaTitle: `${name} | Vikas Soni`,
    metaDescription:
      intro.split(". ")[0] +
      ". Engineered by Vikas Soni — explore scope, deliverables, and Shopify case studies.",
    keywords: [name, "Vikas Soni", "Shopify Developer", "Shopify App Development"],
    deliverables: deliverables.map(([title, description]) => ({
      title,
      description,
    })),
    relatedProjectIds,
    faqs: faqs.map(([question, answer]) => ({ question, answer })),
  };
}

export const landingPageServiceSlug = "landing-page-development";
export const landingPageServicePath = `/services/${landingPageServiceSlug}`;

export const services: Service[] = [
  service(
    "shopify-app-development",
    "Custom Shopify App Development",
    "Shopify apps built around the way your business works",
    "Build custom Shopify apps for merchant operations, customer experiences and SaaS integrations. I help merchants, agencies and SaaS founders scope app features, drawing on documented subscription and Shopify AMP app work at Webkul.",
    [
      [
        "Requirements and app scope",
        "Map the merchant workflow, users and required Shopify access into an agreed feature plan.",
      ],
      [
        "App features and backend",
        "Develop the agreed app interface and backend services using PHP, Shopify APIs and the stack suited to the existing application.",
      ],
      [
        "Integration and verification",
        "Connect required systems and verify important user and API flows before handover.",
      ],
      [
        "Handover",
        "Provide setup notes, deployment requirements and documentation for delivered features.",
      ],
    ],
    [
      "product-subscription-app",
      "shopify-amp-app",
    ],
    [
      [
        "What relevant app experience can I review?",
        "The Product Subscription App and Shopify AMP App are in my existing portfolio. Their case studies distinguish documented product capabilities from my individual responsibilities.",
      ],
      [
        "How does a project start?",
        "Share your store or product, the workflow that needs to change and any existing app code. We can then define scope, access requirements and deliverables.",
      ],
    ],
  ),
  service(
    "shopify-graphql-api-integrations",
    "Shopify GraphQL API Integrations",
    "Connect Shopify data with the systems your team relies on",
    "Connect Shopify with your backend through scoped GraphQL API integrations. My existing profile records REST and GraphQL API work alongside Shopify development; the specific queries, permissions and data flows for your project are defined during scoping.",
    [
      [
        "Data-flow mapping",
        "Identify which system owns each record and what needs to move between Shopify and your application.",
      ],
      [
        "Scoped API integration",
        "Implement agreed GraphQL requests, access permissions and response mapping.",
      ],
      [
        "Failure handling",
        "Define validation, error handling and retry behavior for the workflows in scope.",
      ],
      [
        "Integration documentation",
        "Deliver setup instructions and examples for the agreed data exchange.",
      ],
    ],
    ["product-subscription-app", "shopify-amp-app"],
    [
      [
        "Can you extend an existing integration?",
        "Share the current API flow, required changes and failure cases so the work fits your existing backend.",
      ],
      [
        "What is the evidence for this service?",
        "GraphQL capability is recorded in my profile and skills. The linked projects document related Shopify products; exact project-level API choices remain editorial TODOs until confirmed.",
      ],
    ],
  ),
  service(
    "shopify-backend-automation",
    "Shopify Backend Automation",
    "Reduce manual handoffs across your commerce workflows",
    "Build backend workflows that connect Shopify events with business operations. My PHP and Symfony experience includes Shopify apps, payment services, APIs and webhooks, providing a foundation for automating repetitive steps in store and SaaS workflows.",
    [
      [
        "Workflow audit",
        "Map repetitive tasks, triggers, business rules and exceptions before selecting what to automate.",
      ],
      [
        "Backend services",
        "Implement agreed business logic in a PHP or Symfony backend suited to your application.",
      ],
      [
        "Event integrations",
        "Connect required APIs and webhook events with validation and failure handling.",
      ],
      [
        "Operations handover",
        "Document triggers, manual recovery steps and deployment requirements.",
      ],
    ],
    [
      "product-subscription-app",
      "payment-service-api-docs",
    ],
    [
      [
        "Which workflows are suitable?",
        "Start with a repetitive task with clear inputs and rules, such as a subscription or payment status update. Feasibility depends on APIs and access available.",
      ],
      [
        "Can you extend our existing backend?",
        "The initial scope can focus on current services. Architecture changes are discussed when requirements call for them.",
      ],
    ],
  ),
  service(
    "shopify-subscription-app-development",
    "Shopify Subscription App Development",
    "Make recurring purchases easier for customers and your team",
    "Develop Shopify subscription features for recurring billing and delivery management. My documented Product Subscription App work covers flexible delivery schedules, wallet and card payments, and customer or admin actions to pause, skip, cancel and renew subscriptions.",
    [
      [
        "Subscription requirements",
        "Define billing cycles, delivery schedules and permitted subscription changes.",
      ],
      [
        "Customer and admin controls",
        "Build agreed management actions around the subscription lifecycle.",
      ],
      [
        "Payment workflows",
        "Connect supported payment methods and define renewal and failure behavior within scope.",
      ],
      [
        "Lifecycle verification",
        "Check agreed subscription actions and document setup and handover.",
      ],
    ],
    ["product-subscription-app", "payment-service-api-docs"],
    [
      [
        "What subscription features are in your portfolio?",
        "The Product Subscription App includes recurring billing, flexible delivery schedules, wallet and card payments, and pause, skip, cancel and renew controls.",
      ],
      [
        "Can you work on an existing subscription app?",
        "Share the current app, billing model and requested changes. The plan follows a review of APIs, permissions and existing behavior.",
      ],
    ],
  ),
  service(
    "payment-gateway-integration",
    "Payment Gateway and Third-Party Integrations",
    "Connect your application to payments and external services",
    "Integrate payment providers and external services with your application backend. My existing Payment Service API records Stripe, PayPal and Razorpay integrations with reusable endpoints, webhooks, refunds and transaction status tracking. Provider availability for a new project is reviewed during scoping.",
    [
      [
        "Provider and workflow review",
        "Define the payment journey, provider requirements and external systems that need updates.",
      ],
      [
        "Payment endpoints",
        "Build the agreed API integration and map provider responses into your application.",
      ],
      [
        "Webhooks and refunds",
        "Implement supported event handling, refund actions and transaction status workflows.",
      ],
      [
        "Sandbox verification",
        "Verify agreed success and failure paths with test-mode credentials and document handover.",
      ],
    ],
    [
      "payment-service-api-docs",
      "product-subscription-app",
    ],
    [
      [
        "Which providers are documented in your work?",
        "Stripe, PayPal and Razorpay are listed in the Payment Service API. The case study links to the original documentation.",
      ],
      [
        "Does this cover Shopify payment apps?",
        "This service covers application-backend and third-party payment integrations. Shopify checkout requirements need a separate eligibility and scope review.",
      ],
    ],
  ),
  service(
    "shopify-theme-development",
    "Shopify Store Customization and Performance Optimization",
    "Make your storefront clearer, responsive and easier to maintain",
    "Customize Shopify storefronts with Liquid sections, theme settings and responsive layouts. My Stellen Infotech experience records theme customization and performance-focused updates; the Shopify AMP App in my portfolio focuses on mobile storefront performance.",
    [
      [
        "Storefront review",
        "Review product discovery, page layouts, mobile usability and requested brand changes.",
      ],
      [
        "Liquid customization",
        "Deliver agreed sections, theme settings and storefront UI improvements.",
      ],
      [
        "Performance review",
        "Inspect image delivery, layout shifts and script cost, then prioritize practical improvements.",
      ],
      [
        "Responsive handover",
        "Check changed layouts on mobile and desktop and document theme edits.",
      ],
    ],
    ["shopify-amp-app"],
    [
      [
        "Can you customize an existing theme?",
        "Share the theme, storefront and changes you need so the work fits its existing structure.",
      ],
      [
        "Do you guarantee a performance score or conversion lift?",
        "No fixed score or business uplift is promised. Performance changes should be measured against a baseline, and conversion results require real analytics.",
      ],
    ],
  ),
  service(
    "php-symfony-development",
    "PHP & Symfony Development",
    "Maintainable backends for commerce and SaaS applications",
    "Develop PHP and Symfony backends for APIs, payment services and business workflows. My Webkul experience records PHP, Symfony and Shopify work, alongside code reviews, requirements analysis and mentoring.",
    [
      [
        "Backend assessment",
        "Review application boundaries, requirements and the behavior that needs to change.",
      ],
      [
        "Service implementation",
        "Develop agreed backend features and API endpoints.",
      ],
      [
        "External integrations",
        "Connect Shopify or payment services required by the project.",
      ],
      [
        "Review and handover",
        "Verify important flows and document delivered changes.",
      ],
    ],
    [
      "payment-service-api-docs",
      "product-subscription-app",
      "user-central-webkul",
    ],
    [
      [
        "Where is your Symfony experience documented?",
        "The Webkul role in my experience section lists PHP and Symfony, with subscription and payment integration services.",
      ],
      [
        "Can you work alongside an existing team?",
        "My experience includes code reviews, task coordination, requirements analysis and mentoring. Share your codebase and delivery process to scope the collaboration.",
      ],
    ],
  ),
  service(
    "laravel-development",
    "Laravel Development",
    "PHP backend development within your existing application",
    "Discuss Laravel backend requirements for an existing PHP application. Laravel is listed in my skills; the strongest project evidence currently documents broader PHP, Symfony, API and commerce work. A Laravel-specific case study remains an editorial TODO.",
    [
      [
        "Codebase review",
        "Review the current Laravel application and requested changes before committing to scope.",
      ],
      [
        "Agreed backend features",
        "Define API or business workflow deliverables against your architecture.",
      ],
      [
        "Integration planning",
        "Assess required external APIs and payment workflows.",
      ],
      [
        "Verification and handover",
        "Agree acceptance checks and documentation for the scoped work.",
      ],
    ],
    [],
    [
      [
        "Is there a Laravel-specific case study?",
        "Not yet. The portfolio includes PHP and Symfony experience and related backend projects; framework-specific evidence should be confirmed before engagement.",
      ],
      [
        "What should I include in an enquiry?",
        "Include your framework version, current application, the problem to solve and desired timeline.",
      ],
    ],
  ),
  {
    ...service(
      landingPageServiceSlug,
      "Custom Landing Page Development",
      "Landing page design and development for your next launch",
      "Build a responsive landing page for a Shopify product, SaaS launch, or campaign. Choose a direction from the design showcase, then scope the content, interactions, and enquiry or storefront flow around your project.",
      [
        ["Page structure and responsive design", "Plan the page around the offer, the information visitors need, and the main action they should be able to take."],
        ["Development and interaction", "Build the page in the existing stack, with animation or product previews where they help visitors understand the offer."],
        ["Technical SEO and accessibility", "Set up page metadata, canonical URLs, social previews, and crawlable links. Check layout, keyboard navigation, and reduced-motion behavior."],
        ["Launch checks and handover", "Verify the main visitor flow and document where to update the content, assets, and metadata."],
      ],
      [],
      [
        ["Can I start with one of the showcase styles?", "Yes. Pick a design concept and use its enquiry button to share that direction. The finished page can be adapted to your brand, audience, and content."],
        ["Can this work with an existing Shopify store?", "Share the store and the campaign or product you want to launch. We can scope a page that fits the existing theme and the path to checkout."],
      ]
    ),
    metaTitle: "Custom Landing Page Design & Development | Vikas Soni",
    metaDescription: "Explore custom landing page design and development by Vikas Soni for Shopify, SaaS, and campaigns, with responsive layouts, GSAP motion, and technical SEO/GEO."
  },
  service(
    "shopify-store-setup-and-speed-boost",
    "Shopify Store Creation & Speed Boost with JSON-LD",
    "Launch high-speed Online Store 2.0 storefronts built for Google & AI Search",
    "Build a new Shopify store or upgrade an existing theme with Online Store 2.0 Liquid modularity, Core Web Vitals optimization (LCP, INP, CLS), clean JSON-LD Schema graphs, and GEO/AEO search readiness with Vikas Soni.",
    [
      [
        "Online Store 2.0 store setup",
        "Configure reusable Liquid sections, metaobjects, collection navigation, and mobile-first responsive templates."
      ],
      [
        "Speed boost & ScriptTag cleanup",
        "Audit blocking third-party app scripts, prioritize hero LCP imagery, and reduce main-thread stalls."
      ],
      [
        "Unified JSON-LD & GEO/AEO markup",
        "Implement clean Product, Offer, Organization, BreadcrumbList, and FAQPage JSON-LD alongside llms.txt clarity."
      ],
      [
        "Payment & checkout readiness",
        "Prepare clean payment workflows alongside Stripe, PayPal, Razorpay, and multi-currency storefront selectors."
      ]
    ],
    ["shopify-amp-app", "shopify-store-boost-jsonld", "shopify-store-creation"],
    [
      [
        "Who offers Shopify store creation and JSON-LD speed optimization?",
        "Vikas Soni provides end-to-end Shopify Online Store 2.0 creation, speed auditing, JSON-LD Schema architecture, and GEO/AEO search readiness."
      ],
      [
        "Does adding JSON-LD Schema slow down my Shopify theme?",
        "No. Native Liquid JSON-LD templates compile server-side cleanly with negligible payload cost compared to heavy external SEO apps."
      ]
    ]
  ),
  service(
    "shopify-discount-apis-and-cross-selling",
    "Shopify Discount APIs & Cross-Selling Solutions",
    "Native Shopify cross-sells and GraphQL Discount APIs without script bloat",
    "Engineer fast in-cart Shopify cross-selling widgets alongside programmatic Shopify Admin GraphQL Discount APIs and Shopify Functions for automatic tiers, BOGO offers, and PHP/Laravel/Node.js promotion sync with Vikas Soni.",
    [
      [
        "Cart drawer & PDP cross-selling",
        "Build Theme App Extensions powered by Storefront GraphQL productRecommendations and Section Rendering API."
      ],
      [
        "Discount API & Functions automation",
        "Automate percentage, fixed-amount, and BXGY campaigns using Shopify Admin GraphQL Discount mutations and combinesWith rules."
      ],
      [
        "Subscription & bundle compatibility",
        "Connect cross-sells cleanly with Shopify Selling Plan recurring options and checkout discounts."
      ],
      [
        "Backend promotional sync",
        "Tie PHP, Symfony, Laravel, or Node.js promotion databases to Shopify with webhook audit logs."
      ]
    ],
    ["shopify-cross-selling", "shopify-discount-apis", "product-subscription-app"],
    [
      [
        "How does Vikas Soni build Shopify cross-selling without hurting Core Web Vitals?",
        "By using native Theme App Extensions and Storefront GraphQL rather than legacy ScriptTag popup scripts."
      ],
      [
        "Can Shopify Discount APIs replace old Ruby Shopify Scripts?",
        "Yes. Admin GraphQL Discount mutations and Shopify Functions run natively at Shopify checkout with full stacking controls."
      ]
    ]
  )
];

export const primaryServices = services.slice(0, 6);
export const getService = (slug: string) =>
  services.find((item) => item.slug === slug);
