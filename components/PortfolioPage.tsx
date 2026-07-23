import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Download,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShoppingBag
} from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { PublicNavbar } from "@/components/PublicNavbar";
import { Section } from "@/components/Section";
import type { PortfolioData, Project } from "@/lib/types";

const projectTags = [
  ["Shopify", "Subscriptions", "Payments"],
  ["Symfony", "Payment APIs", "Webhooks"],
  ["Booking", "Operations", "Fintech"],
  ["Identity", "Platform", "Customer UX"],
  ["Shopify", "Reviews", "SaaS"],
  ["AMP", "Performance", "SEO"]
];

const stackLayers = [
  { icon: ShoppingBag, label: "Commerce", value: "Shopify apps & themes" },
  { icon: Code2, label: "Backend", value: "PHP, Symfony & Node.js" },
  { icon: Layers3, label: "Integrations", value: "GraphQL, REST & payments" }
];

function ProjectImage({ project }: { project: Project }) {
  if (project.image) {
    return (
      // Admin-managed images can be either local uploads or external URLs.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt=""
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-5xl font-black text-white">
      {project.name.slice(0, 1)}
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
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 hover:shadow-md"
    >
      {children}
    </a>
  );
}

export function PortfolioPage({ data }: { data: PortfolioData }) {
  const { profile, projects, skills, experience, education } = data;
  const whatsappNumber = profile.mobile.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Vikas, I would like to discuss a project with you."
  )}`;

  return (
    <main className="overflow-x-clip bg-white text-slate-950">
      <PublicNavbar profile={profile} />

      <section id="top" className="relative border-b border-slate-200 bg-gradient-to-b from-blue-50/80 via-white to-white">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -right-32 top-12 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1240px] gap-10 px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3.5 py-2 text-xs font-bold text-blue-700 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for select projects
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Sr. Shopify Developer</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[1.03] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-[4.65rem]">
              Engineering commerce that{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">scales.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-slate-600">
              I&apos;m {profile.name}, a Shopify specialist and full-stack developer building reliable SaaS products,
              payment systems, and high-performing eCommerce experiences.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                View selected work <ArrowRight size={17} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700"
              >
                Let&apos;s work together <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <SocialLink href={profile.linkedin} label="LinkedIn">
                <Linkedin size={18} />
              </SocialLink>
              <SocialLink href={profile.github} label="GitHub">
                <Github size={18} />
              </SocialLink>
              <SocialLink href={profile.email ? `mailto:${profile.email}` : ""} label="Email">
                <Mail size={18} />
              </SocialLink>
              <p className="ml-2 hidden text-xs font-semibold text-slate-500 sm:block">
                Based in {profile.location || "India"}
                <br />
                Working remotely worldwide
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-200/60 to-indigo-200/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(30,64,175,0.14)] sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">Commerce stack</p>
                  <h2 className="mt-1 text-lg font-extrabold text-slate-900">Production-ready systems</h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <Code2 size={21} />
                </div>
              </div>

              <div className="mt-3 space-y-2">
                {stackLayers.map(({ icon: Icon, label, value }, index) => (
                  <div
                    key={label}
                    className="group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition hover:border-blue-100 hover:bg-blue-50/70"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700">
                      <Icon size={19} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{label}</p>
                      <p className="mt-0.5 truncate text-sm font-bold text-slate-800">{value}</p>
                    </div>
                    <span className="text-xs font-bold text-slate-300">0{index + 1}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-slate-950 p-4 text-white">
                {[
                  ["4+", "Years"],
                  ["12+", "Apps"],
                  [`${projects.length}`, "Projects"]
                ].map(([value, label]) => (
                  <div key={label} className="text-center">
                    <p className="text-2xl font-black">{value}</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check size={17} strokeWidth={3} />
              </span>
              <div>
                <p className="text-xs font-extrabold text-slate-900">Built for production</p>
                <p className="text-[10px] font-semibold text-slate-500">Secure · Scalable · Maintainable</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-slate-200 bg-white/80">
          <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-9 gap-y-3 px-5 py-4 text-xs font-bold text-slate-400 sm:px-8 lg:px-10">
            {["Shopify Apps", "PHP & Symfony", "GraphQL", "Stripe", "Liquid", "React"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Section
        id="projects"
        eyebrow="Selected work"
        title="Products designed around real business outcomes."
        description="A selection of commerce, payment, subscription, and platform products engineered for reliability, usability, and growth."
      >
        {projects.length ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_50px_rgba(30,64,175,0.12)]"
              >
                <a
                  href={project.link || "#projects"}
                  target={project.link ? "_blank" : undefined}
                  rel={project.link ? "noreferrer" : undefined}
                  aria-label={project.link ? `Open ${project.name}` : undefined}
                  className="relative block aspect-[16/9] overflow-hidden border-b border-slate-100 bg-slate-50"
                >
                  <ProjectImage project={project} />
                  <span className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-700 shadow-sm backdrop-blur">
                    Project {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="text-2xl font-extrabold tracking-[-0.025em] text-slate-950">{project.name}</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(projectTags[index] || ["Product", "Engineering"]).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.name}`}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                      >
                        <ArrowUpRight size={19} />
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-5 text-sm font-medium leading-6 text-slate-600">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState label="Selected projects are being prepared." />
        )}
      </Section>

      <Section
        id="skills"
        eyebrow="Core capabilities"
        title="Specialized where it matters. Versatile everywhere else."
        description="A practical toolkit for building end-to-end commerce products—from storefront experience to backend architecture and secure integrations."
        tone="soft"
      >
        {skills.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <article
                key={skill.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_36px_rgba(30,64,175,0.09)]"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  {skill.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={skill.image} alt="" className="h-10 w-10 object-contain" />
                  ) : (
                    <Code2 className="text-blue-600" size={34} />
                  )}
                </div>
                <h3 className="mt-4 text-lg font-extrabold tracking-[-0.015em] text-slate-900">{skill.name}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{skill.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState label="Capabilities are being updated." />
        )}
      </Section>

      <section id="experience" className="bg-slate-950 text-white">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-400">Experience</p>
              <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                From hands-on delivery to technical leadership.
              </h2>
              <p className="mt-4 max-w-lg text-base font-medium leading-7 text-slate-400">
                Four-plus years shipping commerce products, reviewing architecture, mentoring developers, and keeping
                delivery aligned with business goals.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <BriefcaseBusiness className="text-blue-400" size={20} />
                <div>
                  <p className="text-sm font-extrabold">Currently at Stellen Infotech</p>
                  <p className="mt-0.5 text-xs font-medium text-slate-400">Senior PHP Developer</p>
                </div>
              </div>
            </div>

            {experience.length ? (
              <div className="relative space-y-5 before:absolute before:bottom-8 before:left-[23px] before:top-8 before:w-px before:bg-white/10">
                {experience.map((item, index) => (
                  <article
                    key={item.id}
                    className="relative rounded-2xl border border-white/10 bg-white/[0.045] p-5 pl-16 transition hover:border-blue-500/40 hover:bg-white/[0.065]"
                  >
                    <span className="absolute left-4 top-6 z-10 flex h-4 w-4 items-center justify-center rounded-full border-4 border-slate-950 bg-blue-500 ring-4 ring-blue-500/15" />
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-400">{item.company}</p>
                        <h3 className="mt-2 text-xl font-extrabold">{item.role}</h3>
                      </div>
                      <span className="rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-300">
                        {item.startDate} — {item.endDate}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-medium leading-6 text-slate-400">{item.description}</p>
                    <p className="mt-3 text-[10px] font-bold text-white/20">0{index + 1}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState label="Experience is being updated." />
            )}
          </div>
        </div>
      </section>

      <Section
        id="education"
        eyebrow="Education"
        title="A strong foundation for continuous learning."
        description="Formal computer application and commerce education, strengthened by years of production experience."
      >
        {education.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {education.map((item) => (
              <article
                key={item.id}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(15,23,42,0.05)]"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-50" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <GraduationCap size={22} />
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.13em] text-blue-600">{item.institution}</p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-slate-950">{item.degree}</h3>
                  <p className="mt-2 text-xs font-bold text-slate-400">
                    {item.startYear} — {item.endYear}
                  </p>
                  <p className="mt-4 text-sm font-medium leading-6 text-slate-600">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState label="Education is being updated." />
        )}
      </Section>

      <section id="contact" className="bg-white px-5 pb-8 sm:px-8 lg:px-10 lg:pb-10">
        <div className="relative mx-auto max-w-[1160px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-10 text-white shadow-[0_30px_70px_rgba(30,64,175,0.24)] sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border-[70px] border-white/[0.06]" />
          <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-blue-400/20 blur-2xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-blue-200">Have a project in mind?</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                Let&apos;s build a commerce product that performs.
              </h2>
              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-blue-100">
                Tell me about your Shopify app, payment integration, or eCommerce platform. I&apos;ll help turn the
                requirements into a dependable product.
              </p>
            </div>
            <a
              href={profile.email ? `mailto:${profile.email}` : "#top"}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-extrabold text-blue-700 shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Start a conversation <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="relative mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5 text-sm font-semibold text-blue-100">
            {profile.email ? (
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-white">
                <Mail size={16} /> {profile.email}
              </a>
            ) : null}
            {profile.mobile ? (
              <a href={`tel:${profile.mobile}`} className="inline-flex items-center gap-2 hover:text-white">
                <Phone size={16} /> {profile.mobile}
              </a>
            ) : null}
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} /> {profile.location || "India"} · Remote
            </span>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="font-extrabold text-slate-900">{profile.name}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">Sr. Shopify Developer · © {new Date().getFullYear()}</p>
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
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
              >
                <Download size={16} /> Download resume
              </a>
            ) : null}
          </div>
        </div>
      </footer>

      {whatsappNumber ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Contact ${profile.name} on WhatsApp`}
          title="Chat on WhatsApp"
          className="fixed bottom-5 right-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.38)] ring-4 ring-white transition hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_16px_36px_rgba(37,211,102,0.48)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
        >
          <MessageCircle size={30} strokeWidth={2.4} aria-hidden="true" />
        </a>
      ) : null}
    </main>
  );
}
