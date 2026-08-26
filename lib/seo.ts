import education from "@/data/education.json";
import experience from "@/data/experience.json";
import profile from "@/data/profile.json";
import projects from "@/data/projects.json";
import skills from "@/data/skills.json";
import { absoluteUrl, siteDescription, siteName, siteUrl, socialProfiles } from "@/lib/site";

/** Nodes are emitted inside one @graph so Google resolves the @id references. */
export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export function personSchema() {
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    telephone: profile.mobile,
    jobTitle: "Shopify App Developer & Full Stack Developer",
    description: profile.bio,
    image: absoluteUrl("/og-clean.png"),
    sameAs: socialProfiles,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: profile.location
    },
    knowsAbout: skills.map((skill) => skill.name),
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
    }))
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: siteName,
    description: siteDescription,
    inLanguage: "en",
    publisher: { "@id": personId }
  };
}

export function profilePageSchema() {
  return {
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: siteName,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    mainEntity: { "@id": personId },
    primaryImageOfPage: absoluteUrl("/og-clean.png")
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

/** The home page also advertises every project as an ItemList for rich results. */
export function projectListSchema() {
  return {
    "@type": "ItemList",
    name: "Projects by Vikas Soni",
    itemListElement: projects.map((project, index) => ({
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
