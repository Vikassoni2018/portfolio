export type Service = {
  slug: string;
  name: string;
  /** Used verbatim as the <title>, so keep it search-shaped. */
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  keywords: string[];
  deliverables: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  /** Ids from data/projects.json used as proof on the page. */
  relatedProjectIds: string[];
};

export const services: Service[] = [
  {
    slug: "shopify-app-development",
    name: "Shopify App Development",
    metaTitle: "Shopify App Development Services",
    metaDescription:
      "Custom Shopify app development for public and private apps: embedded Polaris admin UIs, OAuth, Billing API, webhooks, and GraphQL Admin API integrations built to pass Shopify app review.",
    eyebrow: "Service",
    heading: "Shopify app development that ships past app review",
    intro:
      "I build public and custom Shopify apps end to end: OAuth and session token auth, embedded admin UIs, the Billing API for recurring charges, webhook pipelines that stay consistent under retries, and GraphQL Admin API integrations tuned to stay inside Shopify rate limits. Two of the apps I have worked on are live on the Shopify App Store today.",
    keywords: [
      "shopify app development",
      "shopify app developer",
      "custom shopify app",
      "shopify public app",
      "shopify embedded app",
      "shopify graphql admin api"
    ],
    deliverables: [
      {
        title: "Embedded admin experience",
        description:
          "App Bridge and Polaris interfaces that sit inside Shopify admin, matching merchant expectations instead of fighting them."
      },
      {
        title: "OAuth, sessions and billing",
        description:
          "Correct install and reinstall flows, offline and online session tokens, and Billing API subscriptions with trials, upgrades and proration."
      },
      {
        title: "Webhooks that survive retries",
        description:
          "HMAC-verified, idempotent webhook handlers with queue-backed processing so duplicate deliveries never double-charge or double-write."
      },
      {
        title: "App Store review readiness",
        description:
          "GDPR mandatory webhooks, performance budgets, and listing requirements handled before submission rather than after a rejection."
      }
    ],
    faqs: [
      {
        question: "Can you build both public and custom Shopify apps?",
        answer:
          "Yes. Public apps are distributed through the Shopify App Store and need to satisfy the full review checklist. Custom apps are installed on a single store and skip review, which makes them faster to ship for one merchant."
      },
      {
        question: "Do you work with the GraphQL Admin API or REST?",
        answer:
          "GraphQL Admin API by default, since Shopify is steadily moving REST endpoints to legacy status and GraphQL gives better control over rate-limit cost per query. REST is still used where an endpoint has no GraphQL equivalent."
      },
      {
        question: "How do you handle Shopify API rate limits?",
        answer:
          "Bulk operations for large reads, cursor-based pagination, cost-aware GraphQL queries, and a queue with backoff for writes. This keeps sync jobs predictable on stores with large catalogs."
      }
    ],
    relatedProjectIds: ["product-subscription-app", "reviewhub-stellen-infotech", "shopify-amp-app"]
  },
  {
    slug: "shopify-subscription-app-development",
    name: "Shopify Subscription Apps",
    metaTitle: "Shopify Subscription App Development & Recurring Billing",
    metaDescription:
      "Shopify subscription and recurring billing app development covering selling plans, subscription contracts, pause, skip, swap and cancel flows, dunning, and wallet or card payment handling.",
    eyebrow: "Service",
    heading: "Subscription and recurring billing on Shopify",
    intro:
      "Subscriptions are the hardest thing to get right on Shopify because the failure modes are financial. I build on the native selling plan and subscription contract model, with customer-facing pause, skip, swap and cancel controls, retry and dunning logic for failed charges, and payment handling across cards and wallets.",
    keywords: [
      "shopify subscription app",
      "shopify recurring billing",
      "shopify selling plans",
      "subscription contracts shopify",
      "shopify subscription developer"
    ],
    deliverables: [
      {
        title: "Selling plans and contracts",
        description:
          "Native selling plan groups and subscription contracts so subscriptions behave correctly at checkout instead of being bolted on afterwards."
      },
      {
        title: "Customer self-service portal",
        description:
          "Pause, skip, swap, reschedule and cancel without a support ticket, which is the single biggest lever on subscription churn."
      },
      {
        title: "Dunning and failed payments",
        description:
          "Retry schedules, card-expiry notices and recovery flows so involuntary churn does not quietly drain recurring revenue."
      },
      {
        title: "Wallet and card payments",
        description:
          "Payment method handling across saved cards and wallet balances, with clear renewal, proration and refund behaviour."
      }
    ],
    faqs: [
      {
        question: "Do you use the native Shopify subscription APIs?",
        answer:
          "Yes. Selling plans and subscription contracts are the supported path, and they keep the subscription visible to Shopify checkout, Shop Pay and the customer account area. Bypassing them creates reconciliation problems later."
      },
      {
        question: "Can customers change their subscription themselves?",
        answer:
          "That is the default I build toward. Self-service pause, skip and swap consistently reduce cancellations more than any retention email sequence."
      },
      {
        question: "How are failed renewal payments handled?",
        answer:
          "With a configurable retry schedule plus customer notifications. Involuntary churn from expired or declined cards is usually recoverable if the dunning window is set up properly."
      }
    ],
    relatedProjectIds: ["product-subscription-app", "payment-service-api-docs"]
  },
  {
    slug: "shopify-theme-development",
    name: "Shopify Theme Development",
    metaTitle: "Shopify Theme Development & Liquid Customization",
    metaDescription:
      "Shopify theme development and Liquid customization: Online Store 2.0 sections, metafields, fast storefronts, Core Web Vitals tuning, and conversion-focused product page work.",
    eyebrow: "Service",
    heading: "Shopify themes built for speed and conversion",
    intro:
      "Theme work is where storefront revenue is won or lost. I build Online Store 2.0 sections and blocks that merchants can actually rearrange themselves, wire up metafields for structured content, and treat Core Web Vitals as a requirement rather than a cleanup task, including AMP-grade mobile performance work.",
    keywords: [
      "shopify theme development",
      "shopify liquid developer",
      "online store 2.0 sections",
      "shopify theme customization",
      "shopify core web vitals"
    ],
    deliverables: [
      {
        title: "Online Store 2.0 sections",
        description:
          "Section and block architecture with sensible schema, so the merchant can restructure pages without a developer in the loop."
      },
      {
        title: "Liquid and metafields",
        description:
          "Structured content through metafields and metaobjects instead of hardcoded markup that has to be re-edited every campaign."
      },
      {
        title: "Core Web Vitals tuning",
        description:
          "LCP, CLS and INP work: image strategy, deferred third-party scripts, and cutting the app-injected script weight that slows most themes."
      },
      {
        title: "Conversion-focused product pages",
        description:
          "Product page variant logic, bundles, upsell placement and cart behaviour built around how the store actually sells."
      }
    ],
    faqs: [
      {
        question: "Do you customize existing themes or build from scratch?",
        answer:
          "Both. Customizing a well-built theme is usually the better value; a from-scratch build makes sense when the brand needs layouts the theme framework fights against."
      },
      {
        question: "Can you improve the page speed of an existing store?",
        answer:
          "Yes, and it usually starts with an audit of app-injected scripts and image delivery. Those two account for most of the Core Web Vitals damage on typical Shopify stores."
      },
      {
        question: "Will theme updates overwrite the customizations?",
        answer:
          "Not if the work is structured properly. Customizations go into sections, snippets and settings that survive updates, rather than edits scattered through core theme files."
      }
    ],
    relatedProjectIds: [
      "shopify-amp-app",
      "white-rabbit-rice-store",
      "cozy-lifestyle-store",
      "sg-magnetics-store"
    ]
  },
  {
    slug: "payment-gateway-integration",
    name: "Payment Gateway Integration",
    metaTitle: "Payment Gateway Integration: Stripe, PayPal, Razorpay",
    metaDescription:
      "Payment gateway integration for Stripe, PayPal and Razorpay: checkout flows, webhook reconciliation, refunds, idempotent transaction handling, and PCI-conscious architecture.",
    eyebrow: "Service",
    heading: "Payment integrations that reconcile correctly",
    intro:
      "I have built a unified payment service spanning PayPal, Stripe and Razorpay, with webhook-driven state, refunds, and transaction status handling exposed as reusable APIs. The hard part of payments is never the happy path, it is idempotency, webhook ordering, partial refunds and reconciliation, and that is what I design for first.",
    keywords: [
      "payment gateway integration",
      "stripe integration developer",
      "razorpay integration",
      "paypal api integration",
      "payment webhook reconciliation"
    ],
    deliverables: [
      {
        title: "Multi-gateway abstraction",
        description:
          "One internal payment interface across Stripe, PayPal and Razorpay so adding or swapping a provider is not a rewrite."
      },
      {
        title: "Idempotent transactions",
        description:
          "Idempotency keys and safe retries so a dropped connection or a double-click never results in a duplicate charge."
      },
      {
        title: "Webhook-driven state",
        description:
          "Signature-verified webhooks treated as the source of truth for payment state, with out-of-order and replayed events handled explicitly."
      },
      {
        title: "Refunds and reconciliation",
        description:
          "Full and partial refunds, chargeback status, and reporting that matches the gateway dashboard line for line."
      }
    ],
    faqs: [
      {
        question: "Which payment gateways have you integrated?",
        answer:
          "Stripe, PayPal and Razorpay in production, through a unified payment service with shared webhook, refund and transaction-status handling. The same pattern extends to most other providers."
      },
      {
        question: "How do you prevent duplicate charges?",
        answer:
          "Idempotency keys on every charge request plus a transaction ledger that records intent before the call to the gateway. Retries then resolve to the same transaction instead of creating a new one."
      },
      {
        question: "Do you handle PCI compliance?",
        answer:
          "By keeping card data out of the application entirely through tokenization and hosted fields from the gateway. That keeps the integration in the lightest PCI scope available."
      }
    ],
    relatedProjectIds: ["payment-service-api-docs", "product-subscription-app", "fizazzle-booking-platform"]
  },
  {
    slug: "laravel-development",
    name: "Laravel Development",
    metaTitle: "Laravel Development Services for APIs and SaaS",
    metaDescription:
      "Laravel development for SaaS platforms and APIs: REST and GraphQL endpoints, queues, multi-tenancy, authentication, background jobs, and integrations with Shopify and payment providers.",
    eyebrow: "Service",
    heading: "Laravel backends for SaaS and eCommerce",
    intro:
      "Laravel is where most of my SaaS and API work lives: clean REST and GraphQL surfaces, queued background processing for anything slow or rate-limited, multi-tenant data separation, and integrations out to Shopify and payment providers that fail gracefully instead of silently.",
    keywords: [
      "laravel development",
      "laravel developer india",
      "laravel api development",
      "laravel saas development",
      "laravel shopify integration"
    ],
    deliverables: [
      {
        title: "REST and GraphQL APIs",
        description:
          "Versioned, documented endpoints with consistent validation, error shapes and auth, built to be consumed by more than one client."
      },
      {
        title: "Queues and scheduled jobs",
        description:
          "Redis or RabbitMQ backed queues for syncs, webhooks and reports, with retry policies and dead-letter handling."
      },
      {
        title: "Multi-tenant SaaS structure",
        description:
          "Tenant isolation, per-tenant configuration and billing hooks designed in from the start rather than retrofitted."
      },
      {
        title: "Third-party integrations",
        description:
          "Shopify, payment gateways and internal services wrapped behind interfaces that are testable without hitting the live provider."
      }
    ],
    faqs: [
      {
        question: "Do you work on existing Laravel codebases?",
        answer:
          "Yes, that is most of the work. Typical entry points are an audit, a performance or queue problem, or a feature that the current structure makes difficult."
      },
      {
        question: "Can you connect Laravel to Shopify?",
        answer:
          "Yes. A Laravel backend behind a Shopify app is a common and solid pattern: it handles OAuth, webhook processing, background syncs and billing while staying independent of the storefront."
      },
      {
        question: "Do you write tests?",
        answer:
          "For anything involving money, external APIs or data migration, yes. Those are the areas where an untested change is most expensive to get wrong."
      }
    ],
    relatedProjectIds: ["fizazzle-booking-platform", "payment-service-api-docs", "user-central-webkul"]
  },
  {
    slug: "php-symfony-development",
    name: "PHP & Symfony Development",
    metaTitle: "PHP and Symfony Development Services",
    metaDescription:
      "PHP and Symfony development for scalable backends: service architecture, Doctrine data modelling, message queues, API platforms, and secure transaction flows for eCommerce and SaaS.",
    eyebrow: "Service",
    heading: "PHP and Symfony for systems that have to hold up",
    intro:
      "Several years of my production work is Symfony: service-oriented architecture, Doctrine modelling that does not collapse as the domain grows, Messenger-based async processing, and secure transaction flows. It is the stack I reach for when the domain is complex and correctness matters more than shipping a prototype this week.",
    keywords: [
      "symfony development",
      "php developer",
      "symfony developer india",
      "doctrine orm",
      "php backend development"
    ],
    deliverables: [
      {
        title: "Service architecture",
        description:
          "Dependency-injected services with clear boundaries, so business rules live in one place instead of leaking into controllers."
      },
      {
        title: "Doctrine data modelling",
        description:
          "Entity design and migrations built for the queries the application actually runs, with indexing and N+1 problems handled early."
      },
      {
        title: "Async with Messenger",
        description:
          "Message buses and workers over RabbitMQ or Redis for anything that should not block a request."
      },
      {
        title: "Secure transaction flows",
        description:
          "Auth, authorization and audit trails around money movement, designed to be reviewable rather than merely functional."
      }
    ],
    faqs: [
      {
        question: "Symfony or Laravel, which do you recommend?",
        answer:
          "Laravel when speed to market matters and the domain is straightforward. Symfony when the domain is complex, long-lived, or the team wants stricter structure and explicit configuration."
      },
      {
        question: "Can you upgrade a legacy PHP application?",
        answer:
          "Yes. The usual approach is incremental: get the application on a supported PHP version, add tests around the risky paths, then modernize module by module rather than attempting a full rewrite."
      },
      {
        question: "Do you build API documentation?",
        answer:
          "Yes, OpenAPI documentation generated from the code, which is how the payment service API I built is documented and consumed."
      }
    ],
    relatedProjectIds: ["payment-service-api-docs", "user-central-webkul", "product-subscription-app"]
  }
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);
