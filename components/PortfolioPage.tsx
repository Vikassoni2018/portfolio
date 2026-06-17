import { ArrowUpRight, Briefcase, Download, Github, GraduationCap, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { PublicNavbar } from "@/components/PublicNavbar";
import { Section } from "@/components/Section";
import type { PortfolioData } from "@/lib/types";

function imageOrFallback(src: string, label: string) {
  if (src) {
    // Admin image URLs can be local uploads or external links without Next image-domain config.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={label} className="h-full w-full object-cover" />;
  }
  return <div className="flex h-full w-full items-center justify-center bg-[#17141f] text-2xl font-bold text-[#9b7cff]">{label.slice(0, 1) || "P"}</div>;
}

function SocialButton({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) return null;
  return (
    <a
      className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#77737f] transition hover:border-[#9b7cff]/70 hover:text-[#c8b8ff]"
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
    >
      {children}
    </a>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <article className={`rounded-2xl border border-white/10 bg-white/[0.025] shadow-[0_18px_90px_rgba(0,0,0,0.24)] ${className}`}>{children}</article>;
}

const heroChips = ["Shopify Apps", "PHP & Symfony", "GraphQL", "Stripe", "Node.js", "React"];

export function PortfolioPage({ data }: { data: PortfolioData }) {
  const { profile, projects, skills, experience, education } = data;

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(0,128,118,0.16),transparent_34%),radial-gradient(circle_at_45%_100%,rgba(155,124,255,0.16),transparent_30%)]" />
      <div className="relative">
        <PublicNavbar profile={profile} />

        <section className="mx-auto max-w-[1052px] px-6 pb-16 pt-20 md:pt-28">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Available for remote work
          </div>

          <p className="mt-9 max-w-full text-sm lowercase tracking-[0.32em] text-[#5e5967]">
            vikas <span className="mx-2">›</span> developer <span className="mx-2">›</span> shopify <span className="mx-2">›</span> php <span className="mx-2">›</span> home
          </p>

          <h1 className="mt-7 max-w-3xl text-6xl font-black leading-none tracking-[-0.02em] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d8cbff] to-[#9b7cff] sm:text-7xl lg:text-8xl">
            {profile.name}
          </h1>

          <p className="mt-8 text-2xl leading-tight text-[#a6a1ad] sm:text-3xl">
            Full Stack Developer & <span className="font-semibold text-[#a98dff]">Shopify Specialist</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {heroChips.map((chip) => (
              <span key={chip} className="rounded-full border border-[#9b7cff]/40 bg-[#9b7cff]/10 px-4 py-2 text-sm font-semibold text-[#bfaeff]">
                {chip}
              </span>
            ))}
          </div>

          <p className="mt-9 max-w-3xl text-lg leading-8 text-[#77737f]">
            {profile.bio || "Full Stack Developer building Shopify apps and eCommerce solutions."}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a className="inline-flex items-center gap-3 rounded-xl bg-[#9b7cff] px-7 py-4 text-base font-bold text-[#090711] shadow-[0_0_44px_rgba(155,124,255,0.34)] transition hover:bg-[#b9a5ff]" href="#contact">
              Get in Touch <ArrowUpRight size={18} />
            </a>
            <a className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-4 text-base font-bold text-[#a6a1ad] transition hover:border-[#9b7cff]/50 hover:text-white" href="#projects">
              View Projects <ArrowUpRight size={18} />
            </a>
            <SocialButton href={profile.linkedin} label="LinkedIn">
              <Linkedin size={18} />
            </SocialButton>
            <SocialButton href={profile.github} label="GitHub">
              <Github size={18} />
            </SocialButton>
            <SocialButton href={profile.email ? `mailto:${profile.email}` : ""} label="Email">
              <Mail size={18} />
            </SocialButton>
          </div>

          <div className="mt-16 grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] md:grid-cols-4">
            {[
              ["4+", "Years Experience"],
              [`${Math.max(projects.length, 5)}+`, "Projects Delivered"],
              ["12+", "Shopify Apps Built"],
              ["30+", "Happy Clients"]
            ].map(([value, label]) => (
              <div key={label} className="border-white/10 px-8 py-8 text-center md:border-l md:first:border-l-0">
                <p className="text-4xl font-black text-[#d6c8ff]">{value}</p>
                <p className="mt-2 text-sm text-[#5e5967]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <Section id="skills" eyebrow="Technical Skills" title="Tools I Use To Build">
          {skills.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill, index) => (
                <Card key={skill.id} className="p-6">
                  <div className={`mb-6 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border ${index % 3 === 0 ? "border-emerald-400/25 bg-emerald-400/10" : index % 3 === 1 ? "border-[#9b7cff]/25 bg-[#9b7cff]/10" : "border-amber-400/25 bg-amber-400/10"}`}>
                    {imageOrFallback(skill.image, skill.name)}
                  </div>
                  <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#77737f]">{skill.description}</p>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState label="No skills added yet." />
          )}
        </Section>

        <Section id="projects" eyebrow="Selected Work" title="Featured Projects">
          {projects.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="aspect-video border-b border-white/10 bg-[#111018]">{imageOrFallback(project.image, project.name)}</div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-bold text-white">{project.name}</h3>
                      {project.link ? (
                        <a className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#a98dff] hover:border-[#9b7cff]" href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}>
                          <ArrowUpRight size={18} />
                        </a>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#77737f]">{project.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState label="No projects added yet." />
          )}
        </Section>

        <Section id="experience" eyebrow="Experience" title="Professional Timeline">
          {experience.length ? (
            <div className="relative grid gap-4 before:absolute before:left-5 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-[#9b7cff]/55">
              {experience.map((item) => (
                <Card key={item.id} className="relative ml-10 p-6">
                  <span className="absolute -left-[2.95rem] top-7 h-3 w-3 rounded-full bg-[#9b7cff] shadow-[0_0_18px_rgba(155,124,255,0.9)]" />
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{item.role}</h3>
                      <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#a98dff]">
                        <Briefcase size={16} /> {item.company}
                      </p>
                    </div>
                    <p className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-[#a6a1ad]">
                      {item.startDate} - {item.endDate}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#77737f]">{item.description}</p>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState label="No experience added yet." />
          )}
        </Section>

        <Section id="education" eyebrow="Education" title="Learning Background">
          {education.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {education.map((item) => (
                <Card key={item.id} className="p-6">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#a98dff]">
                    <GraduationCap size={16} /> {item.institution}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-white">{item.degree}</h3>
                  <p className="mt-3 text-sm text-[#5e5967]">
                    {item.startYear} - {item.endYear}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[#77737f]">{item.description}</p>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState label="No education added yet." />
          )}
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let us build something useful">
          <Card className="p-6 sm:p-8">
            <div className="grid gap-4 md:grid-cols-3">
              {profile.email ? (
                <a className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-[#a6a1ad] hover:text-white" href={`mailto:${profile.email}`}>
                  <Mail size={18} /> {profile.email}
                </a>
              ) : null}
              {profile.mobile ? (
                <a className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-[#a6a1ad] hover:text-white" href={`tel:${profile.mobile}`}>
                  <Phone size={18} /> {profile.mobile}
                </a>
              ) : null}
              {profile.location ? (
                <span className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-[#a6a1ad]">
                  <MapPin size={18} /> {profile.location}
                </span>
              ) : null}
            </div>
            {profile.resume ? (
              <a className="mt-6 inline-flex items-center gap-3 rounded-xl bg-[#9b7cff] px-6 py-3 font-bold text-[#090711] hover:bg-[#b9a5ff]" href={profile.resume}>
                <Download size={18} /> Download Resume
              </a>
            ) : null}
          </Card>
        </Section>

        <footer className="border-t border-white/[0.06] bg-[#0b0912]/70">
          <div className="mx-auto flex max-w-[1052px] flex-col gap-4 px-6 py-8 text-sm text-[#5e5967] sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-center gap-2 font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#9b7cff] shadow-[0_0_18px_rgba(155,124,255,0.95)]" />
              {profile.name} <span className="font-normal">- {profile.title}</span>
            </p>
            <p>{profile.location || "India"}</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
