"use client";

import { useMemo, useState } from "react";
import { Briefcase, GraduationCap, ImageUp, LogOut, Save, UserRound, Wrench } from "lucide-react";
import clsx from "clsx";
import type { Education, Experience, PortfolioData, Profile, Project, Skill } from "@/lib/types";

type Tab = "profile" | "projects" | "skills" | "experience" | "education";
type Status = { type: "success" | "error"; text: string } | null;

const tabs: Array<{ key: Tab; label: string; icon: React.ElementType }> = [
  { key: "profile", label: "Profile", icon: UserRound },
  { key: "projects", label: "Projects", icon: Briefcase },
  { key: "skills", label: "Skills", icon: Wrench },
  { key: "experience", label: "Experience", icon: Briefcase },
  { key: "education", label: "Education", icon: GraduationCap }
];

async function requestJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    }
  });
  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}

const emptyProject: Omit<Project, "id"> = { name: "", link: "", image: "", description: "" };
const emptySkill: Omit<Skill, "id"> = { name: "", image: "", description: "" };
const emptyExperience: Omit<Experience, "id"> = { company: "", role: "", startDate: "", endDate: "", description: "" };
const emptyEducation: Omit<Education, "id"> = { institution: "", degree: "", startYear: "", endYear: "", description: "" };

export function AdminDashboard({ initialData }: { initialData: PortfolioData }) {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [profile, setProfile] = useState(initialData.profile);
  const [projects, setProjects] = useState(initialData.projects);
  const [skills, setSkills] = useState(initialData.skills);
  const [experience, setExperience] = useState(initialData.experience);
  const [education, setEducation] = useState(initialData.education);
  const [status, setStatus] = useState<Status>(null);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const content = useMemo(() => {
    if (activeTab === "profile") {
      return <ProfileEditor profile={profile} setProfile={setProfile} setStatus={setStatus} />;
    }
    if (activeTab === "projects") {
      return <ProjectManager items={projects} setItems={setProjects} setStatus={setStatus} />;
    }
    if (activeTab === "skills") {
      return <SkillManager items={skills} setItems={setSkills} setStatus={setStatus} />;
    }
    if (activeTab === "experience") {
      return <ExperienceManager items={experience} setItems={setExperience} setStatus={setStatus} />;
    }
    return <EducationManager items={education} setItems={setEducation} setStatus={setStatus} />;
  }, [activeTab, education, experience, profile, projects, skills]);

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-72">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Portfolio Admin</p>
              <h1 className="mt-2 text-xl font-bold text-ink">{profile.name}</h1>
            </div>
            <nav className="grid gap-2">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold transition",
                    activeTab === key ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                  )}
                >
                  <Icon size={18} /> {label}
                </button>
              ))}
            </nav>
            <button onClick={logout} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-700 hover:border-coral hover:text-coral">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          {status ? (
            <div className={clsx("mb-4 rounded-lg px-4 py-3 text-sm font-semibold", status.type === "success" ? "bg-teal-50 text-teal-800" : "bg-red-50 text-red-700")}>
              {status.text}
            </div>
          ) : null}
          {content}
        </section>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}

function textInput(value: string, onChange: (value: string) => void, placeholder = "") {
  return <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-accent" />;
}

function textArea(value: string, onChange: (value: string) => void, placeholder = "") {
  return <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={4} className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-accent" />;
}

async function uploadFile(file: File, kind: "image" | "resume") {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`/api/upload/${kind}`, { method: "POST", body: formData });
  const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!response.ok || !data.url) throw new Error(data.error || "Upload failed.");
  return data.url;
}

function UploadButton({ kind, onUploaded }: { kind: "image" | "resume"; onUploaded: (url: string) => void }) {
  const [loading, setLoading] = useState(false);

  async function changed(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      onUploaded(await uploadFile(file, kind));
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  }

  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-accent hover:text-accent">
      <ImageUp size={16} /> {loading ? "Uploading..." : kind === "image" ? "Upload image" : "Upload resume"}
      <input className="hidden" type="file" accept={kind === "image" ? "image/*" : "application/pdf"} onChange={changed} />
    </label>
  );
}

function ProfileEditor({ profile, setProfile, setStatus }: { profile: Profile; setProfile: (profile: Profile) => void; setStatus: (status: Status) => void }) {
  const [draft, setDraft] = useState(profile);
  const [saving, setSaving] = useState(false);

  function patch(key: keyof Profile, value: string) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const saved = await requestJson<Profile>("/api/profile", { method: "PUT", body: JSON.stringify(draft) });
      setProfile(saved);
      setStatus({ type: "success", text: "Profile saved." });
    } catch (error) {
      setStatus({ type: "error", text: (error as Error).message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <Header title="Profile management" />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name">{textInput(draft.name, (value) => patch("name", value))}</Field>
        <Field label="Portfolio title">{textInput(draft.title, (value) => patch("title", value))}</Field>
        <Field label="Email">{textInput(draft.email, (value) => patch("email", value))}</Field>
        <Field label="Mobile">{textInput(draft.mobile, (value) => patch("mobile", value))}</Field>
        <Field label="Location">{textInput(draft.location, (value) => patch("location", value))}</Field>
        <Field label="GitHub link">{textInput(draft.github, (value) => patch("github", value))}</Field>
        <Field label="LinkedIn link">{textInput(draft.linkedin, (value) => patch("linkedin", value))}</Field>
        <Field label="Profile image URL">
          <div className="flex flex-col gap-2 sm:flex-row">
            {textInput(draft.profileImage, (value) => patch("profileImage", value))}
            <UploadButton kind="image" onUploaded={(url) => patch("profileImage", url)} />
          </div>
        </Field>
        <Field label="Resume URL">
          <div className="flex flex-col gap-2 sm:flex-row">
            {textInput(draft.resume, (value) => patch("resume", value))}
            <UploadButton kind="resume" onUploaded={(url) => patch("resume", url)} />
          </div>
        </Field>
        <div className="md:col-span-2">
          <Field label="Bio">{textArea(draft.bio, (value) => patch("bio", value))}</Field>
        </div>
      </div>
      <SaveButton saving={saving} label="Save profile" />
    </form>
  );
}

function Header({ title }: { title: string }) {
  return <h2 className="mb-5 text-2xl font-bold text-ink">{title}</h2>;
}

function SaveButton({ saving, label }: { saving: boolean; label: string }) {
  return (
    <button disabled={saving} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60">
      <Save size={16} /> {saving ? "Saving..." : label}
    </button>
  );
}

function ProjectManager({ items, setItems, setStatus }: { items: Project[]; setItems: (items: Project[]) => void; setStatus: (status: Status) => void }) {
  return <CrudPanel title="Project management" endpoint="/api/projects" items={items} setItems={setItems} empty={emptyProject} setStatus={setStatus} render={(draft, patch) => (
    <>
      <Field label="Project name">{textInput(draft.name, (value) => patch("name", value))}</Field>
      <Field label="Project link">{textInput(draft.link, (value) => patch("link", value))}</Field>
      <Field label="Project image">
        <div className="flex flex-col gap-2 sm:flex-row">{textInput(draft.image, (value) => patch("image", value))}<UploadButton kind="image" onUploaded={(url) => patch("image", url)} /></div>
      </Field>
      <Field label="Description">{textArea(draft.description, (value) => patch("description", value))}</Field>
    </>
  )} summary={(item) => item.name} />;
}

function SkillManager({ items, setItems, setStatus }: { items: Skill[]; setItems: (items: Skill[]) => void; setStatus: (status: Status) => void }) {
  return <CrudPanel title="Skill management" endpoint="/api/skills" items={items} setItems={setItems} empty={emptySkill} setStatus={setStatus} render={(draft, patch) => (
    <>
      <Field label="Skill name">{textInput(draft.name, (value) => patch("name", value))}</Field>
      <Field label="Skill image/icon">
        <div className="flex flex-col gap-2 sm:flex-row">{textInput(draft.image, (value) => patch("image", value))}<UploadButton kind="image" onUploaded={(url) => patch("image", url)} /></div>
      </Field>
      <Field label="Description">{textArea(draft.description, (value) => patch("description", value))}</Field>
    </>
  )} summary={(item) => item.name} />;
}

function ExperienceManager({ items, setItems, setStatus }: { items: Experience[]; setItems: (items: Experience[]) => void; setStatus: (status: Status) => void }) {
  return <CrudPanel title="Experience management" endpoint="/api/experience" items={items} setItems={setItems} empty={emptyExperience} setStatus={setStatus} render={(draft, patch) => (
    <>
      <Field label="Company name">{textInput(draft.company, (value) => patch("company", value))}</Field>
      <Field label="Role">{textInput(draft.role, (value) => patch("role", value))}</Field>
      <Field label="Start date">{textInput(draft.startDate, (value) => patch("startDate", value))}</Field>
      <Field label="End date">{textInput(draft.endDate, (value) => patch("endDate", value))}</Field>
      <Field label="Description">{textArea(draft.description, (value) => patch("description", value))}</Field>
    </>
  )} summary={(item) => `${item.role} at ${item.company}`} />;
}

function EducationManager({ items, setItems, setStatus }: { items: Education[]; setItems: (items: Education[]) => void; setStatus: (status: Status) => void }) {
  return <CrudPanel title="Education management" endpoint="/api/education" items={items} setItems={setItems} empty={emptyEducation} setStatus={setStatus} render={(draft, patch) => (
    <>
      <Field label="Institution name">{textInput(draft.institution, (value) => patch("institution", value))}</Field>
      <Field label="Degree/course">{textInput(draft.degree, (value) => patch("degree", value))}</Field>
      <Field label="Start year">{textInput(draft.startYear, (value) => patch("startYear", value))}</Field>
      <Field label="End year">{textInput(draft.endYear, (value) => patch("endYear", value))}</Field>
      <Field label="Description">{textArea(draft.description, (value) => patch("description", value))}</Field>
    </>
  )} summary={(item) => `${item.degree} - ${item.institution}`} />;
}

function CrudPanel<T extends { id: string }>({
  title,
  endpoint,
  items,
  setItems,
  empty,
  render,
  summary,
  setStatus
}: {
  title: string;
  endpoint: string;
  items: T[];
  setItems: (items: T[]) => void;
  empty: Omit<T, "id">;
  render: (draft: Omit<T, "id">, patch: (key: keyof Omit<T, "id">, value: string) => void) => React.ReactNode;
  summary: (item: T) => string;
  setStatus: (status: Status) => void;
}) {
  const [draft, setDraft] = useState<Omit<T, "id">>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function patch(key: keyof Omit<T, "id">, value: string) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function edit(item: T) {
    const { id: _id, ...rest } = item;
    setDraft(rest as Omit<T, "id">);
    setEditingId(item.id);
  }

  function reset() {
    setDraft(empty);
    setEditingId(null);
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      if (editingId) {
        const saved = await requestJson<T>(`${endpoint}/${editingId}`, { method: "PUT", body: JSON.stringify(draft) });
        setItems(items.map((item) => (item.id === editingId ? saved : item)));
        setStatus({ type: "success", text: "Item updated." });
      } else {
        const saved = await requestJson<T>(endpoint, { method: "POST", body: JSON.stringify(draft) });
        setItems([saved, ...items]);
        setStatus({ type: "success", text: "Item added." });
      }
      reset();
    } catch (error) {
      setStatus({ type: "error", text: (error as Error).message });
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    setStatus(null);
    try {
      await requestJson<{ ok: boolean }>(`${endpoint}/${id}`, { method: "DELETE" });
      setItems(items.filter((item) => item.id !== id));
      setStatus({ type: "success", text: "Item deleted." });
      if (editingId === id) reset();
    } catch (error) {
      setStatus({ type: "error", text: (error as Error).message });
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={save} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <Header title={title} />
        <div className="grid gap-4">{render(draft, patch)}</div>
        <div className="flex flex-wrap gap-3">
          <SaveButton saving={saving} label={editingId ? "Update item" : "Add item"} />
          {editingId ? (
            <button type="button" onClick={reset} className="mt-5 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-accent hover:text-accent">
              Cancel edit
            </button>
          ) : null}
        </div>
      </form>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <Header title="Current items" />
        {items.length ? (
          <div className="grid gap-3">
            {items.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-200 p-4">
                <p className="font-semibold text-ink">{summary(item)}</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => edit(item)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-accent hover:text-accent">
                    Edit
                  </button>
                  <button onClick={() => remove(item.id)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">No items yet.</p>
        )}
      </div>
    </div>
  );
}
