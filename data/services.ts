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
    metaTitle: `${name} Services`,
    metaDescription:
      intro.split(". ")[0] +
      ". Explore scope, deliverables and relevant portfolio projects.",
    keywords: [name],
    deliverables: deliverables.map(([title, description]) => ({
      title,
      description,
    })),
    relatedProjectIds,
    faqs: faqs.map(([question, answer]) => ({ question, answer })),
  };
}

export const services: Service[] = [
  service(
    "shopify-app-development",
    "Custom Shopify App Development",
    "Shopify apps built around the way your business works",
    "Build custom Shopify apps for merchant operations, customer experiences and SaaS integrations. I help merchants, agencies and SaaS founders scope app features, drawing on documented subscription, review and Shopify app work at Webkul and Stellen Infotech.",
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
      "reviewhub-stellen-infotech",
      "shopify-amp-app",
    ],
    [
      [
        "What relevant app experience can I review?",
        "The Product Subscription App, ReviewHub and Shopify AMP App are in my existing portfolio. Their case studies distinguish documented product capabilities from my individual responsibilities.",
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
    ["product-subscription-app", "reviewhub-stellen-infotech"],
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
      "fizazzle-booking-platform",
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
      "fizazzle-booking-platform",
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
    "Customize Shopify storefronts with Liquid sections, theme settings and responsive layouts. My Stellen Infotech experience records theme customization and performance-focused updates; existing storefront examples include White Rabbit Rice and SG Magnetics.",
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
    ["white-rabbit-rice-store", "sg-magnetics-store", "shopify-amp-app"],
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
];

export const primaryServices = services.slice(0, 6);
export const getService = (slug: string) =>
  services.find((item) => item.slug === slug);
