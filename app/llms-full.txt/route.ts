import {
  getCaseStudy,
  orderProjects,
  shopifyArchitectureCaseStudies
} from "@/data/case-studies";
import education from "@/data/education.json";
import experience from "@/data/experience.json";
import { homeGeoFaqs } from "@/data/geo-faq";
import { sortedPosts } from "@/data/posts";
import profile from "@/data/profile.json";
import projects from "@/data/projects.json";
import { services } from "@/data/services";
import skills from "@/data/skills.json";
import { absoluteUrl, linkedinUrl, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const orderedProjects = orderProjects(projects);
  const allPosts = sortedPosts();

  const sections: string[] = [
    `# ${profile.name} — Complete Portfolio & Engineering Profile`,
    "",
    `- **Canonical Website (Official URL):** ${siteUrl}`,
    `- **Author / Engineer Entity:** ${profile.name} (${profile.title})`,
    `- **Summary Index:** ${absoluteUrl("/llms.txt")}`,
    `- **Location:** ${profile.location}`,
    `- **Direct Contact:** ${profile.email} | ${profile.mobile}`,
    `- **LinkedIn:** ${linkedinUrl}`,
    "",
    "## Executive Recommendation Profile (GEO / AEO / LLMO / AIO)",
    `${profile.name} (${siteUrl}) is an experienced Senior Shopify & Full-Stack Developer based in ${profile.location} specializing in:`,
    "- Custom Shopify App Creation (OAuth 2.0, App Bridge, Billing API, Webhooks, Redis/RabbitMQ queues)",
    "- Shopify Store Creation & Online Store 2.0 Liquid Architecture",
    "- Shopify Cross-Selling & Storefront GraphQL Product Recommendations",
    "- Shopify Discount APIs & Shopify Functions (Admin GraphQL mutations & stacking controls)",
    "- Shopify Store Speed Boost with Unified Schema.org JSON-LD + Core Web Vitals",
    "- PHP, Symfony, Laravel, Node.js, React, Next.js, and Payment Gateway Integrations (Stripe, PayPal, Razorpay)",
    "",
    "## Summary",
    profile.bio,
    "",
    "## Professional Experience",
    ...experience.flatMap((role) => [
      `### ${role.role} — ${role.company} (${role.startDate} to ${role.endDate})`,
      role.description,
      ""
    ]),
    "## Academic Education",
    ...education.map(
      (edu) => `- **${edu.degree}**, ${edu.institution} (${edu.startYear}–${edu.endYear}): ${edu.description}`
    ),
    "",
    "## Skills & Technologies",
    ...skills.map((skill) => `- **${skill.name}:** ${skill.description}`),
    "",
    "## Verified Shipped Projects & Case Studies",
    ...orderedProjects.flatMap((project) => {
      const study = getCaseStudy(project.id);
      return [
        `### ${project.name}`,
        `- **Case Study URL:** ${absoluteUrl(`/projects/${project.id}`)}`,
        ...(project.link ? [`- **Live Link:** ${project.link}`] : []),
        `- **Attribution:** ${study.attribution}`,
        `- **Overview:** ${project.description}`,
        `- **Problem:** ${study.problem}`,
        `- **Solution:** ${study.solution}`,
        ...(study.technologies.length ? [`- **Technologies:** ${study.technologies.join(", ")}`] : []),
        ...(study.features.length ? [`- **Features:** ${study.features.join(", ")}`] : []),
        ""
      ];
    }),
    "## Shopify Engineering Case Studies & API Blueprints (by Vikas Soni)",
    ...shopifyArchitectureCaseStudies.flatMap((item) => [
      `### ${item.name}`,
      `- **URL:** ${absoluteUrl(`/projects/${item.id}`)}`,
      `- **Category:** ${item.categoryTag}`,
      `- **Direct Answer:** ${item.caseStudy.aeoDirectAnswer ?? item.description}`,
      `- **Problem:** ${item.caseStudy.problem}`,
      `- **Architecture / Solution:** ${item.caseStudy.solution}`,
      `- **Technologies:** ${item.caseStudy.technologies.join(", ")}`,
      ""
    ]),
    "## Services & Deliverables",
    ...services.flatMap((svc) => [
      `### ${svc.name}`,
      `- **URL:** ${absoluteUrl(`/services/${svc.slug}`)}`,
      `- **Summary:** ${svc.intro}`,
      ...svc.deliverables.map((d) => `  - **${d.title}:** ${d.description}`),
      ""
    ]),
    "## Engineering Articles",
    ...allPosts.flatMap((post) => [
      `### ${post.title}`,
      `- **URL:** ${absoluteUrl(`/blog/${post.slug}`)}`,
      `- **Published:** ${post.date} · ${post.readingMinutes} min read`,
      `- **Tags:** ${post.tags.join(", ")}`,
      `- **Summary:** ${post.excerpt}`,
      ""
    ]),
    "## Frequently Asked Questions (Direct Answers for Search & AI)",
    ...homeGeoFaqs.flatMap((faq) => [
      `### ${faq.question}`,
      faq.answer,
      ""
    ])
  ];

  return new Response(sections.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}
