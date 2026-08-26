export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "callout"; text: string };

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** ISO date. Drives sitemap lastModified and the article schema. */
  date: string;
  updated?: string;
  readingMinutes: number;
  tags: string[];
  excerpt: string;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "shopify-webhooks-idempotent",
    title: "Making Shopify webhooks idempotent (and why yours probably are not)",
    metaTitle: "How to Make Shopify Webhooks Idempotent",
    metaDescription:
      "Shopify delivers webhooks at least once, not exactly once. A practical guide to HMAC verification, idempotency keys, queue-backed processing and handling out-of-order delivery.",
    date: "2026-06-18",
    readingMinutes: 7,
    tags: ["Shopify", "Webhooks", "Architecture"],
    excerpt:
      "Shopify guarantees at-least-once delivery, which means duplicate and out-of-order webhooks are normal traffic rather than edge cases. Here is the handler structure that survives them.",
    body: [
      {
        type: "p",
        text: "Almost every Shopify app I have audited has the same latent bug: the webhook handler assumes each event arrives exactly once, in order. Shopify makes neither guarantee. It guarantees at-least-once delivery, retries on any non-2xx response or timeout, and gives no ordering promise between separate topics. On a quiet store you may never notice. On a busy one, duplicates turn into double-charged customers and orphaned records."
      },
      { type: "h2", text: "Verify the HMAC before anything else" },
      {
        type: "p",
        text: "The signature check has to happen against the raw request body. Any middleware that parses JSON before you compute the digest will change the bytes and the comparison will fail, so the raw body must be preserved. Use a timing-safe comparison, not string equality."
      },
      {
        type: "code",
        lang: "php",
        code: "$digest = base64_encode(hash_hmac('sha256', $rawBody, $secret, true));\n\nif (!hash_equals($digest, $request->header('X-Shopify-Hmac-Sha256', ''))) {\n    return response('', 401);\n}"
      },
      { type: "h2", text: "Answer fast, process later" },
      {
        type: "p",
        text: "Shopify expects a response within five seconds and treats a timeout as a failure worth retrying. If you do the real work inline, a slow database or a third-party API call turns one event into a retry storm. Acknowledge immediately, then process from a queue."
      },
      {
        type: "ul",
        items: [
          "Verify the HMAC, persist the raw payload, return 200. Nothing else.",
          "Do the actual work in a queued job with its own retry and backoff policy.",
          "Send failures to a dead-letter queue you can inspect, not to a log file nobody reads."
        ]
      },
      { type: "h2", text: "Deduplicate on the event id" },
      {
        type: "p",
        text: "Every delivery carries an X-Shopify-Webhook-Id header that stays constant across retries of the same event. Store it with a unique constraint and let the database reject duplicates. This is more reliable than checking whether the work looks done, because it does not race with itself."
      },
      {
        type: "code",
        lang: "php",
        code: "// Unique index on webhook_id makes the duplicate a no-op\ntry {\n    WebhookEvent::create([\n        'webhook_id' => $request->header('X-Shopify-Webhook-Id'),\n        'topic'      => $request->header('X-Shopify-Topic'),\n        'shop'       => $request->header('X-Shopify-Shop-Domain'),\n        'payload'    => $rawBody,\n    ]);\n} catch (UniqueConstraintViolationException) {\n    return response('', 200); // already seen, nothing to do\n}"
      },
      { type: "h2", text: "Handle out-of-order delivery with version checks" },
      {
        type: "p",
        text: "Deduplication stops the same event applying twice. It does not stop an older event overwriting a newer one, which happens when a retry of an early update lands after a later update succeeded. The fix is to compare the payload timestamp against what you already stored and drop anything stale."
      },
      {
        type: "callout",
        text: "Rule of thumb: dedupe on webhook id, order on updated_at. You need both. Either one alone leaves a real corruption path open."
      },
      { type: "h2", text: "Do not trust the payload as the source of truth" },
      {
        type: "p",
        text: "Webhook payloads are a notification that something changed, and they can be minutes stale by the time a retry succeeds. For anything financial, treat the webhook as a trigger and re-read the current state from the Admin API before acting on it. That one habit removes an entire category of reconciliation bug."
      },
      { type: "h2", text: "The mandatory compliance webhooks" },
      {
        type: "p",
        text: "Public apps must implement customers/data_request, customers/redact and shop/redact. App review checks that they exist and respond correctly, and this is one of the more common reasons a submission gets bounced. Build them at the start rather than in the week you plan to submit."
      }
    ]
  },
  {
    slug: "shopify-subscription-churn-self-service",
    title: "Why self-service pause and skip beats every retention email",
    metaTitle: "Reducing Shopify Subscription Churn with Self-Service Controls",
    metaDescription:
      "Subscription churn on Shopify splits into voluntary and involuntary. Self-service pause, skip and swap plus a real dunning schedule address both, and here is how to build them.",
    date: "2026-07-09",
    readingMinutes: 6,
    tags: ["Shopify", "Subscriptions", "Retention"],
    excerpt:
      "Most subscription churn work goes into win-back emails. The larger wins are usually a pause button the customer can find and a dunning schedule that actually retries.",
    body: [
      {
        type: "p",
        text: "Subscription churn comes in two forms and they need completely different fixes. Voluntary churn is a customer deciding to leave. Involuntary churn is a payment failing on a customer who intended to stay. Teams tend to spend their effort on the first and lose more revenue to the second."
      },
      { type: "h2", text: "Involuntary churn is the cheaper problem to fix" },
      {
        type: "p",
        text: "A declined card is not a retention problem, it is a plumbing problem. Cards expire, banks decline for transient reasons, and balances vary by day of month. Retrying a failed charge on a sensible schedule recovers a meaningful share of those customers with no discount and no persuasion."
      },
      {
        type: "ul",
        items: [
          "Retry on a spread schedule rather than hammering the same day.",
          "Notify the customer with a direct link to update the payment method, not a login wall.",
          "Warn before the card expires, using the expiry data you already hold.",
          "Stop retrying at a defined point and mark the contract properly instead of leaving it in limbo."
        ]
      },
      { type: "h2", text: "Voluntary churn: give them an option that is not cancel" },
      {
        type: "p",
        text: "When the only control a customer can find is Cancel, that is the button they press, even when their actual problem is that they have too much product already or they are travelling next month. Shopify subscription contracts support the alternatives natively. The work is exposing them clearly."
      },
      { type: "h3", text: "The four controls worth building first" },
      {
        type: "ul",
        items: [
          "Skip the next delivery. Solves the too much stock problem without ending the subscription.",
          "Pause for a chosen period, with an automatic resume date so it does not become a silent cancel.",
          "Change frequency. A customer moving from monthly to bi-monthly is retained revenue, not lost revenue.",
          "Swap the product or variant, which keeps customers who liked the model but not that specific item."
        ]
      },
      {
        type: "callout",
        text: "If a customer has to email support to pause, you have converted a pause into a cancellation and added a support ticket."
      },
      { type: "h2", text: "Build on selling plans and subscription contracts" },
      {
        type: "p",
        text: "It is tempting to model subscriptions in your own tables and drive charges yourself. It works until you need Shop Pay, the customer account area, or a refund that reconciles. Selling plan groups and subscription contracts keep the subscription visible to Shopify checkout and to the merchant, which is what makes the rest of the ecosystem behave."
      },
      { type: "h2", text: "Instrument the cancel reason" },
      {
        type: "p",
        text: "A cancellation flow that captures a structured reason is worth more than the flow that tries to prevent the cancellation. Once you can see that a third of cancellations say too much product, the fix is obvious and it is a frequency control, not a discount."
      }
    ]
  },
  {
    slug: "shopify-theme-core-web-vitals",
    title: "The three things actually slowing down your Shopify theme",
    metaTitle: "Shopify Core Web Vitals: Fixing LCP, CLS and INP",
    metaDescription:
      "A practical Shopify speed audit: app-injected scripts, unoptimized hero images and render-blocking assets cause most Core Web Vitals failures. Here is how to find and fix each.",
    date: "2026-08-04",
    readingMinutes: 8,
    tags: ["Shopify", "Performance", "SEO"],
    excerpt:
      "Most Shopify speed audits end in a long list nobody actions. In practice three issues cause the majority of Core Web Vitals failures, and two of them are not in your theme code at all.",
    body: [
      {
        type: "p",
        text: "Shopify store speed reports tend to produce forty recommendations, and the merchant actions none of them. Having done this work across storefronts and an AMP implementation, the distribution is heavily skewed: three problems account for most of the damage, and the biggest one is usually not in the theme code."
      },
      { type: "h2", text: "1. App-injected scripts" },
      {
        type: "p",
        text: "Every app a merchant installs can inject script tags into the storefront. Uninstalling the app does not always remove them. A store that has trialled a dozen apps over two years often ships several hundred kilobytes of JavaScript for features nobody uses any more, and it blocks the main thread, which is what INP measures."
      },
      {
        type: "ul",
        items: [
          "Audit the rendered page source for script tags that no live feature depends on.",
          "Check for leftover ScriptTag API entries from apps that were removed.",
          "Load anything non-critical, such as chat widgets and review widgets, after interaction or on idle.",
          "Consolidate tracking through a single tag manager rather than five separate snippets."
        ]
      },
      {
        type: "callout",
        text: "Before optimizing a single line of Liquid, open the page source on a product page and count the third-party script tags. That number is usually the story."
      },
      { type: "h2", text: "2. The hero image, which is nearly always the LCP element" },
      {
        type: "p",
        text: "On the majority of storefronts the Largest Contentful Paint element is the first banner or the product image. Getting that one image right moves the score more than everything else combined."
      },
      {
        type: "code",
        lang: "liquid",
        code: "{{ section.settings.hero\n  | image_url: width: 1600\n  | image_tag:\n    loading: 'eager',\n    fetchpriority: 'high',\n    sizes: '100vw',\n    widths: '400, 600, 800, 1200, 1600',\n    alt: section.settings.hero.alt\n}}"
      },
      {
        type: "p",
        text: "Three details matter here and are commonly missed. The hero must not be lazy-loaded, because lazy loading the LCP element delays the exact thing being measured. It should carry fetchpriority high so the browser fetches it ahead of other resources. And widths plus sizes must be present so mobile does not download a desktop-sized file."
      },
      { type: "h2", text: "3. Layout shift from images and fonts without reserved space" },
      {
        type: "p",
        text: "CLS is almost always images without width and height attributes, web fonts swapping in at a different metric, or content injected above the fold after paint. Each is straightforward once identified."
      },
      {
        type: "ul",
        items: [
          "Set explicit width and height, or an aspect-ratio, on every image so the browser reserves the box before the file arrives.",
          "Use font-display swap with a fallback stack chosen for similar metrics, or preload the primary font.",
          "Never inject banners or announcement bars above existing content after first paint. Reserve the space in the initial HTML."
        ]
      },
      { type: "h2", text: "Measure field data, not just Lighthouse" },
      {
        type: "p",
        text: "Lighthouse runs a simulated load on a synthetic device. Google ranks on the Chrome UX Report, which is real visitors on real connections. A store can score in the nineties in Lighthouse and still fail Core Web Vitals in the field. Check the CrUX data in Search Console before deciding the work is done."
      },
      { type: "h2", text: "Where AMP still fits" },
      {
        type: "p",
        text: "AMP is no longer required for the mobile search carousel, so it is rarely worth adopting for SEO alone in 2026. Its constraints remain a useful teacher, though: the reason AMP pages felt fast was a hard cap on third-party JavaScript. Applying that same discipline to a normal theme gets most of the benefit without the format."
      }
    ]
  }
];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);

export const sortedPosts = () => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
