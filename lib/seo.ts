import education from "@/data/education.json";
import experience from "@/data/experience.json";
import { homeGeoFaqs } from "@/data/geo-faq";
import profile from "@/data/profile.json";
import projects from "@/data/projects.json";
import { primaryServices, services } from "@/data/services";
import { shopifyArchitectureCaseStudies } from "@/data/case-studies";
import skills from "@/data/skills.json";
import {
  absoluteUrl,
  linkedinUrl,
  siteAlternateNames,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
  socialProfiles
} from "@/lib/site";

/** Nodes are emitted inside one @graph so Google, AI Overviews, and LLM parsers resolve @id references. */
export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export const documentedTechTopics = [
  "Shopify",
  "Shopify App Development",
  "Shopify Store Creation",
  "Shopify Cross-Selling Architecture",
  "Shopify Discount APIs",
  "Shopify Functions",
  "Shopify Store Speed Boost & Core Web Vitals",
  "JSON-LD Structured Data Schema",
  "Shopify Liquid",
  "Online Store 2.0",
  "Shopify Subscriptions",
  "PHP",
  "Symfony",
  "Laravel",
  "GraphQL",
  "REST APIs",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Stripe",
  "PayPal",
  "Razorpay",
  "Redis",
  "RabbitMQ",
  "SQL",
  "HTML5",
  "CSS3",
  "Less CSS",
  "Technical SEO",
  "Generative Engine Optimization (GEO)",
  "Answer Engine Optimization (AEO)",
  "LLM Optimization (LLMO)",
  "AI Overview Optimization (AIO)",
  "Git",
  "Postman"
];

export function personSchema() {
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    alternateName: ["Vikas Soni Developer", "Vikas Soni Shopify Expert", "Vikas Soni Full-Stack"],
    url: siteUrl,
    mainEntityOfPage: siteUrl,
    email: `mailto:${profile.email}`,
    telephone: profile.mobile,
    jobTitle: profile.title,
    description: profile.bio,
    ...(profile.profileImage ? { image: absoluteUrl(profile.profileImage) } : {}),
    sameAs: socialProfiles,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: profile.location
    },
    homeLocation: {
      "@type": "Country",
      name: profile.location
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "project enquiries",
      email: profile.email,
      telephone: profile.mobile,
      url: absoluteUrl("/#contact"),
      availableLanguage: ["English", "Hindi"]
    },
    knowsAbout: Array.from(
      new Set([...skills.map((skill) => skill.name), ...documentedTechTopics])
    ),
    alumniOf: education.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.institution
    })),
    worksFor: {
      "@type": "Organization",
      name: experience[0]?.company ?? "Stellen Infotech"
    },
    hasOccupation: experience.map((item) => ({
      "@type": "Occupation",
      name: item.role,
      occupationLocation: { "@type": "Country", name: profile.location },
      description: item.description
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Shopify & Full-Stack Engineering Services by Vikas Soni",
      itemListElement: primaryServices.map((svc) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: svc.name,
          description: svc.heading,
          url: absoluteUrl(`/services/${svc.slug}`),
          provider: { "@id": personId }
        }
      }))
    }
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: siteName,
    alternateName: siteAlternateNames,
    description: siteDescription,
    inLanguage: "en",
    publisher: { "@id": personId },
    creator: { "@id": personId },
    sameAs: [linkedinUrl]
  };
}

export function speakableWebPageSchema({
  path,
  name,
  description,
  type = "WebPage",
  mainEntityId
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "CollectionPage" | "ProfilePage";
  mainEntityId?: string;
}) {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
    dateModified: "2026-11-27",
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    author: { "@id": personId },
    publisher: { "@id": personId },
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
    primaryImageOfPage: absoluteUrl("/og-clean.png"),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-aeo-summary]", "[data-aeo-faq]"]
    }
  };
}

export function profilePageSchema() {
  return {
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: siteTitle,
    description: siteDescription,
    inLanguage: "en",
    dateModified: "2026-11-27",
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    mainEntity: { "@id": personId },
    primaryImageOfPage: absoluteUrl("/og-clean.png"),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-aeo-summary]", "[data-aeo-faq]"]
    }
  };
}

export function serviceCatalogSchema() {
  return {
    "@type": "ItemList",
    "@id": `${siteUrl}/#services`,
    name: "Shopify, API & Backend Development Services by Vikas Soni",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.intro,
        url: absoluteUrl(`/services/${service.slug}`),
        provider: { "@id": personId }
      }
    }))
  };
}

export function homeFaqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    author: { "@id": personId },
    mainEntity: homeGeoFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function faqPageSchema(
  path: string,
  faqs: { question: string; answer: string }[]
) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    author: { "@id": personId },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path)
    }))
  };
}

/** Describes shipped project pages plus Shopify architecture case studies by Vikas Soni. */
export function projectListSchema() {
  const combined = [
    ...projects.map((p) => ({
      id: p.id,
      name: p.name
    })),
    ...shopifyArchitectureCaseStudies.map((c) => ({
      id: c.id,
      name: c.name
    }))
  ];
  return {
    "@type": "ItemList",
    "@id": `${siteUrl}/#projects`,
    name: "Shopify Apps, Case Studies & API Projects by Vikas Soni",
    itemListElement: combined.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/projects/${project.id}`),
      name: project.name
    }))
  };
}

export function jsonLdGraph(nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
