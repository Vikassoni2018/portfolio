import { PortfolioPage } from "@/components/PortfolioPage";
import education from "@/data/education.json";
import experience from "@/data/experience.json";
import profile from "@/data/profile.json";
import projects from "@/data/projects.json";
import skills from "@/data/skills.json";
import type { PortfolioData } from "@/lib/types";

export default function Home() {
  const data: PortfolioData = {
    profile,
    projects,
    skills,
    experience,
    education
  };

  return <PortfolioPage data={data} />;
}
