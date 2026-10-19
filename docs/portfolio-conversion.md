# Portfolio conversion implementation

## Scope and evidence

This is an incremental update to the existing Next.js App Router portfolio. The blue/white identity, employer history, admin routes, project URLs, uploaded assets, motion backgrounds and interactive project previews are retained. No dependencies were added to the application.

The top navigation offer remains exactly:

> Launch offer: Your first 15 development hours are free. Standard charges apply after that.

Its banner remains above the navigation, linking to `/#contact`. The profile data and offer conditions were not edited. A regression test checks the literal text, placement and destination.

The homepage now presents the value proposition, six services, four priority projects, expertise, experience/education, the deferred commerce demo, and an enquiry form. Other projects remain accessible at `/projects` and their original detail URLs. The unsupported hardcoded “12+ Apps” statistic was removed. No fabricated testimonials, metrics, certifications, clients or scheduling links were added.

Case-study content is based on existing `data/projects.json`, `data/profile.json`, `data/skills.json` and `data/experience.json`. Product capabilities are separated from individual ownership. Unknown architecture, responsibilities and measurable results are explicitly marked as editorial TODOs. Existing previews may be screenshots or product artwork; captions explain this distinction.

## Email delivery setup

The form posts JSON to `/api/enquiry`. Configure these **server-only** environment variables locally and in the production hosting environment:

```env
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
```

1. Create a Resend account and verify a sending domain you own.
2. Create a scoped sending API key and assign it to `RESEND_API_KEY`.
3. Set `CONTACT_FROM_EMAIL` to an address on that verified sending domain; set `CONTACT_TO_EMAIL` to the inbox that should receive enquiries.
4. Restart the local server or rebuild/redeploy after updating environment configuration.
5. Use your own test address for a deliberate delivery test, check provider logs and the destination inbox. No real email was sent during implementation testing.

The implementation uses Resend's [Send Email API](https://resend.com/docs/api-reference/emails/send-email) directly, with plain text, a visitor reply-to address, a 12-second timeout and an idempotency key bound to the form attempt and payload. Provider acceptance is required for a success response. This means queued/accepted for email delivery, not proof of inbox delivery. Production inbox delivery remains an external configuration/verification task.

Without configuration, the API returns 503, the form retains the entered brief and explains that the message has not been sent. The existing direct email, phone and WhatsApp destinations remain available. JavaScript-disabled visitors get the email fallback.

Validation runs on both client and server. Inline errors use associated labels, `aria-invalid`, error descriptions and focus on the first invalid field. The form has pending, error and acknowledged-success states. Spam controls include a hidden honeypot, minimum completion time, bounded payload size, same-origin checks and a bounded per-instance attempt limiter. The limiter is best effort: for multiple instances or significant spam, configure a shared persistent limiter or hosting WAF before relying on it. Forwarded IP headers are used only when the Vercel environment flag is present; direct local requests share one bucket. Customer data and provider credentials are not logged.

## Analytics and consent

The existing `NEXT_PUBLIC_GA_ID` integration remains optional. A valid configured GA4 ID is required; no measurement ID is hardcoded. No GA scripts load without configuration **and explicit consent**. A persistent preferences control allows changing the choice. Do Not Track and Global Privacy Control signals suppress analytics. Admin pages are excluded. No advertising consent is granted, and no automated page-view event is enabled.

Events:

| Event | Trigger | Properties |
| --- | --- | --- |
| `primary_cta_click` | A project-discussion/contact anchor is clicked | `location`, when defined |
| `portfolio_project_click` | A case-study link or tagged live-project link is clicked | `project_id` |
| `contact_form_submit` | Valid form data starts a request | `service` |
| `enquiry_success` | The server confirms provider acceptance | `service` |
| `contact_link_click` | Email, telephone or WhatsApp link is clicked | `channel` |

Click events use one delegated listener with explicit events taking priority over inferred events. Form submission events and success events are emitted separately once per request. Retrying a failed request is another attempt. No name, email, business URL, project description, budget, query string or full external link is sent as an event property.

Testing: set your real `NEXT_PUBLIC_GA_ID` and rebuild. In browser devtools confirm that GA requests are absent before consent and after decline. Allow analytics and inspect the GA DebugView or `window.dataLayer` while clicking the hero, project card and contact links. Use a mocked `/api/enquiry` response to exercise success without sending email; a 4xx/5xx or network failure must never emit `enquiry_success`. A configured provider/GA account was not available for real production analytics validation.

## SEO and performance

The production canonical origin stays `https://portfolio-gamma-nine-k29hphsgok.vercel.app`. Set `NEXT_PUBLIC_SITE_URL` only after verifying a custom production domain. Existing indexable pages retain unique metadata; service and blog pages now explicitly include social images because nested metadata objects can replace layout metadata. SVG project artwork uses the existing PNG social image for share cards.

Five secondary project detail pages currently contain limited source facts. They stay public and linked but use `noindex, follow` and are omitted from the sitemap until substantive case-study evidence is added to `data/case-studies.ts`. The four priority case studies remain indexable. Robots rules continue excluding admin/API routes. Sitemap modification dates are supplied only when real dates are available, instead of assigning a fresh edit date at every build. These choices follow the [Next.js metadata conventions](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) and [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

The homepage remains a server component. Only four priority interactive cards are rendered there; all nine project routes remain. Images use Next Image, with local assets optimized and external admin-managed image URLs using an unoptimized fallback. The commerce scene is imported only as its reserved layout slot approaches the viewport; no 3D library was added. Its fictional figures have a visible “Demo Data · Illustrative Metrics” explanation. Keyboard rotation, pointer interaction and manual dragging remain supported. Touch surfaces allow vertical page scrolling. Motion respects reduced-motion preferences, and project text stays fully opaque during reveal effects.

Lab/browser checks are not field Core Web Vitals. No claim is made about LCP/INP/CLS gains, conversion uplift, revenue gains or production performance without a measured baseline and real traffic.

One unthrottled localhost production sample at 1440×1000 in headless Edge recorded LCP 1,248 ms, CLS 0 (also 0 after loading the demo), 174,726 encoded initial JavaScript bytes (~171 KiB), and no third-party scripts with analytics unconfigured. The sample did not record enough interaction timing data to report INP. These figures describe one local run, not production traffic or a measured before/after improvement. The existing commerce model's centering transform was corrected so it stays inside its stage while retaining rotation.

## Validation

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

If typecheck references a removed route from an older `.next` cache, run `npx next typegen` and repeat. Lint ignores generated build/cache folders. The 11 Node tests cover validation, injection, payload limits, honeypot/timing, rate limits, real-acknowledgement requirements, provider failures, idempotent retry keys and the unchanged offer. Provider calls are mocked, and tests forbid real network delivery.

Browser verification uses Playwright and axe installed outside application dependencies. Evidence is in the local `tmp/` directory. Completed checks include 320/375/768px overflow and mobile navigation, real unconfigured-delivery errors, mocked success/reset, deferred demo loading and keyboard rotation, reduced-motion scrolling, and 19 indexable sitemap URLs (HTTP 200, unique titles, one H1, production canonicals and social images). Automated WCAG A/AA scans returned no violations on the desktop homepage, 320px homepage and sampled case study. These are automated samples, not a complete manual accessibility certification.

An isolated Next.js fixture with a test measurement ID and intercepted GA transport verified consent, persisted decline, event counts, invalid/failed enquiry behavior, mocked enquiry success, exclusion of private form contents, consent withdrawal and Do Not Track. No events were sent to a real GA account. A successful build is not a substitute for provider delivery or field analytics verification.

## Remaining editorial and deployment work

- Confirm exact individual contributions, employer/client attribution, architecture and technical challenges for the four priority case studies. Add permission-cleared screenshots and sourced outcomes when available.
- Add substantive detail for the five secondary projects before changing their indexability. A Laravel-specific case study is still missing; the service page makes that limitation clear.
- Confirm that original external app/store/API links remain accessible, including any storefront password or demo availability requirements. Original URLs are preserved without promising availability.

The [Webkul subscription listing](https://apps.shopify.com/webkul-subscription-app) and [ReviewHub listing](https://apps.shopify.com/reviewhub-2) were retrieved during the audit. White Rabbit Rice and Payment Service API could not be verified through the audit browser's external fetch; this does not establish that they are offline. Their original links and previews are retained for owner verification.

- Configure the email provider and deliberately verify delivery to your own inbox. Configure the analytics ID and verify consent/events with your real account.
- No GitHub profile or scheduling URL is in the source. Add only verified URLs; no invented links are displayed.
- Repository inspection found `.env.local` already tracked by Git. The new ignore rules protect future env files but cannot remove a tracked file from history. Before public sharing/deployment, rotate existing secrets and remove the local env file from tracking/history using the repository's credential-remediation process. No secret values were printed, copied into frontend code or changed during this task.

## Modified source files

- `.env.example`, `.gitignore`, `package.json`, `eslint.config.mjs`, `tsconfig.json`, `README.md`
- `app/globals.css`, `app/layout.tsx`, `app/sitemap.ts`
- `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`
- `app/services/page.tsx`, `app/services/[slug]/page.tsx`
- `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`
- `app/api/enquiry/route.ts` (new)
- `components/PortfolioPage.tsx`, `components/PublicNavbar.tsx`, `components/PageShell.tsx`
- `components/InteractiveProjectCard.tsx`, `components/InteractiveCommerce3D.tsx`, `components/Analytics.tsx`
- `components/CaseStudyDetails.tsx`, `components/DeferredCommerceDemo.tsx`, `components/EnquiryForm.tsx`, `components/MobileNavigation.tsx` (new)
- `data/services.ts`, `data/case-studies.ts` (new)
- `lib/site.ts`, `lib/seo.ts`, `lib/analytics.ts`, `lib/enquiry.ts`, `lib/enquiry-delivery.ts` (last three new)
- `scripts/enquiry.test.mjs` (new), `docs/portfolio-conversion.md` (new)
- `tsconfig.tsbuildinfo` (compiler-generated cache refreshed by typecheck/build)

Existing screenshot deletions and the initially modified `next-env.d.ts` were present before this task and were not restored or incorporated into the implementation.

Temporary QA screenshots, scripts and an isolated analytics fixture remain under ignored `tmp/`. Automatic approval review rejected the temporary test-folder cleanup command with “blocked by policy”; no deletion was performed.
