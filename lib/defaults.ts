import type { Education, Experience, Profile, Project, Skill } from "@/lib/types";

export const defaultProfile: Profile = {
  name: "Vikas Soni",
  email: "vikassoni2018@gmail.com",
  mobile: "",
  bio: "",
  profileImage: "",
  resume: "",
  github: "",
  linkedin: "",
  location: "",
  title: "Full Stack Developer",
  offerLabel: "Launch offer: Your first 15 development hours are free. Standard charges apply after that."
};

export const defaultCollections = {
  projects: [] as Project[],
  skills: [] as Skill[],
  experience: [] as Experience[],
  education: [] as Education[]
};
