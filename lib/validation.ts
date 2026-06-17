import type { Education, Experience, Profile, Project, Skill } from "@/lib/types";

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function required(value: string, label: string) {
  if (!value) {
    throw new Error(`${label} is required.`);
  }
  return value;
}

export function validateProfile(input: unknown): Profile {
  const data = input as Partial<Profile>;
  return {
    name: required(asString(data.name), "Name"),
    email: required(asString(data.email), "Email"),
    mobile: asString(data.mobile),
    bio: asString(data.bio),
    profileImage: asString(data.profileImage),
    resume: asString(data.resume),
    github: asString(data.github),
    linkedin: asString(data.linkedin),
    location: asString(data.location),
    title: required(asString(data.title), "Portfolio title")
  };
}

export function validateProject(input: unknown): Omit<Project, "id"> {
  const data = input as Partial<Project>;
  return {
    name: required(asString(data.name), "Project name"),
    link: asString(data.link),
    image: asString(data.image),
    description: required(asString(data.description), "Project description")
  };
}

export function validateSkill(input: unknown): Omit<Skill, "id"> {
  const data = input as Partial<Skill>;
  return {
    name: required(asString(data.name), "Skill name"),
    image: asString(data.image),
    description: required(asString(data.description), "Skill description")
  };
}

export function validateExperience(input: unknown): Omit<Experience, "id"> {
  const data = input as Partial<Experience>;
  return {
    company: required(asString(data.company), "Company name"),
    role: required(asString(data.role), "Role"),
    startDate: asString(data.startDate),
    endDate: asString(data.endDate),
    description: required(asString(data.description), "Experience description")
  };
}

export function validateEducation(input: unknown): Omit<Education, "id"> {
  const data = input as Partial<Education>;
  return {
    institution: required(asString(data.institution), "Institution name"),
    degree: required(asString(data.degree), "Degree or course"),
    startYear: asString(data.startYear),
    endYear: asString(data.endYear),
    description: required(asString(data.description), "Education description")
  };
}
