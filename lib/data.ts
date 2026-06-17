import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { defaultCollections, defaultProfile } from "@/lib/defaults";
import type { CollectionMap, CollectionName, PortfolioData, Profile } from "@/lib/types";

const root = process.cwd();
const dataDir = path.join(root, "data");

const dataFiles = {
  profile: path.join(dataDir, "profile.json"),
  projects: path.join(dataDir, "projects.json"),
  skills: path.join(dataDir, "skills.json"),
  experience: path.join(dataDir, "experience.json"),
  education: path.join(dataDir, "education.json")
};

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true });
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  await ensureDataDir();

  try {
    const raw = await readFile(filePath, "utf8");
    if (!raw.trim()) {
      await writeJsonFile(filePath, fallback);
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") {
      await writeJsonFile(filePath, fallback);
      return fallback;
    }
    throw error;
  }
}

async function writeJsonFile<T>(filePath: string, data: T) {
  await ensureDataDir();
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function getProfile() {
  return readJsonFile<Profile>(dataFiles.profile, defaultProfile);
}

export async function saveProfile(profile: Profile) {
  await writeJsonFile(dataFiles.profile, profile);
  return profile;
}

export async function getCollection<TName extends CollectionName>(
  name: TName
): Promise<Array<CollectionMap[TName]>> {
  const fallback = defaultCollections[name] as Array<CollectionMap[TName]>;
  return readJsonFile<Array<CollectionMap[TName]>>(dataFiles[name], fallback);
}

export async function saveCollection<TName extends CollectionName>(
  name: TName,
  items: Array<CollectionMap[TName]>
) {
  await writeJsonFile(dataFiles[name], items);
  return items;
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const [profile, projects, skills, experience, education] = await Promise.all([
    getProfile(),
    getCollection("projects"),
    getCollection("skills"),
    getCollection("experience"),
    getCollection("education")
  ]);

  return { profile, projects, skills, experience, education };
}
