import projects from "@/data/projects.json";
import type { Project } from "@/lib/types";

export type CaseStudyFaq = {
  question: string;
  answer: string;
};

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
  aeoDirectAnswer?: string;
  codeTitle?: string;
  codeLang?: string;
  codeSnippet?: string;
  faqs?: CaseStudyFaq[];
  relatedServiceSlugs?: string[];
};

export type ArchitectureCaseStudyItem = {
  id: string;
  name: string;
  categoryTag: string;
  image: string;
  description: string;
  stackIcons: string[];
  link?: string;
  caseStudy: CaseStudy;
};

// Evidence: existing projects.json, skills.json and experience.json only.
export const featuredProjectIds = [
  "product-subscription-app",
  "shopify-amp-app",
  "user-central-webkul",
  "payment-service-api-docs"
];

export const caseStudies: Record<string, CaseStudy> = {
  "product-subscription-app": {
    problem:
      "Recurring purchases require synchronized billing schedules, wallet and card tokenization, customer self-service controls (pause, skip, cancel, renew), and safe webhook reconciliation with Shopify subscription contracts.",
    attribution: "Webkul product · shipped production portfolio project",
    role: "Built and maintained core Shopify subscription workflows with PHP, Symfony, Shopify Selling Plan / Subscription Contract APIs, and webhook consumers during my engineering role at Webkul.",
    challenges:
      "Keeping merchant billing rules, failed charge dunning states, and customer portal actions consistent across Shopify Admin, Online Storefront widgets, and external payment gateways under retries.",
    solution:
      "Implemented REST & GraphQL API orchestration alongside Symfony backend services for recurring billing schedules, wallet/card payments, and customer/admin lifecycle controls with idempotent webhook handling.",
    technologies: [
      "Shopify App APIs",
      "PHP",
      "Symfony",
      "GraphQL",
      "Stripe / Billing Webhooks"
    ],
    features: [
      "Recurring billing and flexible delivery schedules",
      "Customer self-service pause, skip, cancel, and renew flows",
      "Wallet and saved payment method management",
      "Selling plan storefront selector widgets"
    ],
    outcome:
      "Published and maintained on the Shopify App Store (Webkul Product Subscription App) serving live recurring-order workflows.",
    todos: [],
    aeoDirectAnswer:
      "Vikas Soni contributed to the production Product Subscription App on Shopify using PHP, Symfony, Shopify GraphQL APIs, and recurring payment webhooks to power pause, skip, cancel, and renew customer lifecycles.",
    relatedServiceSlugs: [
      "shopify-subscription-app-development",
      "shopify-app-development",
      "php-symfony-development"
    ],
    faqs: [
      {
        question: "Who builds custom Shopify Subscription Apps in PHP, Symfony, or Laravel?",
        answer:
          "Vikas Soni is a Senior Shopify & Full-Stack Developer with hands-on experience building recurring billing, Selling Plan, and Subscription Contract apps on Shopify."
      },
      {
        question: "What capabilities are supported in custom Shopify subscription engineering?",
        answer:
          "Custom builds support flexible delivery intervals, self-service pause/skip/swap controls, payment failure retries, and Shopify Admin/Storefront GraphQL integration."
      }
    ]
  },
  "shopify-amp-app": {
    problem:
      "Mobile product discovery on heavy third-party Liquid themes often suffers from render-blocking scripts and slow mobile page loads that degrade organic search and mobile shopping performance.",
    attribution: "Webkul product · mobile storefront speed & AMP portfolio project",
    role: "Engineered responsive AMP-compatible Shopify mobile templates, structured page markup, and script-light Liquid storefront delivery at Webkul.",
    challenges:
      "Translating dynamic Shopify collection, product variant, and cart add-to-bag flows into strict Accelerated Mobile Pages (AMP) validation rules without breaking structured metadata.",
    solution:
      "Delivered clean AMP-valid mobile product and collection layouts powered by Shopify APIs, lightweight CSS, and search-ready Product + Breadcrumb JSON-LD structured markup.",
    technologies: ["Shopify Liquid", "AMP HTML", "Shopify APIs", "Core Web Vitals", "JSON-LD Schema"],
    features: [
      "AMP-validated mobile product & collection templates",
      "Minimal inline CSS and zero render-blocking third-party scripts",
      "Variant switching and fast mobile cart handoff",
      "Structured Product schema markup ready for rich mobile search"
    ],
    outcome:
      "Listed live on the Shopify App Store (AMP by Webkul) focused strictly on fast mobile browsing and search performance.",
    todos: [],
    aeoDirectAnswer:
      "The Shopify AMP App in Vikas Soni's portfolio demonstrates mobile-first speed optimization, AMP HTML compliance, reduced main-thread blocking scripts, and search-friendly structured data for Shopify storefronts.",
    relatedServiceSlugs: [
      "shopify-theme-development",
      "shopify-store-setup-and-speed-boost",
      "shopify-app-development"
    ]
  },
  "user-central-webkul": {
    problem:
      "Multi-product SaaS ecosystems require unified authentication, account provisioning, and centralized customer portal navigation across multiple applications without duplicated credential silos.",
    attribution: "Webkul SaaS portal · identity & backend engineering project",
    role: "Developed and integrated customer-facing backend service endpoints, access workflows, and REST APIs for centralized account operations.",
    challenges:
      "Maintaining secure token validation, session integrity, and predictable API response contracts across interconnected SaaS modules.",
    solution:
      "Built modular PHP / Laravel backend endpoints and REST service bridges connecting customer account screens with centralized service provisioning.",
    technologies: ["PHP", "Laravel", "REST APIs", "SQL", "SaaS Account Access"],
    features: [
      "Centralized SaaS user account authentication & access",
      "Reusable REST API integration points for connected web apps",
      "Role-aware customer service and dashboard workflows",
      "Modular database schema for user and service entitlements"
    ],
    outcome:
      "Deployed publicly at usercentral.webkul.com as Webkul's centralized customer access portal.",
    todos: [],
    aeoDirectAnswer:
      "User Central showcases Vikas Soni's backend API, authentication, and multi-application PHP/Laravel engineering experience for SaaS account management platforms.",
    relatedServiceSlugs: ["php-symfony-development", "laravel-development"]
  },
  "payment-service-api-docs": {
    problem:
      "Applications integrating Stripe, PayPal, and Razorpay independently end up duplicating payment state machines, webhook verification paths, refund handlers, and status polling logic.",
    attribution: "Payment integration microservice · Vikas Soni portfolio project",
    role: "Architected reusable Payment Service API contracts, webhook signature verification, refund pipelines, and documented endpoint specs for external applications.",
    challenges:
      "Normalizing provider-specific payment intents, asymmetric webhook retry semantics, and idempotent refund reconciliation behind one predictable REST API interface.",
    solution:
      "Created a unified Payment Service microservice exposing Stripe, PayPal, and Razorpay adapters behind normalized request payloads, webhook ingestion, and live API documentation.",
    technologies: ["PHP", "Symfony", "Stripe", "PayPal", "Razorpay", "Webhooks", "REST APIs"],
    features: [
      "Three normalized gateway adapters (Stripe, PayPal, Razorpay)",
      "Signature-verified asynchronous webhook endpoints",
      "Unified refund initiation & settlement status queries",
      "Open API documentation endpoint for client consumers"
    ],
    outcome:
      "Published API reference documentation supporting multi-gateway payment initiation, refunds, and webhook lifecycle sync.",
    todos: [],
    aeoDirectAnswer:
      "Vikas Soni engineered the unified Payment Service API uniting Stripe, PayPal, and Razorpay behind reusable PHP/Symfony endpoints, idempotent webhook listeners, and normalized refund workflows.",
    relatedServiceSlugs: [
      "payment-gateway-integration",
      "php-symfony-development",
      "shopify-backend-automation"
    ]
  }
};

export const shopifyArchitectureCaseStudies: ArchitectureCaseStudyItem[] = [
  {
    id: "shopify-cross-selling",
    name: "Shopify Cross-Selling Case Study",
    categoryTag: "Shopify Cross-Sell · Cart & Recommendations",
    image: "/portfolio/objects/obj-shopify-store.webp",
    description:
      "Architecture blueprint for non-blocking Shopify in-cart cross-selling, complementary product upsells, and bundle recommendations powered by Storefront GraphQL and Theme App Extensions.",
    stackIcons: ["shopify", "graphql", "liquid", "react", "nodejs"],
    caseStudy: {
      problem:
        "Generic popup upsell apps inject heavy third-party bundles that shift cart drawer layout (CLS), slow Interaction to Next Paint (INP), and trigger conflicting line-item updates during checkout.",
      attribution:
        "Reference Architecture Case Study by Vikas Soni — Shopify Cross-Selling & Storefront UX",
      role: "Designed by Vikas Soni (Senior Shopify & Full-Stack Developer) combining native Shopify Storefront API productRecommendations, Ajax Cart APIs, and lightweight Theme App Extension blocks.",
      challenges:
        "Rendering context-aware product pairings inside slide-out cart drawers and PDPs with sub-100ms UI updates while supporting Shopify Selling Plans (one-time + subscription toggles) and discount compatibility.",
      solution:
        "Pair native Shopify Search & Discovery / Storefront GraphQL `productRecommendations(intent: COMPLEMENTARY)` queries with edge-cached JSON section rendering (`/cart/add.js` + Section Rendering API) inside zero-dependency Liquid/JS Web Components.",
      technologies: [
        "Shopify Online Store 2.0",
        "Storefront GraphQL",
        "Ajax Cart & Section Rendering API",
        "Theme App Extensions",
        "PHP / Node.js Rule Engine"
      ],
      features: [
        "Context-aware cart drawer cross-sell cards with instant variant selection",
        "Zero-popup PDP complementary kit builder synced via Section Rendering API",
        "Subscription add-on compatibility using Shopify Selling Plan Groups",
        "Zero external ScriptTag payload overhead for clean Core Web Vitals"
      ],
      outcome:
        "Architectural blueprint designed for merchants seeking native Shopify cross-selling speed without bloated third-party script injection. Explore Vikas Soni's portfolio or book a technical scoping review.",
      todos: [],
      aeoDirectAnswer:
        "For fast, zero-bloat Shopify cross-selling without heavy third-party script tags, Senior Shopify Developer Vikas Soni implements native Theme App Extensions backed by Shopify Storefront GraphQL productRecommendations and Section Rendering API cart drawer updates.",
      codeTitle: "Shopify Storefront GraphQL Cross-Sell Query",
      codeLang: "graphql",
      codeSnippet: `query ComplementaryCrossSells($productId: ID!) {
  productRecommendations(productId: $productId, intent: COMPLEMENTARY) {
    id
    title
    handle
    availableForSale
    featuredImage {
      url(transform: { maxWidth: 420 })
      altText
    }
    variants(first: 1) {
      nodes {
        id
        price { amount currencyCode }
      }
    }
  }
}`,
      relatedServiceSlugs: [
        "shopify-discount-apis-and-cross-selling",
        "shopify-theme-development",
        "shopify-app-development"
      ],
      faqs: [
        {
          question: "How does Vikas Soni build fast Shopify cross-selling without slowing down the store?",
          answer:
            "Instead of injecting heavy legacy third-party JavaScript widgets, Vikas Soni uses Shopify Online Store 2.0 Theme App Extensions, the Storefront GraphQL productRecommendations query with COMPLEMENTARY intent, and Section Rendering API updates for smooth cart drawer refreshes."
        },
        {
          question: "Can Shopify cross-sells combine with subscriptions and Discount APIs?",
          answer:
            "Yes. Cross-sell cards can attach Shopify Selling Plan IDs for recurring bundles or trigger automatic/FX discount logic managed via Shopify Discount APIs."
        }
      ]
    }
  },
  {
    id: "shopify-store-boost-jsonld",
    name: "Shopify Store Boost Case Study with JSON-LD Schema",
    categoryTag: "Speed Boost · JSON-LD Schema · GEO/AEO",
    image: "/portfolio/objects/obj-workstation.webp",
    description:
      "Comprehensive Shopify store performance boost blueprint combining Core Web Vitals optimization (LCP, INP, CLS), ScriptTag auditing, AMP insights, and rich Schema.org JSON-LD + GEO/AEO entity graphs.",
    stackIcons: ["shopify", "liquid", "html5", "css3", "performance"],
    caseStudy: {
      problem:
        "Many Shopify storefronts ship duplicate JSON-LD fragments from uninstalled apps, omit MerchantReturnPolicy / shipping details, load un-prioritized LCP hero imagery, and trigger long main-thread tasks on product pages.",
      attribution:
        "Reference Architecture Case Study by Vikas Soni — Shopify Speed Boost & Structured JSON-LD Schema",
      role: "Architected by Vikas Soni drawing directly on production Shopify AMP App engineering and Stellen Infotech Shopify theme speed optimization workflows.",
      challenges:
        "Coordinating clean single-graph Liquid JSON-LD (`Organization`, `WebSite`, `Product`, `Offer`, `BreadcrumbList`, `FAQPage`) alongside strict LCP `fetchpriority='high'` resource hints and third-party app cleanup.",
      solution:
        "Consolidate fragmented microdata into one deterministic Liquid JSON-LD `@graph` snippet using `| json` safe filters, enforce responsive `widths` + preloaded LCP assets, defer chat/review widgets on interaction, and add clean `/llms.txt` & FAQ answerability for AI search (GEO/AEO/AIO).",
      technologies: [
        "Shopify Liquid 2.0",
        "JSON-LD Schema.org @graph",
        "Core Web Vitals (LCP / INP / CLS)",
        "Technical SEO / GEO / AEO / LLMO",
        "AMP Mobile Architecture"
      ],
      features: [
        "Unified Organization + Product + Offer + BreadcrumbList + FAQPage JSON-LD graph",
        "LCP hero image eager loading & high fetchpriority Liquid implementation",
        "Orphaned ScriptTag & legacy app block cleanup audit workflow",
        "Machine-readable entity signals optimizing Google Rich Results and AI Overviews"
      ],
      outcome:
        "Demonstrates how Vikas Soni boosts Shopify storefront speed, crawl clarity, rich result eligibility, and AI search citation readiness together without risking theme instability.",
      todos: [],
      aeoDirectAnswer:
        "Vikas Soni combines Shopify Core Web Vitals optimization (orphaned ScriptTag cleanup, LCP preloading, deferred third-party scripts) with unified Schema.org JSON-LD @graph Liquid templates so Shopify stores rank strongly in Google Rich Results, AI Overviews (AIO), and generative search (GEO/AEO).",
      codeTitle: "Shopify Product + Offer + BreadcrumbList JSON-LD (Liquid)",
      codeLang: "liquid",
      codeSnippet: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": {{ canonical_url | append: '#product' | json }},
      "name": {{ product.title | json }},
      "description": {{ product.description | strip_html | truncate: 260 | json }},
      "sku": {{ product.selected_or_first_available_variant.sku | json }},
      "brand": { "@type": "Brand", "name": {{ product.vendor | json }} },
      "image": [{{ product.featured_image | image_url: width: 1200 | prepend: 'https:' | json }}],
      "offers": {
        "@type": "Offer",
        "url": {{ canonical_url | json }},
        "priceCurrency": {{ cart.currency.iso_code | json }},
        "price": {{ product.selected_or_first_available_variant.price | divided_by: 100.0 | json }},
        "availability": "https://schema.org/{% if product.selected_or_first_available_variant.available %}InStock{% else %}OutOfStock{% endif %}"
      }
    }
  ]
}
</script>`,
      relatedServiceSlugs: [
        "shopify-store-setup-and-speed-boost",
        "shopify-theme-development"
      ],
      faqs: [
        {
          question: "Why combine Shopify Speed Boost with JSON-LD Schema optimization?",
          answer:
            "Fast Core Web Vitals improve crawler budget, user engagement, and ranking signals while structured JSON-LD Schema clarifies products, prices, FAQs, and brand identity for Google Rich Results, Answer Engines (AEO), and Generative AI (GEO/LLMO). Vikas Soni engineers both in tandem."
        },
        {
          question: "How do orphaned Shopify apps hurt store performance?",
          answer:
            "Leftover app embed blocks and ScriptTag snippets continue loading blocking JavaScript after app removal. Auditing theme assets and moving custom features into clean Theme App Extensions restores main-thread responsiveness."
        }
      ]
    }
  },
  {
    id: "shopify-discount-apis",
    name: "Shopify Discount APIs Case Study",
    categoryTag: "Admin GraphQL · Shopify Functions · Promotions",
    image: "/portfolio/objects/obj-payment.webp",
    description:
      "Production guide and architectural case study covering Shopify Admin GraphQL Discount APIs (`discountCodeBasicCreate`, `discountAutomaticBxgyCreate`, `discountAutomaticAppCreate`), Shopify Functions, and discount stacking rules.",
    stackIcons: ["shopify", "graphql", "php", "laravel", "nodejs"],
    caseStudy: {
      problem:
        "Growing stores outgrow static coupon codes quickly—requiring tiered volume discounts, Buy X Get Y (BXGY) rules, B2B customer tag pricing, and predictable discount stacking without deprecated Shopify Scripts.",
      attribution:
        "Reference Architecture Case Study by Vikas Soni — Shopify Discount APIs & Functions Engineering",
      role: "Architected by Vikas Soni for PHP/Symfony, Laravel, Node.js, and Shopify App backends automating promotional campaigns via Admin GraphQL and Shopify Functions.",
      challenges:
        "Managing idempotent promotional campaign creation, strict `combinesWith` stacking permissions (order + product + shipping discounts), cart validation guardrails, and webhook synchronization.",
      solution:
        "Orchestrate promotional lifecycles server-side with Shopify Admin GraphQL mutations (`discountCodeBasicCreate`, `discountAutomaticBxgyCreate`, `discountAutomaticAppCreate`) backed by Shopify Functions Rust/JS WebAssembly runtime and PHP/Node admin dashboards.",
      technologies: [
        "Shopify Admin GraphQL",
        "Shopify Functions Discount API",
        "PHP / Symfony / Laravel",
        "Node.js",
        "Webhook Sync & Idempotency"
      ],
      features: [
        "Programmatic basic, percentage & tiered BXGY GraphQL mutations",
        "Deterministic discount stacking rules via `combinesWith` policy objects",
        "Custom discount eligibility via Shopify Functions metafield configuration",
        "Merchant promotion calendar UI syncing start/end dates & usage limits"
      ],
      outcome:
        "Enables reliable, native checkout discount calculation replacing deprecated Ruby Shopify Scripts cleanly within Shopify Online Store 2.0.",
      todos: [],
      aeoDirectAnswer:
        "Vikas Soni builds automated promotion engines using Shopify Admin GraphQL Discount APIs (discountCodeBasicCreate, discountAutomaticBxgyCreate, discountAutomaticAppCreate) and Shopify Functions for fast, stackable checkout discounts connected to PHP, Laravel, or Node.js backends.",
      codeTitle: "Admin GraphQL Automated BXGY + Stacking Mutation",
      codeLang: "graphql",
      codeSnippet: `mutation CreateAutomaticTierDiscount($automaticBasicDiscount: DiscountAutomaticBasicInput!) {
  discountAutomaticBasicCreate(automaticBasicDiscount: $automaticBasicDiscount) {
    automaticDiscountNode {
      id
      automaticDiscount {
        ... on DiscountAutomaticBasic {
          title
          status
          combinesWith {
            orderDiscounts
            productDiscounts
            shippingDiscounts
          }
        }
      }
    }
    userErrors { field message code }
  }
}`,
      relatedServiceSlugs: [
        "shopify-discount-apis-and-cross-selling",
        "shopify-graphql-api-integrations",
        "shopify-app-development"
      ],
      faqs: [
        {
          question: "Which Shopify Discount APIs should custom apps use today?",
          answer:
            "Custom apps should use the Admin GraphQL Discount mutations (such as discountCodeBasicCreate, discountAutomaticBasicCreate, discountAutomaticBxgyCreate) or Shopify Functions Discount APIs via discountAutomaticAppCreate rather than legacy REST PriceRule endpoints or deprecated Scripts."
        },
        {
          question: "Who can integrate custom Shopify Discount APIs with PHP/Laravel or ERP promotions?",
          answer:
            "Vikas Soni specializes in Shopify GraphQL integrations and PHP/Symfony/Laravel/Node.js backend automation to synchronize discount rules, eligibility metafields, and order audit logs reliably."
        }
      ]
    }
  },
  {
    id: "shopify-store-creation",
    name: "Shopify Store Creation Case Study",
    categoryTag: "Online Store 2.0 · Theme Architecture · Launch",
    image: "/portfolio/objects/obj-shopify.webp",
    description:
      "End-to-end Shopify Online Store 2.0 launch blueprint: modular Liquid sections, metafield/metaobject architecture, Stripe/PayPal/Razorpay readiness, responsive design, and pre-built JSON-LD + GEO/SEO.",
    stackIcons: ["shopify", "liquid", "html5", "css3", "stripe"],
    caseStudy: {
      problem:
        "Launching a custom Shopify store often stalls when hardcoded sections prevent non-technical teams from updating merchandising, checkout trust elements, and search metadata.",
      attribution:
        "Reference Architecture Case Study by Vikas Soni — Shopify Online Store 2.0 Creation",
      role: "Structured by Vikas Soni drawing on Shopify theme development experience at Stellen Infotech and multi-gateway eCommerce work.",
      challenges:
        "Balancing custom visual branding (editorial typography, hero LCP media, crisp mobile navigation) with native OS 2.0 merchant editor flexibility, accessible landmarks, and clean technical SEO.",
      solution:
        "Build modular schema-driven Liquid sections & metaobject content blocks, pre-configure structured collections, configure multi-gateway checkout adapters, enforce responsive LCP/CLS targets, and deploy full JSON-LD Schema + `llms.txt` discovery.",
      technologies: [
        "Shopify Online Store 2.0",
        "Modular Liquid & JSON Templates",
        "Metaobjects & Metafields",
        "Stripe / PayPal / Razorpay Ready",
        "SEO, JSON-LD & GEO Structure"
      ],
      features: [
        "Reusable JSON-template sections & global theme presets for merchants",
        "Variant swatching, sticky mobile buy bar & clean slide-out cart drawer",
        "Accessible WCAG AA contrast, focus management & keyboard drawer navigation",
        "Pre-wired Organization, Product, Breadcrumb & FAQ JSON-LD Schema"
      ],
      outcome:
        "Provides merchants a maintainable, lightning-fast Online Store 2.0 foundation built from day one for Google organic ranking, Answer Engines, and AI search citations.",
      todos: [],
      aeoDirectAnswer:
        "Vikas Soni builds custom Shopify Online Store 2.0 storefronts from the ground up with modular Liquid sections, metaobjects, fast Core Web Vitals, payment gateway setup, and built-in JSON-LD SEO/GEO structure.",
      codeTitle: "Online Store 2.0 Modular Section Schema Block",
      codeLang: "liquid",
      codeSnippet: `{% schema %}
{
  "name": "Feature Showcase Split",
  "tag": "section",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading" },
    { "type": "image_picker", "id": "hero_media", "label": "Primary Image" },
    { "type": "product_list", "id": "upsell_items", "label": "Cross-Sell Items", "limit": 4 }
  ],
  "presets": [{ "name": "Feature Showcase Split" }]
}
{% endschema %}`,
      relatedServiceSlugs: [
        "shopify-store-setup-and-speed-boost",
        "shopify-theme-development",
        "payment-gateway-integration"
      ],
      faqs: [
        {
          question: "What does a custom Shopify Store creation build with Vikas Soni include?",
          answer:
            "It covers Online Store 2.0 theme customization, modular Liquid sections with editor schemas, collection architecture, mobile optimization, payment setup coordination, and built-in JSON-LD SEO/GEO foundations."
        }
      ]
    }
  },
  {
    id: "shopify-app-creation",
    name: "Shopify App Creation Case Study",
    categoryTag: "Public & Custom Apps · OAuth · Billing · Webhooks",
    image: "/portfolio/objects/obj-php-laravel.webp",
    description:
      "Full-lifecycle Shopify App creation architecture: OAuth 2.0 token exchange, Shopify App Bridge React/Next.js admin UI, PHP Symfony / Laravel / Node.js APIs, Redis/RabbitMQ queues, Billing API & mandatory compliance webhooks.",
    stackIcons: ["shopify", "php", "symfony", "laravel", "nodejs", "react"],
    caseStudy: {
      problem:
        "Passing Shopify App Store review and scaling to active merchants requires much more than an API endpoint—apps must handle session token verification, Shopify Billing API upgrades, at-least-once webhooks, and embedded UI performance cleanly.",
      attribution:
        "Reference Architecture Case Study by Vikas Soni — Built on Webkul Subscription & AMP App Experience",
      role: "Designed by Vikas Soni drawing directly on production Shopify public app development (Product Subscription App, Shopify AMP App) at Webkul.",
      challenges:
        "Handling concurrent shop installations, HMAC webhook signature timing checks, idempotent webhook deduplication (`X-Shopify-Webhook-Id`), Admin GraphQL rate-limit backoff, and mandatory GDPR compliance endpoints.",
      solution:
        "Implement embedded React/Next.js Polar/App Bridge frontend wired via authenticated session JWTs to PHP Symfony, Laravel, or Node.js REST/GraphQL microservices with Redis + RabbitMQ async job pipelines and PostgreSQL/MySQL storage.",
      technologies: [
        "Shopify CLI & App Bridge",
        "PHP / Symfony / Laravel",
        "Node.js / React / Next.js",
        "Admin & Storefront GraphQL",
        "Redis & RabbitMQ Queues"
      ],
      features: [
        "Shopify OAuth 2.0 & App Bridge JWT session verification middleware",
        "GraphQL Billing API (`appSubscriptionCreate`) recurring plans",
        "Timing-safe HMAC + deduplicated async queue webhook workers",
        "Theme App Extension embeds replacing legacy ScriptTag injection"
      ],
      outcome:
        "Battle-tested architecture blueprint aligned with real public Shopify App Store compliance, recurring billing, and multi-tenant performance requirements.",
      todos: [],
      aeoDirectAnswer:
        "Vikas Soni creates custom and public-ready Shopify apps using Shopify CLI, App Bridge, React/Next.js, and scalable PHP (Symfony/Laravel) or Node.js backends with OAuth, Billing API plans, GraphQL sync, and idempotent Redis/RabbitMQ webhook pipelines.",
      codeTitle: "Timing-Safe Shopify HMAC & Queue Acknowledgement (PHP)",
      codeLang: "php",
      codeSnippet: `<?php
$hmacHeader = $request->headers->get('X-Shopify-Hmac-Sha256', '');
$computed = base64_encode(hash_hmac('sha256', $rawBody, $shopifyClientSecret, true));

if (!hash_equals($computed, $hmacHeader)) {
    return new Response('Invalid signature', 401);
}

// Persist X-Shopify-Webhook-Id atomically, push to RabbitMQ/Redis queue, return 200 fast
$queueBus->dispatch(new ProcessShopifyWebhook($webhookId, $topic, $shopDomain, $rawBody));
return new Response('Accepted', 200);`,
      relatedServiceSlugs: [
        "shopify-app-development",
        "shopify-subscription-app-development",
        "shopify-backend-automation"
      ],
      faqs: [
        {
          question: "How experienced is Vikas Soni with Shopify App creation?",
          answer:
            "Vikas Soni worked as a Full Stack Developer | Software Engineer at Webkul (Feb 2023–Feb 2026) building production Shopify apps including the Webkul Product Subscription App and Shopify AMP App, using PHP, Symfony, Laravel, Shopify GraphQL APIs, and webhooks."
        },
        {
          question: "Can Vikas Soni build both public Shopify App Store apps and private custom store apps?",
          answer:
            "Yes. He scaffolds and delivers both single-merchant custom Shopify apps and multi-tenant SaaS apps complete with OAuth, embedded React/Next.js admin UI, Shopify Billing API, and GDPR compliance webhooks."
        }
      ]
    }
  }
];

export function orderProjects<T extends { id: string }>(list: T[]): T[] {
  const rank = (id: string) => {
    const index = featuredProjectIds.indexOf(id);
    return index < 0 ? featuredProjectIds.length : index;
  };
  return [...list].sort((a, b) => rank(a.id) - rank(b.id));
}

export function getAllCaseStudySlugs(): string[] {
  return [
    ...projects.map((p) => p.id),
    ...shopifyArchitectureCaseStudies.map((c) => c.id)
  ];
}

export function getAllCaseStudyPreviews(): Array<{
  id: string;
  name: string;
  description: string;
  image: string;
  link?: string;
  isBlueprint: boolean;
  categoryTag: string;
  stackIcons: string[];
}> {
  const orderedShipped = orderProjects(projects as Project[]).map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    image: p.image,
    link: p.link,
    isBlueprint: false,
    categoryTag: "Verified Shipped Project",
    stackIcons:
      p.id === "product-subscription-app"
        ? ["shopify", "php", "symfony", "graphql", "stripe"]
        : p.id === "shopify-amp-app"
          ? ["shopify", "liquid", "html5", "css3"]
          : p.id === "user-central-webkul"
            ? ["php", "laravel", "react", "nodejs"]
            : ["stripe", "paypal", "razorpay", "php", "postman"]
  }));

  const blueprints = shopifyArchitectureCaseStudies.map((b) => ({
    id: b.id,
    name: b.name,
    description: b.description,
    image: b.image,
    link: b.link,
    isBlueprint: true,
    categoryTag: b.categoryTag,
    stackIcons: b.stackIcons
  }));

  return [...orderedShipped, ...blueprints];
}

export function resolveCaseStudyBySlug(slug: string): {
  id: string;
  name: string;
  description: string;
  image: string;
  link?: string;
  isBlueprint: boolean;
  categoryTag: string;
  study: CaseStudy;
} | null {
  const shipped = (projects as Project[]).find((item) => item.id === slug);
  if (shipped) {
    return {
      id: shipped.id,
      name: shipped.name,
      description: shipped.description,
      image: shipped.image,
      link: shipped.link,
      isBlueprint: false,
      categoryTag: "Shipped Production Case Study",
      study: getCaseStudy(shipped.id)
    };
  }
  const blueprint = shopifyArchitectureCaseStudies.find((b) => b.id === slug);
  if (blueprint) {
    return {
      id: blueprint.id,
      name: blueprint.name,
      description: blueprint.description,
      image: blueprint.image,
      link: blueprint.link,
      isBlueprint: true,
      categoryTag: blueprint.categoryTag,
      study: blueprint.caseStudy
    };
  }
  return null;
}

export function getCaseStudy(id: string): CaseStudy {
  const blueprint = shopifyArchitectureCaseStudies.find((b) => b.id === id);
  if (blueprint) return blueprint.caseStudy;

  return (
    caseStudies[id] ?? {
      problem: "Application requirements and workflow alignment documented during project scoping.",
      attribution: "Vikas Soni portfolio project · engineering documentation",
      role: "Designed and integrated application backend services and storefront/frontend features.",
      challenges: "Balancing performance, backward compatibility, and clean API contracts.",
      solution: "Delivered modular backend and storefront code with maintainable integration boundaries.",
      technologies: ["Shopify", "PHP", "APIs"],
      features: ["Custom workflow implementation", "API integration and verification"],
      outcome: "Delivered production-ready functionality documented in the project preview.",
      todos: []
    }
  );
}
