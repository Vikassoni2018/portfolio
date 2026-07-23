import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone
} from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { PublicNavbar } from "@/components/PublicNavbar";
import { Section } from "@/components/Section";
import type { PortfolioData, Project } from "@/lib/types";

const projectLabels = [
  ["Subscriptions", "Shopify", "Payments"],
  ["API platform", "Fintech", "Symfony"],
  ["Booking", "Operations", "Payments"],
  ["Identity", "Platform", "Webkul"],
  ["Reviews", "Shopify", "SaaS"],
  ["Performance", "Mobile", "Shopify"]
];

const capabilityStrip = [
  "Shopify apps",
  "Subscription systems",
  "Payment infrastructure",
  "GraphQL APIs",
  "Symfony backends"
];

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  if (project.image) {
    return (
      // Admin-managed images can be local uploads or external URLs.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt=""
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-end justify-between bg-[#1638ff] p-6 text-[#f2f0e8]">
      <span className="display-face text-7xl leading-none">{String(index + 1).padStart(2, "0")}</span>
      <ArrowDownRight size={36} strokeWidth={1.5} />
    </div>
  );
}

function SocialLink({
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
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      className="inline-flex h-12 w-12 items-center justify-center border border-black/20 transition hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white"
    >
      {children}
    </a>
  );
}

export function PortfolioPage({ data }: { data: PortfolioData }) {
  const { profile, projects, skills, experience, education } = data;

  return (
    <main className="overflow-hidden bg-[#f2f0e8] text-[#111111]">
      <PublicNavbar profile={profile} />

      <section id="top" className="border-b border-black">
        <div className="site-grid mx-auto max-w-[1440px]">
          <div className="border-b border-black px-5 py-4 sm:px-8 lg:col-span-12 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] sm:text-xs">
              <p>Independent commerce engineer / India</p>
              <p className="inline-flex items-center gap-2">
                <span className="status-dot" />
                Available for select projects
              </p>
            </div>
          </div>

          <div className="relative px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-16 lg:col-span-8 lg:border-r lg:border-black lg:px-10 lg:pb-20 lg:pt-24">
            <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#1638ff]">
              Full-stack / Shopify / SaaS
            </p>
            <h1 className="display-face max-w-[960px] text-[clamp(4.5rem,11vw,10.5rem)] uppercase leading-[0.78] tracking-[-0.055em]">
              I build
              <br />
              commerce
              <br />
              <span className="text-[#1638ff]">systems.</span>
            </h1>
            <div className="absolute right-8 top-16 hidden h-20 w-20 rounded-full bg-[#ff4d00] xl:block" />
          </div>

          <div className="flex flex-col justify-between px-5 py-10 sm:px-8 lg:col-span-4 lg:px-10 lg:py-14">
            <div>
              <p className="max-w-lg text-lg font-semibold leading-7 sm:text-xl">
                {profile.bio ||
                  "Full-stack developer building Shopify apps, reliable APIs, and payment-led commerce products."}
              </p>
              <p className="mt-8 font-mono text-[11px] uppercase leading-5 tracking-[0.14em] text-black/60">
                Product-minded engineering for teams that need robust systems, clean execution, and measurable speed.
              </p>
            </div>

            <div className="mt-12 grid gap-3">
              <a
                href="#projects"
                className="group flex items-center justify-between bg-[#1638ff] px-5 py-4 font-bold text-white transition hover:bg-black"
              >
                Explore selected work
                <ArrowDownRight className="transition group-hover:rotate-45" size={20} />
              </a>
              <a
                href="#contact"
                className="group flex items-center justify-between border border-black px-5 py-4 font-bold transition hover:bg-[#ff4d00]"
              >
                Start a conversation
                <ArrowUpRight className="transition group-hover:rotate-45" size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-black bg-[#ff4d00]">
          <div className="marquee-track flex w-max items-center py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
            {[...capabilityStrip, ...capabilityStrip].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center">
                <span className="px-5 sm:px-8">{item}</span>
                <span aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Portfolio statistics" className="border-b border-black">
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["04+", "Years in production"],
            [`0${projects.length}`, "Selected builds"],
            ["12+", "Shopify apps shipped"],
            ["03", "Payment rails integrated"]
          ].map(([value, label], index) => (
            <div
              key={label}
              className={`px-5 py-8 sm:px-8 lg:px-10 lg:py-10 ${index ? "border-t border-black sm:border-l lg:border-t-0" : ""} ${index === 2 ? "sm:border-t" : ""}`}
            >
              <p className="display-face text-6xl tracking-[-0.04em] text-[#1638ff]">{value}</p>
              <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <Section
        id="projects"
        index="01"
        eyebrow="Selected casework"
        title="Products built to perform in the real world."
        intro="A cross-section of subscription, payment, booking, identity, review, and storefront systems—designed around business-critical workflows."
      >
        {projects.length ? (
          <div className="grid border-l border-t border-black lg:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="group grid min-h-[560px] grid-rows-[minmax(250px,1fr)_auto] border-b border-r border-black bg-[#ebe8df]"
              >
                <a
                  href={project.link || "#projects"}
                  target={project.link ? "_blank" : undefined}
                  rel={project.link ? "noreferrer" : undefined}
                  className="relative min-h-[250px] overflow-hidden border-b border-black bg-white"
                  aria-label={project.link ? `Open ${project.name}` : undefined}
                >
                  <ProjectVisual project={project} index={index} />
                  <span className="absolute left-4 top-4 bg-[#f2f0e8] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em]">
                    Case {String(index + 1).padStart(2, "0")}
                  </span>
                </a>

                <div className="p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-5">
                    <h3 className="max-w-md text-2xl font-black tracking-[-0.03em] sm:text-3xl">{project.name}</h3>
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.name}`}
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black transition hover:bg-[#1638ff] hover:text-white"
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-5 max-w-xl text-sm font-medium leading-6 text-black/65">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {(projectLabels[index] || ["Product", "Engineering"]).map((tag) => (
                      <span
                        key={tag}
                        className="border border-black/30 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState label="Selected work is being prepared." />
        )}
      </Section>

      <Section
        id="skills"
        index="02"
        eyebrow="Capabilities"
        title="Deep commerce expertise. Full-stack range."
        intro="Focused on the difficult parts: secure transactions, platform integrations, scalable services, and storefront performance."
        tone="blue"
      >
        {skills.length ? (
          <div className="divide-y divide-white/30 border-y border-white/30">
            {skills.map((skill, index) => (
              <article
                key={skill.id}
                className="group grid gap-4 py-6 sm:grid-cols-[80px_1fr] sm:items-start lg:grid-cols-[110px_0.9fr_1.1fr] lg:gap-8 lg:py-8"
              >
                <p className="font-mono text-xs font-bold tracking-[0.18em] text-[#ffb39a]">
                  /{String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-2xl font-black tracking-[-0.03em] sm:text-3xl">{skill.name}</h3>
                <p className="max-w-2xl text-sm font-medium leading-6 text-white/70">{skill.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState label="Capabilities are being updated." />
        )}
      </Section>

      <section id="experience" className="border-b border-black bg-[#111111] text-[#f2f0e8]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-10 border-b border-white/25 pb-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff4d00]">03 / Experience</p>
              <h2 className="display-face mt-6 max-w-xl text-6xl uppercase leading-[0.88] tracking-[-0.04em] sm:text-7xl">
                Built in
                <br />
                production.
              </h2>
            </div>
            <p className="max-w-xl self-end text-lg font-semibold leading-7 text-white/70">
              Four-plus years moving from quality assurance to technical leadership—shipping systems, mentoring engineers, and owning delivery.
            </p>
          </div>

          {experience.length ? (
            <div className="divide-y divide-white/25">
              {experience.map((item, index) => (
                <article
                  key={item.id}
                  className="grid gap-5 py-8 sm:grid-cols-[80px_1fr] lg:grid-cols-[110px_0.8fr_0.8fr_1.4fr] lg:gap-8 lg:py-10"
                >
                  <p className="font-mono text-xs font-bold text-[#ff4d00]">0{index + 1}</p>
                  <div>
                    <p className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                      <BriefcaseBusiness size={14} /> {item.company}
                    </p>
                    <h3 className="mt-3 text-xl font-black">{item.role}</h3>
                  </div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white/60">
                    {item.startDate} — {item.endDate}
                  </p>
                  <p className="text-sm font-medium leading-6 text-white/60">{item.description}</p>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState label="Experience is being updated." />
          )}
        </div>
      </section>

      <Section
        id="education"
        index="04"
        eyebrow="Foundation"
        title="Formal learning, practical momentum."
        intro="A strong academic base paired with continuous, hands-on learning across modern commerce systems."
      >
        {education.length ? (
          <div className="grid border-l border-t border-black md:grid-cols-2">
            {education.map((item, index) => (
              <article key={item.id} className="min-h-[300px] border-b border-r border-black p-6 sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <GraduationCap size={34} strokeWidth={1.5} className="text-[#1638ff]" />
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                    {item.startYear} — {item.endYear}
                  </p>
                </div>
                <p className="mt-12 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-black/55">
                  {item.institution}
                </p>
                <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">{item.degree}</h3>
                <p className="mt-4 text-sm font-medium leading-6 text-black/60">{item.description}</p>
                <p className="mt-8 display-face text-5xl text-black/10">0{index + 1}</p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState label="Education is being updated." />
        )}
      </Section>

      <section id="contact" className="bg-[#ff4d00]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid border-b border-black lg:grid-cols-[1.4fr_0.6fr]">
            <div className="px-5 py-16 sm:px-8 lg:border-r lg:border-black lg:px-10 lg:py-24">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">05 / Contact</p>
              <h2 className="display-face mt-8 max-w-5xl text-[clamp(4rem,10vw,9rem)] uppercase leading-[0.8] tracking-[-0.05em]">
                Let&apos;s make
                <br />
                it work.
              </h2>
            </div>
            <div className="flex flex-col justify-between px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
              <p className="max-w-md text-xl font-black leading-7">
                Have a Shopify app, payment flow, or commerce platform that needs experienced hands?
              </p>
              <a
                href={profile.email ? `mailto:${profile.email}` : "#top"}
                className="group mt-12 flex items-center justify-between border border-black bg-[#f2f0e8] px-5 py-5 font-bold transition hover:bg-[#1638ff] hover:text-white"
              >
                Tell me about the project
                <ArrowUpRight className="transition group-hover:rotate-45" size={22} />
              </a>
            </div>
          </div>

          <div className="grid border-b border-black md:grid-cols-3">
            {profile.email ? (
              <a
                className="flex items-center gap-3 border-b border-black px-5 py-5 font-mono text-xs font-bold md:border-b-0 md:border-r sm:px-8 lg:px-10"
                href={`mailto:${profile.email}`}
              >
                <Mail size={18} /> {profile.email}
              </a>
            ) : null}
            {profile.mobile ? (
              <a
                className="flex items-center gap-3 border-b border-black px-5 py-5 font-mono text-xs font-bold md:border-b-0 md:border-r sm:px-8 lg:px-10"
                href={`tel:${profile.mobile}`}
              >
                <Phone size={18} /> {profile.mobile}
              </a>
            ) : null}
            <p className="flex items-center gap-3 px-5 py-5 font-mono text-xs font-bold sm:px-8 lg:px-10">
              <MapPin size={18} /> {profile.location || "India"} / Remote
            </p>
          </div>

          <footer className="flex flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div>
              <p className="text-lg font-black">{profile.name}</p>
              <p className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em]">
                Full-stack commerce engineer © {new Date().getFullYear()}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <SocialLink href={profile.linkedin} label="LinkedIn">
                <Linkedin size={18} />
              </SocialLink>
              <SocialLink href={profile.github} label="GitHub">
                <Github size={18} />
              </SocialLink>
              {profile.resume ? (
                <a
                  href={profile.resume}
                  className="inline-flex h-12 items-center gap-2 border border-black px-4 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition hover:bg-black hover:text-white"
                >
                  <Download size={16} /> Resume
                </a>
              ) : null}
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
