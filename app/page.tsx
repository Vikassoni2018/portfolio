import { JsonLd } from "@/components/JsonLd";
import { PortfolioPage } from "@/components/PortfolioPage";
import education from "@/data/education.json";
import experience from "@/data/experience.json";
import profile from "@/data/profile.json";
import projects from "@/data/projects.json";
import skills from "@/data/skills.json";
import {
  homeFaqSchema,
  jsonLdGraph,
  personSchema,
  profilePageSchema,
  projectListSchema,
  serviceCatalogSchema,
  websiteSchema
} from "@/lib/seo";
import type { PortfolioData } from "@/lib/types";

export default function Home() {
  const data: PortfolioData = {
    profile,
    projects,
    skills,
    experience,
    education
  };

  const schema = jsonLdGraph([
    personSchema(),
    websiteSchema(),
    profilePageSchema(),
    serviceCatalogSchema(),
    projectListSchema(),
    homeFaqSchema()
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PortfolioPage data={data} />
    </>
  );
}
