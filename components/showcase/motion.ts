import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Theme } from "@/data/showcase";

gsap.registerPlugin(ScrollTrigger);

const revealMotion: Record<Theme["visual"], gsap.TweenVars> = {
  glass: { y: 34, scale: .96, ease: "power3.out" },
  clay: { y: 26, scaleX: .86, scaleY: 1.08, ease: "elastic.out(1, .55)" },
  cartoon: { rotation: -6, y: 22, scale: .91, ease: "back.out(2.1)" },
  neu: { scale: .94, y: 18, ease: "power2.out" },
  brutal: { x: -16, skewX: -3, ease: "steps(5)" },
  luxury: { clipPath: "inset(12% 0 14% 0)", y: 22, ease: "power3.out" },
  retro: { rotation: 2.5, y: 24, ease: "steps(5)" },
  cyber: { clipPath: "inset(0 22% 0 0)", x: 16, ease: "steps(6)" },
  bento: { scale: .92, y: 22, transformOrigin: "left bottom", ease: "back.out(1.2)" },
  immersive: { y: 28, scale: .97, ease: "power3.out" }
};

export function animateConcept(root: HTMLElement, visual: Theme["visual"]) {
  const media = gsap.matchMedia();
  const context = gsap.context(() => {
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      pointer: "(pointer: fine) and (min-width: 768px)"
    }, ({ conditions }) => {
      if (!conditions?.motion) return;
      const cleanups: (() => void)[] = [];
      const one = <T extends Element = HTMLElement>(selector: string) => root.querySelector<T>(selector);
      const all = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));

      root.setAttribute("data-animation-ready", "true");
      const title = one("h1");
      const kicker = one(".hero-copy .concept-kicker");
      const button = one(".hero-copy .concept-button");
      const hero = gsap.timeline({ defaults: { duration: .8, ease: "power3.out" } });
      if (title) hero.from(title, { y: 22, opacity: .62 }, 0);
      if (kicker) hero.from(kicker, { x: -16, duration: .52 }, 0);
      if (button) hero.from(button, { y: 12, scale: .96, duration: .52 }, .14);

      const counters = all("[data-count]").map((el) => ({ el, original: el.textContent ?? "" }));
      counters.forEach(({ el, original }) => {
        const target = Number(original);
        if (!Number.isFinite(target)) return;
        const decimals = original.includes(".") ? (original.split(".")[1]?.length ?? 0) : 0;
        const padLength = !decimals && original.startsWith("0") ? original.length : 0;
        const display = { value: 0 };
        const inHero = Boolean(el.closest(".glass-hero, .clay-hero, .cartoon-hero, .neu-hero, .brutal-hero, .luxury-hero, .retro-hero, .cyber-hero, .bento-hero, .immersive-hero"));
        const tweenVars: gsap.TweenVars = {
          value: target,
          duration: .95,
          ease: "power2.out",
          snap: decimals ? { value: 1 / 10 ** decimals } : { value: 1 },
          onUpdate: () => {
            el.textContent = decimals
              ? display.value.toFixed(decimals)
              : String(Math.round(display.value)).padStart(padLength, "0");
          }
        };
        if (inHero) {
          hero.to(display, tweenVars, .18);
        } else {
          gsap.to(display, {
            ...tweenVars,
            scrollTrigger: { trigger: el, start: "top 92%", once: true }
          });
        }
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
          duration: .72,
          stagger: .08,
          ...reveal,
          scrollTrigger: { trigger: group, start: "top 92%", once: true }
        });
      });

      // Generic scroll-driven marquees, rotating stamps, editorial parallax, rule lines
      all("[data-marquee]").forEach((ticker, index) => {
        const direction = index % 2 === 0 ? -26 : 18;
        gsap.to(ticker, {
          xPercent: direction,
          ease: "none",
          scrollTrigger: { trigger: ticker.parentElement, start: "top bottom", end: "bottom top", scrub: .55 }
        });
      });

      all("[data-spin]").forEach((stamp) => {
        gsap.to(stamp, {
          rotation: 42,
          ease: "none",
          scrollTrigger: { trigger: stamp, start: "top 92%", end: "bottom 20%", scrub: .9 }
        });
      });

      all("[data-parallax]").forEach((target) => {
        gsap.fromTo(target, { scale: 1.08, yPercent: -3 }, {
          yPercent: 3,
          ease: "none",
          scrollTrigger: { trigger: target.parentElement ?? target, start: "top 85%", end: "bottom top", scrub: .7 }
        });
      });

      all("[data-rule]").forEach((rule) => {
        gsap.from(rule, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: .75,
          ease: "power3.out",
          scrollTrigger: { trigger: rule, start: "top 92%", once: true }
        });
      });

      switch (visual) {
        case "glass": {
          const orbit = one(".glass-orbit");
          const halo = one(".glass-halo");
          if (orbit && halo) {
            hero.from(orbit, { rotation: -60, scale: .75, opacity: .25, duration: 1.4 }, .04);
            hero.from(halo, { scale: .66, opacity: .35, duration: 1.6 }, 0);
            gsap.to(orbit, { rotation: 24, scrollTrigger: { trigger: root, start: "top top", end: "+=600", scrub: .7 } });
          }
          const glass = all("[data-float]");
          if (glass.length) {
            hero.from(glass, { y: 24, rotation: -4, stagger: .14 }, .18);
            gsap.to(glass, { y: -10, duration: 2.2, ease: "sine.inOut", stagger: .22, yoyo: true, repeat: -1, delay: 1 });
          }
          const depth = one("[data-depth]");
          if (conditions.pointer && depth) cleanups.push(pointerDepth(root, depth));
          const signalChange = (event: Event) => {
            if (!(event.target instanceof HTMLInputElement)) return;
            const panel = event.target.closest(".glass-matrix")?.querySelector(".glass-signal-panel");
            if (panel) gsap.fromTo(panel, { y: 10, scale: .98 }, { y: 0, scale: 1, duration: .42, ease: "power3.out", overwrite: true, clearProps: "transform" });
          };
          root.addEventListener("change", signalChange);
          cleanups.push(() => root.removeEventListener("change", signalChange));
          break;
        }
        case "clay": {
          const clay = all("[data-float], .clay-notebook");
          if (clay.length) {
            hero.from(clay, { y: 60, scaleY: .68, scaleX: 1.14, ease: "elastic.out(1, .48)", duration: 1.25, stagger: .11 }, 0);
          }
          const balls = all("[data-float]");
          if (balls.length) {
            gsap.to(balls, { y: -12, rotation: 4, duration: 1.9, yoyo: true, repeat: -1, stagger: .2, ease: "sine.inOut", delay: 1.2 });
          }
          if (button) cleanups.push(springButton(button));
          const moodChange = (event: Event) => {
            if (!(event.target instanceof HTMLInputElement)) return;
            const preview = event.target.closest(".clay-moods")?.querySelector(".clay-mood-stage");
            if (preview) {
              gsap.fromTo(preview, { scale: .95, y: 8 }, { scale: 1, y: 0, duration: .55, ease: "elastic.out(1, .55)", overwrite: true, clearProps: "transform" });
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
          if (lines) hero.fromTo(lines, { strokeDasharray: 100, strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 1 }, .2);
          if (bubble) hero.from(bubble, { scale: .5, rotation: -10, ease: "back.out(2.4)", duration: .6 }, .26);
          if (mascot) {
            hero.from(mascot, { rotation: -16, scale: .74, transformOrigin: "center center", ease: "back.out(2.5)" }, 0);
            gsap.to(mascot, { rotation: 8, y: -11, scrollTrigger: { trigger: ".cartoon-hero", start: "top top", end: "bottom top", scrub: .65 } });
          }
          if (conditions.pointer) {
            all(".cartoon-flavors article, .cartoon-pack-card").forEach((card) => {
              const enter = () => gsap.to(card, { y: -5, rotation: -1.5, duration: .25, ease: "back.out(2)", overwrite: "auto" });
              const leave = () => gsap.to(card, { y: 0, rotation: 0, duration: .3, ease: "power2.out", overwrite: "auto", clearProps: "transform" });
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
          if (device) hero.from(device, { scale: .8, rotation: -10, duration: 1.05 }, .05);
          if (led) {
            hero.from(led, { scale: .45, opacity: .3, duration: .38, yoyo: true, repeat: 1 }, .5);
            gsap.to(led, { opacity: .65, scale: 1.12, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
          }
          const eqBars = all(".neu-eq span");
          if (eqBars.length) {
            gsap.to(eqBars, { scaleY: .42, transformOrigin: "bottom center", duration: .75, stagger: { each: .12, repeat: -1, yoyo: true }, ease: "sine.inOut" });
          }
          if (dial) {
            const press = (event: Event) => {
              if (!(event.target instanceof HTMLInputElement)) return;
              gsap.fromTo(dial, { scale: .86 }, { scale: 1, ease: "back.out(2)", duration: .45, overwrite: true, clearProps: "transform" });
              if (led) gsap.fromTo(led, { scale: 1.5 }, { scale: 1, duration: .5, overwrite: true, clearProps: "transform" });
            };
            root.addEventListener("change", press);
            cleanups.push(() => {
              root.removeEventListener("change", press);
              gsap.killTweensOf(dial);
              gsap.set(dial, { clearProps: "transform" });
              if (led) { gsap.killTweensOf(led); gsap.set(led, { clearProps: "transform" }); }
            });
          }
          break;
        }
        case "brutal": {
          const poster = one(".brutal-photo");
          if (poster) hero.from(poster, { x: 34, scale: .92, rotation: 12, ease: "steps(6)" }, .09);
          if (conditions.pointer && button) cleanups.push(pointerDepth(button, button, 13));
          break;
        }
        case "retro": {
          const poster = one(".retro-poster");
          if (poster) hero.from(poster, { x: 30, scale: .92, rotation: -5, ease: "steps(6)" }, .09);
          const vinyl = one(".retro-vinyl-disc");
          if (vinyl) gsap.to(vinyl, { rotation: 360, duration: 16, ease: "none", repeat: -1 });
          break;
        }
        case "luxury": {
          const image = one(".luxury-image .concept-photo");
          const photo = one(".luxury-image img");
          if (image) hero.from(image, { clipPath: "inset(0 0 18% 0)", duration: 1.3 }, .03);
          if (photo && image) {
            gsap.fromTo(photo, { scale: 1.08, yPercent: -2 }, {
              yPercent: 2,
              ease: "none",
              scrollTrigger: { trigger: image, start: "top 72%", end: "bottom top", scrub: .65 }
            });
          }
          break;
        }
        case "cyber": {
          const scan = one(".cyber-scan");
          const em = one("h1 em");
          if (scan) hero.fromTo(scan, { y: 0, opacity: .2 }, { y: 240, opacity: .4, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1 }, .05);
          if (em) hero.from(em, { x: 11, skewX: 6, ease: "steps(4)", duration: .32 }, .06);
          all(".cyber-telemetry-bar [data-meter]").forEach((bar) => {
            gsap.from(bar, { scaleX: 0, duration: .85, ease: "steps(8)", scrollTrigger: { trigger: bar, start: "top 92%", once: true } });
          });
          const levelChange = (event: Event) => {
            if (!(event.target instanceof HTMLInputElement)) return;
            const meter = event.target.parentElement?.querySelector("[data-meter]");
            if (meter) gsap.fromTo(meter, { scaleX: 0 }, { scaleX: 1, duration: .55, ease: "steps(8)", overwrite: true, clearProps: "transform" });
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
          hero.from(all(".bento-collage > *"), { y: 28, scale: .92, stagger: .12, ease: "back.out(1.4)" }, .04);
          all("[data-meter]").forEach((progress) => {
            gsap.from(progress, { scaleX: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: progress, start: "top 92%", once: true } });
          });
          const descriptions = all(".bento-features details > p");
          const expand = (event: Event) => {
            if (!(event.target instanceof HTMLDetailsElement) || !event.target.closest(".bento-features")) return;
            const description = event.target.querySelector("p");
            if (description && event.target.open) {
              gsap.fromTo(description, { height: 0, y: -6 }, {
                height: "auto",
                y: 0,
                ease: "power2.out",
                duration: .32,
                overwrite: true,
                clearProps: "height,transform",
                onComplete: () => ScrollTrigger.refresh()
              });
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
              scale: .92,
              y: 25,
              ease: "none",
              scrollTrigger: { trigger: stage, start: "top bottom", end: "center 60%", scrub: .8 }
            });
          }
          const waveBars = all(".immersive-wave span");
          if (waveBars.length) {
            gsap.to(waveBars, { scaleY: .35, transformOrigin: "center", duration: .65, stagger: { each: .09, repeat: -1, yoyo: true }, ease: "sine.inOut" });
          }
          break;
        }
      }

      return () => {
        root.removeAttribute("data-animation-ready");
        counters.forEach(({ el, original }) => { el.textContent = original; });
        cleanups.forEach((fn) => fn());
      };
    }, root);
  }, root);
  return () => { media.revert(); context.revert(); };
}

function pointerDepth(area: HTMLElement, target: HTMLElement, distance = 22) {
  const x = gsap.quickTo(target, "x", { duration: .42, ease: "power3" });
  const y = gsap.quickTo(target, "y", { duration: .42, ease: "power3" });
  const move = (event: PointerEvent) => {
    const bounds = area.getBoundingClientRect();
    x(((event.clientX - bounds.left) / bounds.width - .5) * distance);
    y(((event.clientY - bounds.top) / bounds.height - .5) * distance);
  };
  const reset = () => { x(0); y(0); };
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
  const enter = () => gsap.to(button, { scaleX: 1.06, scaleY: .96, duration: .3, ease: "back.out(3)", overwrite: "auto" });
  const leave = () => gsap.to(button, { scaleX: 1, scaleY: 1, duration: .35, ease: "elastic.out(1, .5)", overwrite: "auto", clearProps: "transform" });
  button.addEventListener("pointerenter", enter);
  button.addEventListener("pointerleave", leave);
  return () => {
    button.removeEventListener("pointerenter", enter);
    button.removeEventListener("pointerleave", leave);
    gsap.killTweensOf(button);
    gsap.set(button, { clearProps: "transform" });
  };
}
