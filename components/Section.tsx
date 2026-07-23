export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  tone = "paper",
  children
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro: string;
  tone?: "paper" | "blue";
  children: React.ReactNode;
}) {
  const isBlue = tone === "blue";

  return (
    <section
      id={id}
      className={`border-b ${isBlue ? "border-white/30 bg-[#1638ff] text-white" : "border-black bg-[#f2f0e8] text-black"}`}
    >
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div
          className={`mb-12 grid gap-8 border-b pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 ${
            isBlue ? "border-white/30" : "border-black"
          }`}
        >
          <div>
            <p
              className={`font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${
                isBlue ? "text-[#ffb39a]" : "text-[#1638ff]"
              }`}
            >
              {index} / {eyebrow}
            </p>
            <h2 className="display-face mt-6 max-w-2xl text-5xl uppercase leading-[0.88] tracking-[-0.04em] sm:text-7xl">
              {title}
            </h2>
          </div>
          <p className={`max-w-xl self-end text-lg font-semibold leading-7 ${isBlue ? "text-white/70" : "text-black/65"}`}>
            {intro}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}
