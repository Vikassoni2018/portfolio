import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyDetails({ study }: { study: CaseStudy }) {
  const sections = [
    ["Business Problem", study.problem],
    ["Role & Engineering Ownership", study.role],
    ["Technical Challenges", study.challenges],
    ["Architecture & Technical Solution", study.solution]
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#EEF2FF]/50 via-[#F8FAFC]/80 to-[#F5F3FF]/50">
      <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:px-10">
        <p className="glass-pill mb-8 rounded-2xl border-indigo-200/80 px-5 py-4 text-sm font-semibold text-indigo-900">
          {study.attribution}
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {sections.map(([title, text]) => (
            <article key={title} className="glass-panel rounded-3xl p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-slate-900">{title}</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{text}</p>
            </article>
          ))}

          <article className="glass-panel rounded-3xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-slate-900">Technologies Used</h2>
            {study.technologies.length ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {study.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-indigo-100 bg-indigo-50/90 px-3.5 py-1.5 font-mono text-xs font-bold text-indigo-800"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>

          <article className="glass-panel rounded-3xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-slate-900">Capabilities &amp; Scope</h2>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Documented engineering scope and implementation layers for Shopify &amp; backend delivery.
            </p>
            {study.features.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm font-medium text-slate-600">
                {study.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            ) : null}
          </article>
        </div>

        {study.codeSnippet ? (
          <article className="glass-panel mt-5 rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold text-slate-900">
                {study.codeTitle ?? "Reference Implementation Pattern"}
              </h2>
              {study.codeLang ? (
                <span className="rounded-full bg-indigo-50 px-3 py-1 font-mono text-[11px] font-bold uppercase text-indigo-700">
                  {study.codeLang}
                </span>
              ) : null}
            </div>
            <pre
              tabIndex={0}
              aria-label="Implementation code snippet"
              className="mt-4 overflow-x-auto rounded-2xl border border-indigo-100 bg-white/95 p-5 font-mono text-[13px] leading-6 text-slate-800"
            >
              <code>{study.codeSnippet}</code>
            </pre>
          </article>
        ) : null}

        <article className="glass-panel mt-5 rounded-3xl p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">Verification &amp; Context</h2>
          <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-600">
            {study.outcome}
          </p>
          {study.todos.length > 0 ? (
            <details className="mt-5 border-t border-indigo-100/80 pt-4">
              <summary className="cursor-pointer py-2 text-sm font-bold text-slate-700 hover:text-indigo-700">
                Additional engineering notes
              </summary>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                {study.todos.map((todo) => (
                  <li key={todo}>{todo}</li>
                ))}
              </ul>
            </details>
          ) : null}
        </article>

        {study.faqs?.length ? (
          <article className="glass-panel mt-5 rounded-3xl p-6 sm:p-8" data-aeo-faq="true">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Frequently Asked Questions (AEO &amp; GEO)
            </h2>
            <div className="mt-5 grid gap-3">
              {study.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-2xl border border-indigo-100/90 bg-white/85 p-4 [&_summary::-webkit-details-marker]:hidden"
                  open
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-bold text-slate-900 sm:text-base">
                    {faq.question}
                  </summary>
                  <p className="mt-2.5 text-sm font-medium leading-6 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
