export type Profile = {
  name: string;
  email: string;
  mobile: string;
  bio: string;
  profileImage: string;
  resume: string;
  github: string;
  linkedin: string;
  location: string;
  title: string;
};

export type Project = {
  id: string;
  name: string;
  link: string;
  image: string;
  description: string;
};

export type Skill = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
  description: string;
};

export type CollectionName = "projects" | "skills" | "experience" | "education";

export type CollectionMap = {
  projects: Project;
  skills: Skill;
  experience: Experience;
  education: Education;
};

export type PortfolioData = {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
};
