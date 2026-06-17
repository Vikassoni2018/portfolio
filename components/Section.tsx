export function Section({
  id,
  eyebrow,
  title,
  children
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-[1052px] px-6 py-16 lg:py-20">
      <div className="mb-8 flex items-center gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#9b7cff]">{eyebrow}</p>
        <span className="h-px flex-1 bg-[#9b7cff]/45" />
      </div>
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
