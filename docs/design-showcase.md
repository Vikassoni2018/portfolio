# Landing page design showcase

The gallery is at `/landing-page-designs`. Each of the ten concepts is a standalone, statically generated route beneath it. The fictional names, product specifications and example screens are part of the design concepts.

## Source map

- `app/landing-page-designs/` contains the gallery and standalone concept route. `app/sitemap.ts` adds all eleven URLs.
- `components/showcase/` contains the gallery, preview controls, GSAP setup, ten layouts, and the Three.js product viewer.
- `data/showcase.ts`, `data/showcase-search.ts`, and `lib/showcase-seo.ts` provide the registry, search descriptions, related themes, canonical URLs, and structured data. `data/showcase-stories.ts` holds the photography chapter and quick guide for each concept.
- `components/PublicNavbar.tsx`, `components/MobileNavigation.tsx`, `components/EnquiryForm.tsx`, and `lib/enquiry.ts` integrate the gallery and theme enquiries with the portfolio.
- `public/showcase/` contains the stock photos, fonts, previews, and social cards. `scripts/showcase-qa.mjs` tests the routes and regenerates the screenshots.

## Add a theme

1. Add its slug, brand, category, palette, typeface, SEO title, description, image text and motion highlights to [the registry](../data/showcase.ts). Add a search description, visible design note, and related theme links in [the search details](../data/showcase-search.ts).
2. Add a server component and a scoped stylesheet in [the themes directory](../components/showcase/themes). Use a theme-specific layout, one `h1`, a `main` with `id="main-content"`, and persistent section IDs for the in-page navigation. Register a lazy import in [the component map](../components/showcase/themes/index.ts). The gallery, toolbar, static params, metadata, breadcrumbs and sitemap read from the registry.
3. Add the relevant ScrollTrigger and micro-interaction logic to [the concept animation module](../components/showcase/motion.ts). Scope new animations to the demo root, keep content visible at rest, and clean up event listeners and tweens when the GSAP context reverts. Test with both the operating system preference and the toolbar toggle.
4. Add the main photo as `public/showcase/<visual>.webp` and the chapter photo as `public/showcase/<visual>-story.webp`. Add the chapter and guide in `data/showcase-stories.ts` and record the photo sources below. Include the license for any local font. Generate the preview WebP and social PNG from the implemented page.
5. Run the production build, component checks, and browser QA. The gallery and theme CTAs use `/?theme=<slug>#contact`. The existing enquiry form validates the slug, selects the landing-page development service, and includes the theme in the editable project description sent through the existing API.

Desktop, tablet, and mobile previews use 1440px, 768px, and 390px iframes. The frame scales to fit the browser window while keeping the selected width for media queries. Full-screen uses the browser API with an in-page presentation fallback. The headphone model is loaded only near its section on wider screens with motion enabled. The three finishes also work in the static illustration on small screens, under reduced motion, or when WebGL is unavailable.

## Browser QA and screenshots

Install the project dependencies and a Playwright browser, then run the production server.

```sh
npm ci
npx playwright install chromium
npm run build
npm start
```

In a second terminal, run:

```sh
npm run test:showcase
```

Set `SHOWCASE_URL` for a different local origin or `SHOWCASE_BROWSER=msedge` to use Microsoft Edge. The browser test covers the standalone routes at 1440, 768, 390 and 320px, in-page navigation, motion and cleanup, SEO metadata, the sitemap, gallery filtering, viewport simulation, the WebGL viewer and fallback, and the enquiry handoff. The final browser submission uses a mocked response. The unit tests exercise the enquiry route and email-provider contract separately.

A local mobile Lighthouse run against the gallery scored 100 for performance, accessibility, best practices, and SEO. It reported 0.9 seconds for Largest Contentful Paint and 0 for Cumulative Layout Shift. These are lab measurements for the gallery. Field metrics depend on real visits.

Refresh the screenshots after changing a concept hero. Use a running server to capture the ten demos, restart a production server so Next.js can discover any new public assets, then capture the gallery.

```sh
npm run test:showcase -- --capture-demos
npm run test:showcase -- --capture-gallery
```

The capture script uses a 1200 × 675 browser viewport with reduced motion, hides the portfolio toolbar, and exports real screenshots as 960 × 540 WebP previews and 1200 × 630 PNG share images.

## Search and internal links

The gallery and each concept ship page-specific titles, descriptions, social metadata, canonical URLs, and linked JSON-LD. Theme preview parameters resolve to the same canonical concept. The sitemap pairs each theme with its two stock photos and lists the rendered screenshots under the gallery.

Each demo includes visible design notes and two related examples. The custom landing page development service links back to every theme, and the Shopify theme service links back to the storefront examples.

The production origin comes from `NEXT_PUBLIC_SITE_URL`. The browser QA also runs with JavaScript disabled to verify search metadata, related links, and image sitemap entries in the production build.

## Stock imagery and font licenses

The photographs and abstract renders are hosted locally under the [Pexels License](https://www.pexels.com/license/), [Unsplash License](https://unsplash.com/license), and [Wikimedia Commons / Openverse Creative Commons licenses](https://commons.wikimedia.org/). Every card across the ten concepts—including feature cards, interactive selectors, lookbooks, galleries, and the three quick-guide cards—uses locally optimized WebP stock imagery (`public/showcase/<visual>-1.webp` .. `<visual>-7.webp`) alongside the hero and chapter photos (`<visual>.webp` and `<visual>-story.webp`). Self-hosted fonts include their SIL Open Font License files in [the font directory](../public/showcase/fonts).

| Theme | Stock source |
|---|---|
| Glassmorphism | [3D waves by Mahmoud Ramadan](https://www.pexels.com/photo/vibrant-abstract-3d-waves-in-purple-and-blue-31622908/) |
| Claymorphism | [Stationery by Darina Belonogova](https://www.pexels.com/photo/notebook-with-pencils-on-a-desk-and-memo-cards-on-the-wall-8004052/) |
| Cartoon | [Citrus drink](https://www.pexels.com/photo/a-drink-with-orange-slices-and-lime-on-top-17321338/) |
| Neumorphism | [Smart speaker by Anete Lusina](https://www.pexels.com/photo/white-speaker-on-the-table-4790278/) |
| Neo-Brutalism | [Geometric building façade](https://www.pexels.com/photo/colorful-modern-building-facade-with-geometric-patterns-29527624/) |
| Minimalist Luxury | [Jewelry editorial by Husien Bisky](https://www.pexels.com/photo/elegant-woman-wearing-gold-jewelry-and-ring-37586698/) |
| Retro Vintage | [Coffee cup and roasted beans](https://www.pexels.com/photo/close-up-of-coffee-cup-with-roasted-beans-28678822/) |
| Cyberpunk | [Neon facade by Vladislav Bychkov](https://www.pexels.com/photo/neon-lights-on-a-building-6319332/) |
| Bento Grid | [Modern home office](https://www.pexels.com/photo/minimalist-home-office-desk-with-laptop-31145639/) |
| 3D Immersive | [Black headphones](https://www.pexels.com/photo/a-close-up-shot-of-black-headphones-9154413/) |

| Theme | Chapter photo |
|---|---|
| Glassmorphism | [Developer working on a laptop](https://www.pexels.com/photo/crop-faceless-developer-working-on-software-code-on-laptop-5926382/) |
| Claymorphism | [Sticky notes and colored pens](https://www.pexels.com/photo/photo-of-sticky-notes-and-colored-pens-scrambled-on-table-632470/) |
| Cartoon | [Citrus mocktail with mint](https://www.pexels.com/photo/refreshing-citrus-mocktail-with-mint-garnish-29002944/) |
| Neumorphism | [White sofa and side table](https://www.pexels.com/photo/a-white-sofa-beside-a-side-table-12285890/) |
| Neo-Brutalism | [Colorful street posters](https://www.pexels.com/photo/colorful-wall-of-posters-in-urban-setting-29501720/) |
| Minimalist Luxury | [Gold ring under fabric](https://www.pexels.com/photo/golden-ring-under-cloth-17368718/) |
| Retro Vintage | [Pour-over coffee](https://www.pexels.com/photo/close-up-of-a-person-pouring-hot-water-to-a-coffee-pot-with-a-filter-16911301/) |
| Cyberpunk | [Neon signs on a rainy street](https://www.pexels.com/photo/night-city-street-after-rain-illuminated-by-colorful-neon-signs-reflecting-on-a-wet-road-18867525/) |
| Bento Grid | [Coworkers at a shared table](https://www.pexels.com/photo/coworkers-working-together-5186358/) |
| 3D Immersive | [Listener wearing headphones](https://www.pexels.com/photo/woman-in-black-tank-top-wearing-brown-headphones-13520467/) |

