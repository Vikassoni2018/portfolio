export function Section({
  id,
  eyebrow,
  title,
  description,
  tone = "white",
  children
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tone?: "white" | "soft";
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={tone === "soft" ? "bg-slate-50" : "bg-white"}>
      <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">{eyebrow}</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-5xl">
              {title}
            </h2>
          </div>
          <p className="max-w-xl text-base font-medium leading-7 text-slate-600 lg:justify-self-end">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
