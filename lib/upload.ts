import { mkdir, writeFile } from "fs/promises";
import path from "path";

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);
const allowedResumeTypes = new Set(["application/pdf"]);

function safeName(name: string) {
  const parsed = path.parse(name);
  const base = parsed.name.replace(/[^a-z0-9-_]/gi, "-").replace(/-+/g, "-").toLowerCase();
  const ext = parsed.ext.toLowerCase();
  return `${base || "upload"}-${Date.now()}${ext}`;
}

export async function saveUploadedFile(file: File, kind: "image" | "resume") {
  const allowed = kind === "image" ? allowedImageTypes : allowedResumeTypes;
  if (!allowed.has(file.type)) {
    throw new Error(kind === "image" ? "Only image uploads are allowed." : "Only PDF resume uploads are allowed.");
  }

  const maxBytes = kind === "image" ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(kind === "image" ? "Image must be 5MB or smaller." : "Resume must be 10MB or smaller.");
  }

  const folder = kind === "image" ? "images" : "resume";
  const uploadsDir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadsDir, { recursive: true });

  const filename = safeName(file.name);
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, filename), bytes);

  return `/uploads/${folder}/${filename}`;
}
