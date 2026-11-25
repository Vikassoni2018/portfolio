import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import sharp from "sharp";
import { themePhoto, themeStoryPhotoPath, themeThumbnail, themes } from "../data/showcase.ts";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const base = process.env.SHOWCASE_URL ?? "http://localhost:3000";
const prefix = "/landing-page-designs";
const servicePath = "/services/landing-page-development";
const assetDirectory = path.resolve("public/showcase");
const captureDemos = process.argv.includes("--capture-demos");
const captureGallery = process.argv.includes("--capture-gallery");

const browser = await chromium.launch({
  channel: process.env.SHOWCASE_BROWSER || undefined,
  args: ["--enable-webgl", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"]
});

try {
  if (captureDemos || captureGallery) {
    const context = await browser.newContext({ viewport: { width: 1200, height: 675 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    for (const theme of captureDemos ? themes : []) {
      await visit(page, `${prefix}/${theme.slug}`);
      const shot = await settledScreenshot(page, ".demo-toolbar");
      await sharp(shot).resize(960, 540).webp({ quality: 83 }).toFile(path.join(assetDirectory, `${theme.visual}-preview.webp`));
      await sharp(shot).resize(1200, 630, { fit: "cover", position: "north" }).png().toFile(path.join(assetDirectory, `${theme.visual}-social.png`));
      console.log(`Captured ${theme.name}`);
    }
    if (captureGallery) {
      await visit(page, prefix);
      await page.evaluate(() => window.scrollTo(0, document.querySelector(".showcase-hero").getBoundingClientRect().top));
      const gallery = await settledScreenshot(page, "header.sticky");
      await sharp(gallery).resize(1200, 630, { fit: "cover", position: "north" }).png().toFile(path.join(assetDirectory, "gallery.png"));
    }
    await context.close();
  } else {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
    const page = await context.newPage();
    const runtimeErrors = [];
    const failedRequests = [];
    const accessibility = [];
    const seenTitles = new Set();
    const seenImages = new Set();
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400 && response.url().startsWith(base) && !response.url().endsWith("/missing-concept")) {
        failedRequests.push(`${response.status()} ${response.url()}`);
      }
    });

    const sitemap = await (await context.request.get(`${base}/sitemap.xml`)).text();
    await checkSearchMarkup(sitemap);
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      for (const theme of themes) {
        const route = `${prefix}/${theme.slug}`;
        await visit(page, route);
        await page.evaluate(() => document.fonts.ready);
        const root = page.locator("[data-concept-root]");
        await root.locator("h1").waitFor();
        assert.equal(await page.locator("h1").count(), 1);
        assert.ok(await root.locator("main > section").count() >= 6);
        assert.equal(await page.locator("main").count(), 1);
        assert.ok((await root.evaluate((element) => getComputedStyle(element).fontFamily)).length > 12, theme.slug);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `${theme.slug} at ${width}`);
        assert.equal(await root.evaluate((element) => element.scrollWidth <= element.clientWidth), true, `${theme.slug} content at ${width}`);
        const overflow = await root.evaluate((element) => {
          const range = document.createRange();
          return Array.from(element.querySelectorAll("h1,h2,h3,.concept-story-copy p,.concept-guide-grid p,.concept-closing a"))
            .filter((text) => text.checkVisibility({ contentVisibilityAuto: true }))
            .flatMap((text) => {
              const bounds = text.getBoundingClientRect();
              const nodes = document.createTreeWalker(text, NodeFilter.SHOW_TEXT);
              while (nodes.nextNode()) {
                range.selectNodeContents(nodes.currentNode);
                const escaped = Array.from(range.getClientRects()).some((line) => line.width > 0 &&
                  (line.left < -2 || line.right > window.innerWidth + 2 || line.left < bounds.left - 4 || line.right > bounds.right + 4));
                if (escaped) return [text.textContent.trim()];
              }
              return [];
            });
        });
        assert.deepEqual(overflow, [], `${theme.slug} text overflow at ${width}px`);
        assert.equal(await root.locator("#quick-guide article").count(), 3);
        await page.locator("[data-animation-ready=true]").waitFor({ state: "attached" });

        const navLink = root.locator(".brand-nav nav a").first();
        const anchor = await navLink.getAttribute("href");
        await navLink.click();
        await page.waitForURL((url) => url.hash === anchor);
        await page.waitForFunction((hash) => {
          const rect = document.querySelector(hash).getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        }, anchor);

        if (theme.slug === "neumorphism") {
          for (const [index, mode] of ["Focus", "Unwind", "Sleep"].entries()) {
            const radio = root.getByRole("radio", { name: mode });
            await root.locator(`label[for="ambient-${index}"]`).click();
            assert.ok(await radio.isChecked());
            const readout = root.locator(`#ambient-description-${index}`);
            assert.ok(await readout.isVisible());
            const separated = await readout.evaluate((description) => {
              const panel = description.closest(".neu-control");
              const options = panel.querySelector(".neu-options").getBoundingClientRect();
              const dial = panel.querySelector(".neu-dial").getBoundingClientRect();
              const text = description.getBoundingClientRect();
              return options.bottom < dial.top && dial.bottom < text.top
                && text.bottom <= panel.getBoundingClientRect().bottom;
            });
            assert.ok(separated, `${mode} mode controls overlap at ${width}px`);
          }
        }

        if (theme.slug === "bento-grid") {
          const cards = root.locator(".bento-feature");
          assert.equal(await cards.count(), 4);
          for (const card of await cards.all()) {
            assert.ok(await card.locator(".bento-feature-description").isVisible());
            assert.ok(await card.locator("summary [class^='bento-card-']").isVisible());
            assert.ok(await card.evaluate((element) => element.scrollWidth <= element.clientWidth + 1));
            const summary = card.locator("summary");
            const example = card.locator(".bento-feature-example");
            assert.equal(await example.isVisible(), false);
            await summary.press("Enter");
            assert.ok(await example.isVisible());
            await summary.press("Enter");
            assert.equal(await example.isVisible(), false);
          }
        }

        if (width === 1440) {
          const storyImage = root.locator("#field-notes img");
          await storyImage.scrollIntoViewIfNeeded();
          assert.ok(await storyImage.evaluate(async (image) => {
            await image.decode();
            return image.naturalWidth > 0 && image.alt.length > 10;
          }), `${theme.slug} chapter image`);
          const title = await page.title();
          const image = await page.locator('meta[property="og:image"]').getAttribute("content");
          const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
          assert.ok(title.includes(theme.title), theme.name);
          assert.ok(canonical.endsWith(route));
          assert.ok(sitemap.includes(canonical));
          assert.ok((await context.request.get(`${base}${new URL(image).pathname}`)).ok());
          assert.equal(await page.locator('meta[name="twitter:card"]').getAttribute("content"), "summary_large_image");
          const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
          assert.ok(schemas.some((schema) => JSON.parse(schema)["@graph"]?.some((node) => node["@type"] === "CreativeWork")));
          assert.ok(!seenImages.has(image) && !seenTitles.has(title));
          seenTitles.add(title);
          seenImages.add(image);
          await root.locator("[data-reveal]").first().scrollIntoViewIfNeeded();
          await page.waitForFunction(() => document.querySelector("[data-reveal]").style.transform !== "");
          const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
          accessibility.push(...axe.violations.map((violation) => ({ slug: theme.slug, rule: violation.id, nodes: violation.nodes.map(({ target, failureSummary }) => [target, failureSummary]) })));
        }
      }
      console.log(`Verified ${themes.length} routes with active GSAP and in-page navigation at ${width}px`);
    }

    await page.setViewportSize({ width: 1440, height: 900 });
    await visit(page, prefix);
    assert.equal(await page.locator(".showcase-card").count(), themes.length);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href").then((url) => url.endsWith(prefix)), true);
    const galleryAxe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    accessibility.push(...galleryAxe.violations.map((violation) => ({ slug: "gallery", rule: violation.id, nodes: violation.nodes.map(({ target, failureSummary }) => [target, failureSummary]) })));
    await page.getByRole("button", { name: "Food & drink" }).click();
    assert.equal(await page.locator(".showcase-card").count(), 2);
    await page.getByRole("link", { name: "Live Preview: Cartoon" }).click();
    await page.waitForURL(`**${prefix}/cartoon`);
    assert.equal(await page.evaluate(() => window.scrollY), 0);
    await page.getByRole("button", { name: "Preview controls" }).click();
    const frame = page.frameLocator(".preview-canvas iframe");
    for (const [size, width] of [["Tablet", 768], ["Mobile", 390]]) {
      await page.getByRole("button", { name: `${size} preview` }).click();
      await frame.locator("[data-animation-ready=true]").waitFor({ state: "attached" });
      assert.equal(await frame.locator("body").evaluate(() => innerWidth), width);
      await frame.locator(".brand-nav a[href='#flavors']").click();
      assert.equal(await frame.locator("body").evaluate(() => location.hash), "#flavors");
      assert.equal(await frame.locator(".demo-toolbar").count(), 0);
    }
    await page.getByRole("button", { name: "Disable animations" }).click();
    await frame.locator('[data-motion="off"]').waitFor();
    assert.equal(await frame.locator("[data-animation-ready]").count(), 0);
    await page.getByRole("button", { name: "Disable animations" }).click();
    await frame.locator("[data-animation-ready=true]").waitFor();
    await page.getByRole("button", { name: "Restart animations" }).click();
    await frame.locator("[data-animation-ready=true]").waitFor();
    assert.equal(await frame.locator("body").evaluate(() => location.hash), "");
    await page.getByRole("button", { name: "Desktop preview" }).click();
    assert.equal(await frame.locator("body").evaluate(() => innerWidth), 1440);
    await page.setViewportSize({ width: 320, height: 820 });
    await page.getByRole("button", { name: "Tablet preview" }).click();
    await page.waitForFunction(() => document.querySelector(".preview-canvas iframe").getBoundingClientRect().width < 320);
    assert.equal(await frame.locator("body").evaluate(() => innerWidth), 768);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.getByRole("button", { name: "Use browser viewport" }).click();
    await page.locator("[data-animation-ready=true]").waitFor();
    await page.getByRole("button", { name: "Disable animations" }).click();
    await page.locator("[data-animation-ready]").waitFor({ state: "detached" });
    assert.equal(await page.locator(".mascot-zaps path").evaluate((element) => element.style.strokeDashoffset), "");
    await page.getByRole("button", { name: "Disable animations" }).click();
    await page.getByRole("button", { name: "Full-screen mode" }).click();
    await page.getByRole("button", { name: "Exit full screen" }).click();
    await page.getByRole("link", { name: "Next theme: Neumorphism" }).click();
    await page.waitForURL(`**${prefix}/neumorphism`);
    await page.locator('label[for="ambient-1"]').click();
    assert.equal(await page.locator("#ambient-1").isChecked(), true);
    await page.getByRole("button", { name: "Preview controls" }).click();
    await page.getByRole("link", { name: "Previous theme: Cartoon" }).click();
    await page.waitForURL(`**${prefix}/cartoon`);
    await page.getByRole("button", { name: "Preview controls" }).click();
    await page.getByRole("combobox", { name: "Choose a landing page theme" }).selectOption("3d-immersive");
    await page.waitForURL(`**${prefix}/3d-immersive`);
    await page.locator(".product-stage").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Rotate headphones right" }).waitFor();
    await page.getByRole("button", { name: "Rotate headphones right" }).click();
    await page.getByRole("button", { name: "Sand" }).click();
    assert.equal(await page.getByRole("button", { name: "Sand" }).getAttribute("aria-pressed"), "true");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.locator("[data-animation-ready]").waitFor({ state: "detached" });
    await page.locator(".product-fallback").waitFor();
    assert.equal(await page.locator(".product-render canvas").count(), 0);
    await page.getByRole("link", { name: "Build My Website in This Style" }).click();
    await page.waitForURL("**/?theme=3d-immersive#contact");
    const description = page.locator("#enquiry-description");
    await page.waitForFunction(() => document.querySelector("#enquiry-description").value.includes("3D Immersive"));
    assert.equal(await page.locator("#enquiry-service").inputValue(), "Custom Landing Page Development");

    await page.fill("#enquiry-name", "Portfolio QA");
    await page.fill("#enquiry-email", "test@example.com");
    await description.fill(`${await description.inputValue()}A product launch page with three finishes.`);
    await page.route("**/api/enquiry", async (route) => {
      const body = route.request().postDataJSON();
      assert.equal(body.service, "Custom Landing Page Development");
      assert.ok(body.description.includes("3D Immersive"));
      await route.fulfill({ json: { ok: true, message: "Preview enquiry received." } });
    });
    await page.getByRole("button", { name: "Send Project Enquiry" }).click();
    await page.getByText("Preview enquiry received.").waitFor();
    assert.equal((await context.request.get(`${base}${prefix}/missing-concept`)).status(), 404);
    assert.deepEqual(runtimeErrors, []);
    assert.deepEqual(failedRequests, []);
    assert.deepEqual(accessibility, []);
    console.log("Verified gallery filters, responsive iframe widths, toolbar, WebGL and fallback, enquiry submission contract, crawlable SEO, and Axe WCAG scans.");
  }
} finally {
  await browser.close();
}

async function visit(page, route) {
  const response = await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
  assert.equal(response?.status(), 200, route);
}

async function checkSearchMarkup(sitemap) {
  const crawler = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await crawler.newPage();
    const descriptions = new Set();
    const titles = new Set();
    await visit(page, prefix);
    const galleryUrl = await page.locator('link[rel="canonical"]').getAttribute("href");
    const origin = new URL(galleryUrl).origin;
    assert.equal(galleryUrl, origin + prefix);
    assert.equal(await page.locator(`main a[href="${servicePath}"]`).count(), 1);
    assert.equal(await page.locator(".showcase-card").count(), themes.length);
    const galleryGraph = await schemaNodes(page);
    const collection = galleryGraph.find((node) => node["@type"] === "CollectionPage");
    assert.equal(collection.mainEntity.itemListElement.length, themes.length);
    assert.equal(collection.relatedLink, origin + servicePath);

    for (const theme of themes) {
      const route = `${prefix}/${theme.slug}`;
      const canonical = origin + route;
      const description = await page.goto(`${base}${route}`).then(async (response) => {
        assert.equal(response?.status(), 200);
        return page.locator('meta[name="description"]').getAttribute("content");
      });
      const title = await page.title();
      assert.ok(description.includes(theme.brand) && !descriptions.has(description), theme.slug);
      assert.ok(title.includes(theme.title) && !titles.has(title), theme.slug);
      descriptions.add(description);
      titles.add(title);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), canonical);
      assert.equal(await page.locator('meta[property="og:title"]').getAttribute("content"), title);
      assert.equal(await page.locator('meta[name="twitter:description"]').getAttribute("content"), description);
      assert.equal(await page.locator(`.concept-design-notes a[href="${servicePath}"]`).count(), 1);
      assert.equal(await page.locator(".concept-design-notes nav a").count(), 2);
      assert.ok(await page.locator('.concept-design-notes p').isVisible());

      const graph = await schemaNodes(page);
      const webPage = graph.find((node) => node["@type"] === "WebPage");
      const work = graph.find((node) => node["@type"] === "CreativeWork");
      const crumbs = graph.find((node) => node["@type"] === "BreadcrumbList");
      assert.equal(webPage.url, canonical);
      assert.equal(webPage.mainEntity["@id"], work["@id"]);
      assert.equal(webPage.breadcrumb["@id"], crumbs["@id"]);
      assert.equal(crumbs.itemListElement.at(-1).item, canonical);
      const themeSitemap = sitemap.split("<url>").find((item) => item.includes(`<loc>${canonical}</loc>`));
      for (const asset of [themePhoto(theme).src, themeStoryPhotoPath(theme)]) {
        assert.ok(themeSitemap?.includes(`<image:loc>${origin}${asset}</image:loc>`));
        assert.ok((await crawler.request.get(base + asset)).ok(), asset);
      }
      assert.ok(sitemap.includes(`<image:loc>${origin}${themeThumbnail(theme)}</image:loc>`));
    }

    await visit(page, servicePath);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), origin + servicePath);
    assert.ok(sitemap.includes(`<loc>${origin}${servicePath}</loc>`));
    assert.equal(await page.locator(`section[aria-labelledby="landing-examples"] a[href^="${prefix}/"]`).count(), themes.length);
    await visit(page, "/services/shopify-theme-development");
    assert.equal(await page.locator(`section[aria-labelledby="landing-examples"] a[href^="${prefix}/"]`).count(), 4);
    await visit(page, `${prefix}/glassmorphism?preview=1&motion=off`);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `${origin}${prefix}/glassmorphism`);
    const robots = await (await crawler.request.get(`${base}/robots.txt`)).text();
    assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
    console.log("Verified server-rendered SEO and image sitemap entries for the showcase and all 10 concepts, with service links and canonical preview URLs.");
  } finally {
    await crawler.close();
  }
}

async function schemaNodes(page) {
  return (await page.locator('script[type="application/ld+json"]').allTextContents())
    .flatMap((markup) => JSON.parse(markup)["@graph"] ?? []);
}

async function settledScreenshot(page, hideSelector) {
  await page.addStyleTag({ content: `${hideSelector} { visibility: hidden !important; }` });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].filter((image) => image.getBoundingClientRect().top < innerHeight)
      .map((image) => image.decode()));
  });
  return page.screenshot({ animations: "disabled" });
}

