import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Theme } from "@/data/showcase";

gsap.registerPlugin(ScrollTrigger);

const revealMotion: Record<Theme["visual"], gsap.TweenVars> = {
  glass: { y: 34, scale: 0.96, ease: "power3.out" },
  clay: { y: 26, scaleX: 0.86, scaleY: 1.08, ease: "elastic.out(1, .55)" },
  cartoon: { rotation: -6, y: 22, scale: 0.91, ease: "back.out(2.1)" },
  neu: { scale: 0.94, y: 18, ease: "power2.out" },
  brutal: { x: -16, skewX: -3, ease: "steps(5)" },
  luxury: { clipPath: "inset(12% 0 14% 0)", y: 22, ease: "power3.out" },
  retro: { rotation: 2.5, y: 24, ease: "steps(5)" },
  cyber: { clipPath: "inset(0 22% 0 0)", x: 16, ease: "steps(6)" },
  bento: { scale: 0.92, y: 22, transformOrigin: "left bottom", ease: "back.out(1.2)" },
  immersive: { y: 28, scale: 0.97, ease: "power3.out" }
};

const floatEnterEase: Record<Theme["visual"], string> = {
  glass: "power3.out",
  clay: "elastic.out(1, 0.55)",
  cartoon: "back.out(2.2)",
  neu: "power2.out",
  brutal: "steps(5)",
  luxury: "power3.out",
  retro: "back.out(1.7)",
  cyber: "steps(6)",
  bento: "back.out(1.6)",
  immersive: "power3.out"
};

export function animateConcept(root: HTMLElement, visual: Theme["visual"]) {
  const media = gsap.matchMedia();
  const context = gsap.context(() => {
    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktopFlight: "(min-width: 768px)",
        pointer: "(pointer: fine) and (min-width: 768px)"
      },
      ({ conditions }) => {
        if (!conditions?.motion) return;
        const cleanups: (() => void)[] = [];
        const one = <T extends Element = HTMLElement>(selector: string) =>
          root.querySelector<T>(selector);
        const all = (selector: string) =>
          Array.from(root.querySelectorAll<HTMLElement>(selector));

        root.setAttribute("data-animation-ready", "true");

        // 1. Top-to-Bottom Scrolled Document Progress Hairline Bar
        const progressBar = one(".concept-scroll-progress");
        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.25
              }
            }
          );
        }

        // 2. Hero Entrance Choreography
        const title = one("h1");
        const kicker = one(".hero-copy .concept-kicker");
        const button = one(".hero-copy .concept-button");
        const hero = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });
        if (title) hero.from(title, { y: 22, opacity: 0.62 }, 0);
        if (kicker) hero.from(kicker, { x: -16, duration: 0.52 }, 0);
        if (button) hero.from(button, { y: 12, scale: 0.96, duration: 0.52 }, 0.14);

        // 3. Real Concept Hardware / Product Cutout Top-to-Bottom Cross-Section Flight & Depth
        const floatObjects = all(".concept-float-obj");
        const heroObj = floatObjects[0];
        const closingDock = one<HTMLElement>(".concept-closing-dock");

        floatObjects.forEach((obj, idx) => {
          const inHero = idx === 0;
          if (inHero) {
            hero.from(
              obj,
              {
                y: 26,
                scale: 0.74,
                rotation: idx % 2 === 0 ? -12 : 12,
                opacity: 0,
                duration: 0.9,
                ease: floatEnterEase[visual]
              },
              0.12
            );
            if (!conditions.desktopFlight || !closingDock) {
              gsap.to(obj, {
                yPercent: -14,
                rotation: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: obj.parentElement ?? obj,
                  start: "top 85%",
                  end: "bottom top",
                  scrub: 0.65
                }
              });
            }
          } else {
            gsap.from(obj, {
              y: 30,
              scale: 0.78,
              rotation: -10,
              opacity: 0,
              duration: 0.82,
              ease: floatEnterEase[visual],
              scrollTrigger: { trigger: obj, start: "top 92%", once: true }
            });
            gsap.to(obj, {
              yPercent: -10,
              rotation: -5,
              ease: "none",
              scrollTrigger: {
                trigger: obj.parentElement ?? obj,
                start: "top 85%",
                end: "bottom top",
                scrub: 0.65
              }
            });
          }

          if (conditions.pointer) {
            cleanups.push(pointerDepth(root, obj, inHero ? 24 : 16));
          }
        });

        if (conditions.desktopFlight && heroObj && closingDock) {
          const heroImg = heroObj.querySelector("img");
          const src = heroImg?.getAttribute("src") ?? "";
          if (src) {
            const dockGhost = closingDock.querySelector<HTMLElement>(".concept-dock-ghost");
            dockGhost?.setAttribute("data-motion-dock", "active");

            const travel = document.createElement("div");
            travel.className = "concept-travel-obj";
            travel.setAttribute("aria-hidden", "true");
            const img = document.createElement("img");
            img.src = src;
            img.alt = "";
            img.width = 240;
            img.height = 240;
            travel.appendChild(img);
            document.body.appendChild(travel);

            let docked = false;
            let prevY = -1;
            let prevW = 0;
            let prevH = 0;

            const emitDockSplash = (host: HTMLElement) => {
              const splash = document.createElement("div");
              splash.className = "concept-tray-splash";
              let dots = '<b class="ring"></b>';
              for (let n = 0; n < 8; n++) {
                const angle = (n / 8) * Math.PI * 2 + Math.random() * 0.35;
                const dist = 22 + Math.random() * 20;
                dots += `<i style="--dx:${(Math.cos(angle) * dist).toFixed(1)}px;--dy:${(Math.sin(angle) * dist * 0.8).toFixed(1)}px;--s:${(3 + Math.random() * 2.5).toFixed(1)}px"></i>`;
              }
              splash.innerHTML = dots;
              host.appendChild(splash);
              window.setTimeout(() => splash.remove(), 860);
            };

            const tickFlight = () => {
              if (!document.body.contains(heroObj) || !document.body.contains(closingDock)) {
                return;
              }
              const syNow = window.scrollY;
              const vw = window.innerWidth;
              const docH = document.documentElement.scrollHeight;
              if (syNow === prevY && vw === prevW && docH === prevH && prevY > 0) return;
              prevY = syNow;
              prevW = vw;
              prevH = docH;

              const vh = window.innerHeight;
              const dockRect = closingDock.getBoundingClientRect();
              const heroRect = heroObj.getBoundingClientRect();
              const dockDocTop = syNow + dockRect.top;
              const maxScroll = Math.max(240, docH - vh);
              const endScroll = Math.max(
                200,
                Math.min(dockDocTop - vh * 0.86, maxScroll - 24)
              );
              const rawP = (syNow - 12) / endScroll;
              const p = Math.min(1, Math.max(0, rawP));

              if (p <= 0) {
                docked = false;
                if (travel.parentNode !== document.body) {
                  Object.assign(travel.style, { position: "", left: "", top: "" });
                  document.body.appendChild(travel);
                }
                travel.style.visibility = "hidden";
                heroObj.style.opacity = "";
                heroObj.style.visibility = "";
                return;
              }

              heroObj.style.opacity = "0";
              heroObj.style.visibility = "hidden";

              if (p >= 1) {
                if (travel.parentNode !== closingDock) {
                  Object.assign(travel.style, {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: "68px",
                    opacity: "1",
                    visibility: "visible",
                    transform: "translate(-50%, -50%) rotate(8deg)"
                  });
                  closingDock.appendChild(travel);
                }
                if (!docked) {
                  docked = true;
                  closingDock.classList.remove("is-bumped");
                  void closingDock.offsetWidth;
                  closingDock.classList.add("is-bumped");
                  emitDockSplash(closingDock);
                }
                return;
              }

              docked = false;
              if (travel.parentNode !== document.body) {
                Object.assign(travel.style, { position: "", left: "", top: "" });
                document.body.appendChild(travel);
              }

              const startW = heroObj.offsetWidth || Math.max(84, heroRect.width || 112);
              const endW = 68;
              const smoothP = p * p * (3 - 2 * p);
              const curW = startW + (endW - startW) * smoothP;

              const wStart = Math.max(0, 1 - p / 0.16);
              const wEnd = Math.max(0, (p - 0.82) / 0.18);
              const wMid = Math.max(0, 1 - wStart - wEnd);

              const sx = heroRect.left + heroRect.width / 2;
              const sy = heroRect.top + heroRect.height / 2;
              const ex = dockRect.left + dockRect.width / 2;
              const ey = dockRect.top + dockRect.height / 2;

              const midX =
                vw -
                curW * 0.65 -
                Math.max(16, (vw - Math.min(vw, 1440)) * 0.25 + 16) -
                Math.sin(p * Math.PI * 2) * Math.min(44, vw * 0.045);
              const midY =
                vh * (0.2 + p * 0.56) - Math.sin(p * Math.PI) * vh * 0.05;

              const cx = sx * wStart + midX * wMid + ex * wEnd;
              const cy =
                sy * wStart +
                midY * wMid +
                ey * wEnd -
                Math.sin(wEnd * Math.PI) * vh * 0.07;

              const dir = visual.length % 2 === 0 ? 1 : -1;
              const rot = dir * p * 360 + Math.sin(p * Math.PI * 3) * 14;

              travel.style.visibility = "visible";
              travel.style.opacity = Math.min(1, p * 9 + 0.35).toFixed(3);
              travel.style.width = `${curW.toFixed(1)}px`;
              travel.style.transform = `translate3d(${(cx - curW / 2).toFixed(1)}px, ${(cy - curW / 2).toFixed(1)}px, 0) rotate(${rot.toFixed(1)}deg)`;
            };

            gsap.ticker.add(tickFlight);
            cleanups.push(() => {
              gsap.ticker.remove(tickFlight);
              travel.remove();
              heroObj.style.opacity = "";
              heroObj.style.visibility = "";
              dockGhost?.removeAttribute("data-motion-dock");
              closingDock.classList.remove("is-bumped");
              closingDock
                .querySelectorAll(".concept-tray-splash")
                .forEach((node) => node.remove());
            });
          }
        }

        // 4. Numbered Stat Counters
        const counters = all("[data-count]").map((el) => ({
          el,
          original: el.textContent ?? ""
        }));
        counters.forEach(({ el, original }) => {
          const target = Number(original);
          if (!Number.isFinite(target)) return;
          const decimals = original.includes(".")
            ? (original.split(".")[1]?.length ?? 0)
            : 0;
          const padLength = !decimals && original.startsWith("0") ? original.length : 0;
          const display = { value: 0 };
          const inHero = Boolean(
            el.closest(
              ".glass-hero, .clay-hero, .cartoon-hero, .neu-hero, .brutal-hero, .luxury-hero, .retro-hero, .cyber-hero, .bento-hero, .immersive-hero"
            )
          );
          const tweenVars: gsap.TweenVars = {
            value: target,
            duration: 0.95,
            ease: "power2.out",
            snap: decimals ? { value: 1 / 10 ** decimals } : { value: 1 },
            onUpdate: () => {
              el.textContent = decimals
                ? display.value.toFixed(decimals)
                : String(Math.round(display.value)).padStart(padLength, "0");
            }
          };
          if (inHero) {
            hero.to(display, tweenVars, 0.18);
          } else {
            gsap.to(display, {
              ...tweenVars,
              scrollTrigger: { trigger: el, start: "top 92%", once: true }
            });
          }
        });

        // 5. Top-to-Bottom Section Headings, Staggered Reveals & Field Notes / Closing Choreography
        all("main > section h2").forEach((heading) => {
          if (heading.closest("[data-reveal]")) return;
          gsap.from(heading, {
            y: 20,
            duration: 0.62,
            ease: "power3.out",
            scrollTrigger: { trigger: heading, start: "top 92%", once: true }
          });
        });

        const reveal = revealMotion[visual];
        const groups = new Map<Element, HTMLElement[]>();
        all("[data-reveal]").forEach((element) => {
          const group = element.parentElement ?? element;
          const members = groups.get(group) ?? [];
          members.push(element);
          groups.set(group, members);
        });
        groups.forEach((elements, group) => {
          gsap.from(elements, {
            duration: 0.72,
            stagger: 0.08,
            ...reveal,
            scrollTrigger: { trigger: group, start: "top 92%", once: true }
          });
        });

        const storyPhoto = one(".concept-story-photo img");
        if (storyPhoto) {
          gsap.fromTo(
            storyPhoto,
            { scale: 1.08, yPercent: -3 },
            {
              scale: 1,
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: storyPhoto.parentElement ?? storyPhoto,
                start: "top 90%",
                end: "bottom top",
                scrub: 0.7
              }
            }
          );
        }

        const closingCard = one(".concept-closing");
        if (closingCard) {
          gsap.from(closingCard, {
            y: 28,
            scale: 0.97,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: closingCard, start: "top 90%", once: true }
          });
        }

        // Generic scroll-driven marquees, rotating stamps, editorial parallax, rule lines
        all("[data-marquee]").forEach((ticker, index) => {
          const direction = index % 2 === 0 ? -26 : 18;
          gsap.to(ticker, {
            xPercent: direction,
            ease: "none",
            scrollTrigger: {
              trigger: ticker.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.55
            }
          });
        });

        all("[data-spin]").forEach((stamp) => {
          gsap.to(stamp, {
            rotation: 42,
            ease: "none",
            scrollTrigger: { trigger: stamp, start: "top 92%", end: "bottom 20%", scrub: 0.9 }
          });
        });

        all("[data-parallax]").forEach((target) => {
          gsap.fromTo(
            target,
            { scale: 1.08, yPercent: -3 },
            {
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: target.parentElement ?? target,
                start: "top 85%",
                end: "bottom top",
                scrub: 0.7
              }
            }
          );
        });

        all("[data-rule]").forEach((rule) => {
          gsap.from(rule, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: rule, start: "top 92%", once: true }
          });
        });

        switch (visual) {
          case "glass": {
            const orbit = one(".glass-orbit");
            const halo = one(".glass-halo");
            if (orbit && halo) {
              hero.from(orbit, { rotation: -60, scale: 0.75, opacity: 0.25, duration: 1.4 }, 0.04);
              hero.from(halo, { scale: 0.66, opacity: 0.35, duration: 1.6 }, 0);
              gsap.to(orbit, {
                rotation: 24,
                scrollTrigger: { trigger: root, start: "top top", end: "+=600", scrub: 0.7 }
              });
            }
            const glass = all("[data-float]");
            if (glass.length) {
              hero.from(glass, { y: 24, rotation: -4, stagger: 0.14 }, 0.18);
              gsap.to(glass, {
                y: -10,
                duration: 2.2,
                ease: "sine.inOut",
                stagger: 0.22,
                yoyo: true,
                repeat: -1,
                delay: 1
              });
            }
            const depth = one("[data-depth]");
            if (conditions.pointer && depth) cleanups.push(pointerDepth(root, depth));
            const signalChange = (event: Event) => {
              if (!(event.target instanceof HTMLInputElement)) return;
              const panel = event.target
                .closest(".glass-matrix")
                ?.querySelector(".glass-signal-panel");
              if (panel)
                gsap.fromTo(
                  panel,
                  { y: 10, scale: 0.98 },
                  {
                    y: 0,
                    scale: 1,
                    duration: 0.42,
                    ease: "power3.out",
                    overwrite: true,
                    clearProps: "transform"
                  }
                );
            };
            root.addEventListener("change", signalChange);
            cleanups.push(() => root.removeEventListener("change", signalChange));
            break;
          }
          case "clay": {
            const clay = all("[data-float], .clay-notebook");
            if (clay.length) {
              hero.from(
                clay,
                {
                  y: 60,
                  scaleY: 0.68,
                  scaleX: 1.14,
                  ease: "elastic.out(1, .48)",
                  duration: 1.25,
                  stagger: 0.11
                },
                0
              );
            }
            const balls = all("[data-float]");
            if (balls.length) {
              gsap.to(balls, {
                y: -12,
                rotation: 4,
                duration: 1.9,
                yoyo: true,
                repeat: -1,
                stagger: 0.2,
                ease: "sine.inOut",
                delay: 1.2
              });
            }
            if (button) cleanups.push(springButton(button));
            const moodChange = (event: Event) => {
              if (!(event.target instanceof HTMLInputElement)) return;
              const preview = event.target
                .closest(".clay-moods")
                ?.querySelector(".clay-mood-stage");
              if (preview) {
                gsap.fromTo(
                  preview,
                  { scale: 0.95, y: 8 },
                  {
                    scale: 1,
                    y: 0,
                    duration: 0.55,
                    ease: "elastic.out(1, .55)",
                    overwrite: true,
                    clearProps: "transform"
                  }
                );
              }
            };
            root.addEventListener("change", moodChange);
            cleanups.push(() => root.removeEventListener("change", moodChange));
            break;
          }
          case "cartoon": {
            const mascot = one(".mascot");
            const lines = one(".mascot-zaps path");
            const bubble = one(".cartoon-bubble");
            if (lines)
              hero.fromTo(
                lines,
                { strokeDasharray: 100, strokeDashoffset: 100 },
                { strokeDashoffset: 0, duration: 1 },
                0.2
              );
            if (bubble)
              hero.from(
                bubble,
                { scale: 0.5, rotation: -10, ease: "back.out(2.4)", duration: 0.6 },
                0.26
              );
            if (mascot) {
              hero.from(
                mascot,
                {
                  rotation: -16,
                  scale: 0.74,
                  transformOrigin: "center center",
                  ease: "back.out(2.5)"
                },
                0
              );
              gsap.to(mascot, {
                rotation: 8,
                y: -11,
                scrollTrigger: {
                  trigger: ".cartoon-hero",
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.65
                }
              });
            }
            if (conditions.pointer) {
              all(".cartoon-flavors article, .cartoon-pack-card").forEach((card) => {
                const enter = () =>
                  gsap.to(card, {
                    y: -5,
                    rotation: -1.5,
                    duration: 0.25,
                    ease: "back.out(2)",
                    overwrite: "auto"
                  });
                const leave = () =>
                  gsap.to(card, {
                    y: 0,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto",
                    clearProps: "transform"
                  });
                card.addEventListener("pointerenter", enter);
                card.addEventListener("pointerleave", leave);
                cleanups.push(() => {
                  card.removeEventListener("pointerenter", enter);
                  card.removeEventListener("pointerleave", leave);
                });
              });
            }
            break;
          }
          case "neu": {
            const device = one(".neu-device");
            const led = one(".neu-led");
            const dial = one(".neu-dial i");
            if (device) hero.from(device, { scale: 0.8, rotation: -10, duration: 1.05 }, 0.05);
            if (led) {
              hero.from(
                led,
                { scale: 0.45, opacity: 0.3, duration: 0.38, yoyo: true, repeat: 1 },
                0.5
              );
              gsap.to(led, {
                opacity: 0.65,
                scale: 1.12,
                duration: 1.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1
              });
            }
            const eqBars = all(".neu-eq span");
            if (eqBars.length) {
              gsap.to(eqBars, {
                scaleY: 0.42,
                transformOrigin: "bottom center",
                duration: 0.75,
                stagger: { each: 0.12, repeat: -1, yoyo: true },
                ease: "sine.inOut"
              });
            }
            if (dial) {
              const press = (event: Event) => {
                if (!(event.target instanceof HTMLInputElement)) return;
                gsap.fromTo(
                  dial,
                  { scale: 0.86 },
                  {
                    scale: 1,
                    ease: "back.out(2)",
                    duration: 0.45,
                    overwrite: true,
                    clearProps: "transform"
                  }
                );
                if (led)
                  gsap.fromTo(
                    led,
                    { scale: 1.5 },
                    { scale: 1, duration: 0.5, overwrite: true, clearProps: "transform" }
                  );
              };
              root.addEventListener("change", press);
              cleanups.push(() => {
                root.removeEventListener("change", press);
                gsap.killTweensOf(dial);
                gsap.set(dial, { clearProps: "transform" });
                if (led) {
                  gsap.killTweensOf(led);
                  gsap.set(led, { clearProps: "transform" });
                }
              });
            }
            break;
          }
          case "brutal": {
            const poster = one(".brutal-photo");
            if (poster)
              hero.from(poster, { x: 34, scale: 0.92, rotation: 12, ease: "steps(6)" }, 0.09);
            if (conditions.pointer && button) cleanups.push(pointerDepth(button, button, 13));
            break;
          }
          case "retro": {
            const poster = one(".retro-poster");
            if (poster)
              hero.from(poster, { x: 30, scale: 0.92, rotation: -5, ease: "steps(6)" }, 0.09);
            const vinyl = one(".retro-vinyl-disc");
            if (vinyl)
              gsap.to(vinyl, { rotation: 360, duration: 16, ease: "none", repeat: -1 });
            break;
          }
          case "luxury": {
            const image = one(".luxury-image .concept-photo");
            const photo = one(".luxury-image img");
            if (image) hero.from(image, { clipPath: "inset(0 0 18% 0)", duration: 1.3 }, 0.03);
            if (photo && image) {
              gsap.fromTo(
                photo,
                { scale: 1.08, yPercent: -2 },
                {
                  yPercent: 2,
                  ease: "none",
                  scrollTrigger: { trigger: image, start: "top 72%", end: "bottom top", scrub: 0.65 }
                }
              );
            }
            break;
          }
          case "cyber": {
            const scan = one(".cyber-scan");
            const em = one("h1 em");
            if (scan)
              hero.fromTo(
                scan,
                { y: 0, opacity: 0.2 },
                { y: 240, opacity: 0.4, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1 },
                0.05
              );
            if (em) hero.from(em, { x: 11, skewX: 6, ease: "steps(4)", duration: 0.32 }, 0.06);
            all(".cyber-telemetry-bar [data-meter]").forEach((bar) => {
              gsap.from(bar, {
                scaleX: 0,
                duration: 0.85,
                ease: "steps(8)",
                scrollTrigger: { trigger: bar, start: "top 92%", once: true }
              });
            });
            const levelChange = (event: Event) => {
              if (!(event.target instanceof HTMLInputElement)) return;
              const meter = event.target.parentElement?.querySelector("[data-meter]");
              if (meter)
                gsap.fromTo(
                  meter,
                  { scaleX: 0 },
                  {
                    scaleX: 1,
                    duration: 0.55,
                    ease: "steps(8)",
                    overwrite: true,
                    clearProps: "transform"
                  }
                );
            };
            root.addEventListener("change", levelChange);
            cleanups.push(() => {
              root.removeEventListener("change", levelChange);
              const meters = all("[data-meter]");
              gsap.killTweensOf(meters);
              gsap.set(meters, { clearProps: "transform" });
            });
            break;
          }
          case "bento": {
            hero.from(
              all(".bento-collage > *"),
              { y: 28, scale: 0.92, stagger: 0.12, ease: "back.out(1.4)" },
              0.04
            );
            all("[data-meter]").forEach((progress) => {
              gsap.from(progress, {
                scaleX: 0,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: { trigger: progress, start: "top 92%", once: true }
              });
            });
            const descriptions = all(".bento-features details > p");
            const expand = (event: Event) => {
              if (
                !(event.target instanceof HTMLDetailsElement) ||
                !event.target.closest(".bento-features")
              )
                return;
              const description = event.target.querySelector("p");
              if (description && event.target.open) {
                gsap.fromTo(
                  description,
                  { height: 0, y: -6 },
                  {
                    height: "auto",
                    y: 0,
                    ease: "power2.out",
                    duration: 0.32,
                    overwrite: true,
                    clearProps: "height,transform",
                    onComplete: () => ScrollTrigger.refresh()
                  }
                );
              } else {
                ScrollTrigger.refresh();
              }
            };
            root.addEventListener("toggle", expand, true);
            cleanups.push(() => {
              root.removeEventListener("toggle", expand, true);
              gsap.killTweensOf(descriptions);
              gsap.set(descriptions, { clearProps: "height,transform" });
            });
            break;
          }
          case "immersive": {
            const photo = one(".immersive-hero img");
            const stage = one(".product-stage");
            if (photo) hero.from(photo, { scale: 1.1, xPercent: 3, duration: 1.2 }, 0);
            if (stage) {
              gsap.from(stage, {
                scale: 0.92,
                y: 25,
                ease: "none",
                scrollTrigger: {
                  trigger: stage,
                  start: "top bottom",
                  end: "center 60%",
                  scrub: 0.8
                }
              });
            }
            const waveBars = all(".immersive-wave span");
            if (waveBars.length) {
              gsap.to(waveBars, {
                scaleY: 0.35,
                transformOrigin: "center",
                duration: 0.65,
                stagger: { each: 0.09, repeat: -1, yoyo: true },
                ease: "sine.inOut"
              });
            }
            break;
          }
        }

        return () => {
          root.removeAttribute("data-animation-ready");
          counters.forEach(({ el, original }) => {
            el.textContent = original;
          });
          cleanups.forEach((fn) => fn());
        };
      },
      root
    );
  }, root);
  return () => {
    media.revert();
    context.revert();
  };
}

function pointerDepth(area: HTMLElement, target: HTMLElement, distance = 22) {
  const x = gsap.quickTo(target, "x", { duration: 0.42, ease: "power3" });
  const y = gsap.quickTo(target, "y", { duration: 0.42, ease: "power3" });
  const move = (event: PointerEvent) => {
    const bounds = area.getBoundingClientRect();
    x(((event.clientX - bounds.left) / bounds.width - 0.5) * distance);
    y(((event.clientY - bounds.top) / bounds.height - 0.5) * distance);
  };
  const reset = () => {
    x(0);
    y(0);
  };
  area.addEventListener("pointermove", move);
  area.addEventListener("pointerleave", reset);
  return () => {
    area.removeEventListener("pointermove", move);
    area.removeEventListener("pointerleave", reset);
    x.tween.kill();
    y.tween.kill();
  };
}

function springButton(button: HTMLElement) {
  const enter = () =>
    gsap.to(button, {
      scaleX: 1.06,
      scaleY: 0.96,
      duration: 0.3,
      ease: "back.out(3)",
      overwrite: "auto"
    });
  const leave = () =>
    gsap.to(button, {
      scaleX: 1,
      scaleY: 1,
      duration: 0.35,
      ease: "elastic.out(1, .5)",
      overwrite: "auto",
      clearProps: "transform"
    });
  button.addEventListener("pointerenter", enter);
  button.addEventListener("pointerleave", leave);
  return () => {
    button.removeEventListener("pointerenter", enter);
    button.removeEventListener("pointerleave", leave);
    gsap.killTweensOf(button);
    gsap.set(button, { clearProps: "transform" });
  };
}
