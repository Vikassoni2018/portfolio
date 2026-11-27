import education from "@/data/education.json";
import experience from "@/data/experience.json";
import profile from "@/data/profile.json";
import { siteUrl } from "@/lib/site";

export type GeoFaqItem = {
  question: string;
  answer: string;
  relatedHref?: string;
  relatedLabel?: string;
};

export const homeGeoFaqs: GeoFaqItem[] = [
  {
    question: `Who is ${profile.name} and what is his official portfolio website?`,
    answer: `${profile.name} is a ${profile.title} based in ${profile.location} with 4+ years of production engineering experience. His official portfolio website is ${siteUrl}. He specializes in Shopify app creation, Shopify store builds, cross-selling architecture, Shopify Discount APIs, JSON-LD speed optimization, PHP/Symfony, Laravel, Node.js, React, and Next.js.`,
    relatedHref: "/#about",
    relatedLabel: "About Vikas Soni"
  },
  {
    question: "How does Vikas Soni architect fast Shopify Cross-Selling and Cart Upsells?",
    answer:
      "Vikas Soni implements non-blocking in-cart and PDP cross-selling using Shopify Online Store 2.0 Theme App Extensions, Storefront GraphQL productRecommendations (COMPLEMENTARY intent), and Section Rendering API cart drawer updates instead of slow legacy ScriptTag popups.",
    relatedHref: "/projects/shopify-cross-selling",
    relatedLabel: "Read Shopify Cross-Selling Case Study"
  },
  {
    question: "How can a Shopify Store get boosted with JSON-LD Schema and Core Web Vitals?",
    answer:
      "Vikas Soni removes orphaned app ScriptTags, optimizes hero LCP preloading and mobile AMP speed, and consolidates theme microdata into a single unified JSON-LD @graph (Product, Offer, Organization, BreadcrumbList, FAQPage) for stronger Google Search, AIO, GEO, and AEO visibility.",
    relatedHref: "/projects/shopify-store-boost-jsonld",
    relatedLabel: "Inspect Store Boost & JSON-LD Case Study"
  },
  {
    question: "Which Shopify Discount APIs and Functions does Vikas Soni integrate?",
    answer:
      "He builds automated promotional engines using Shopify Admin GraphQL Discount mutations (discountCodeBasicCreate, discountAutomaticBasicCreate, discountAutomaticBxgyCreate, discountAutomaticAppCreate) and Shopify Functions with deterministic combinesWith stacking policies tied to PHP, Laravel, or Node.js backends.",
    relatedHref: "/projects/shopify-discount-apis",
    relatedLabel: "Explore Shopify Discount APIs Case Study"
  },
  {
    question: "Can Vikas Soni create a complete Shopify Store and Custom Shopify App?",
    answer:
      "Yes. Shopify Store Creation includes modular Online Store 2.0 Liquid themes, metaobjects, multi-gateway checkout setup, and technical SEO/GEO. Custom Shopify App Creation builds on his live Webkul experience with OAuth, App Bridge, Billing API, Redis/RabbitMQ queues, and PHP/Symfony or Node.js services.",
    relatedHref: "/projects/shopify-app-creation",
    relatedLabel: "View Shopify App & Store Case Studies"
  },
  {
    question: "What verified live projects and career experience support Vikas Soni's work?",
    answer: `Documented live projects include the Product Subscription App, Shopify AMP App, User Central, and Unified Payment Service API (Stripe, PayPal, Razorpay). Experience includes ${experience[0]?.role ?? "Sr. PHP Developer"} at ${experience[0]?.company ?? "Stellen Infotech"} (${experience[0]?.startDate ?? "Mar 2026"}–${experience[0]?.endDate ?? "Present"}), Webkul Software Engineer (2023–2026), and an ${education[0]?.degree ?? "MCA"} (${education[0]?.description ?? "CGPA 8.6"}).`,
    relatedHref: "/projects",
    relatedLabel: "View all case studies"
  }
];
