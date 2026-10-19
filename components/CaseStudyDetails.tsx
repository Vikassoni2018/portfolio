import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyDetails({ study }: { study: CaseStudy }) {
  const sections = [
    ["Business Problem", study.problem],
    ["My Role and Responsibilities", study.role],
    ["Technical Challenges", study.challenges],
    ["Architecture / Technical Solution", study.solution],
  ];
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:px-10">
        <p className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-900">
          {study.attribution}
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {sections.map(([title, text]) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
            >
              <h2 className="text-xl font-extrabold text-slate-950">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-extrabold">Technologies Used</h2>
            {study.technologies.length ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {study.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate-600">
                Editorial TODO: confirm the project-specific technology stack.
              </p>
            )}
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-extrabold">Features Implemented</h2>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Documented product scope; individual feature ownership is subject
              to the role notes above.
            </p>
            {study.features.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {study.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate-600">
                Editorial TODO: document delivered features and individual
                contributions.
              </p>
            )}
          </article>
        </div>
        <article className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-extrabold">Results / Outcomes</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            {study.outcome}
          </p>
          <details className="mt-5 border-t border-slate-200 pt-4">
            <summary className="cursor-pointer py-2 text-sm font-bold text-slate-700">
              Editorial TODOs: evidence to add
            </summary>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
              {study.todos.map((todo) => (
                <li key={todo}>{todo}</li>
              ))}
            </ul>
          </details>
        </article>
      </div>
    </section>
  );
}
