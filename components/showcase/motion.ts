import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Theme } from "@/data/showcase";

gsap.registerPlugin(ScrollTrigger);

const revealMotion: Record<Theme["visual"], gsap.TweenVars> = {
  glass: { y: 38, scale: .96 },
  clay: { y: 24, scaleX: .84, scaleY: 1.1, ease: "elastic.out(1, .55)" },
  cartoon: { rotation: -8, scale: .9, ease: "back.out(2.1)" },
  neu: { scale: .94 },
  brutal: { x: -16, skewX: -3, ease: "steps(5)" },
  luxury: { clipPath: "inset(12% 0 14% 0)", y: 22 },
  retro: { rotation: 3, y: 25, ease: "steps(5)" },
  cyber: { clipPath: "inset(0 24% 0 0)", x: 18 },
  bento: { scale: .91, y: 24, transformOrigin: "left bottom" },
  immersive: { y: 28, scale: .97 }
};

export function animateConcept(root: HTMLElement, visual: Theme["visual"]) {
  const media = gsap.matchMedia();
  const context = gsap.context(() => {
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      pointer: "(pointer: fine) and (min-width: 768px)"
    }, ({ conditions }) => {
      if (!conditions?.motion) return;
      let cleanupInteraction: (() => void) | undefined;
      const one = <T extends Element = HTMLElement>(selector: string) => root.querySelector<T>(selector);
      const all = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));

      root.setAttribute("data-animation-ready", "true");
      const title = one("h1");
      const kicker = one(".hero-copy .concept-kicker");
      const button = one(".hero-copy .concept-button");
      const counter = one("[data-count]");
      const counterValue = counter?.textContent;
      const hero = gsap.timeline({ defaults: { duration: .8, ease: "power3.out" } });
      if (title) hero.from(title, { y: 21, opacity: .58 }, 0);
      if (kicker) hero.from(kicker, { x: -15, duration: .5 }, 0);
      if (button) hero.from(button, { y: 12, scale: .96, duration: .5 }, .13);
      if (counter && counterValue) {
        const display = { value: 0 };
        hero.to(display, {
          value: Number(counterValue), snap: { value: 1 }, duration: .85,
          onUpdate: () => { counter.textContent = String(display.value).padStart(counterValue.length, "0"); }
        }, .2);
      }

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
          duration: .74, ease: "power3.out", stagger: .09, ...reveal,
          scrollTrigger: { trigger: group, start: "top 92%", once: true }
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
          hero.from(glass, { y: 24, rotation: -5, stagger: .16 }, .18);
          gsap.to(glass, { y: -11, duration: 1.85, ease: "sine.inOut", stagger: .19, yoyo: true, repeat: 1, delay: 1 });
          const depth = one("[data-depth]");
          if (conditions.pointer && depth) cleanupInteraction = pointerDepth(root, depth);
          break;
        }
        case "clay": {
          const clay = all("[data-float], .clay-notebook");
          hero.from(clay, { y: 65, scaleY: .66, scaleX: 1.15, ease: "elastic.out(1, .48)", duration: 1.3, stagger: .12 }, 0);
          const balls = all("[data-float]");
          gsap.to(balls, { y: -13, duration: 1.45, yoyo: true, repeat: 1, stagger: .16, ease: "sine.inOut", delay: 1.3 });
          if (button) cleanupInteraction = springButton(button);
          break;
        }
        case "cartoon": {
          const mascot = one(".mascot");
          const lines = one(".mascot-zaps path");
          if (lines) hero.fromTo(lines, { strokeDasharray: 100, strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 1 }, .22);
          if (mascot) {
            hero.from(mascot, { rotation: -16, scale: .73, transformOrigin: "center center", ease: "back.out(2.5)" }, 0);
            gsap.to(mascot, { rotation: 8, y: -11, scrollTrigger: { trigger: ".cartoon-hero", start: "top top", end: "bottom top", scrub: .65 } });
          }
          break;
        }
        case "neu": {
          const device = one(".neu-device");
          const led = one(".neu-led");
          const dial = one(".neu-dial i");
          if (device) hero.from(device, { scale: .79, rotation: -12, duration: 1.1 }, .05);
          if (led) hero.from(led, { scale: .45, opacity: .3, duration: .38, yoyo: true, repeat: 1 }, .55);
          if (dial) {
            const press = (event: Event) => {
              if (!(event.target instanceof HTMLInputElement)) return;
              gsap.fromTo(dial, { scale: .86 }, { scale: 1, ease: "back.out(2)", duration: .45, overwrite: true, clearProps: "transform" });
              if (led) gsap.fromTo(led, { scale: 1.5 }, { scale: 1, duration: .5, overwrite: true, clearProps: "transform" });
            };
            root.addEventListener("change", press);
            cleanupInteraction = () => {
              root.removeEventListener("change", press);
              gsap.killTweensOf(dial);
              gsap.set(dial, { clearProps: "transform" });
              if (led) { gsap.killTweensOf(led); gsap.set(led, { clearProps: "transform" }); }
            };
          }
          break;
        }
        case "brutal":
        case "retro": {
          const ticker = one("[data-marquee]");
          if (ticker) gsap.to(ticker, { xPercent: visual === "brutal" ? -29 : -22, ease: "none",
            scrollTrigger: { trigger: ticker.parentElement, start: "top bottom", end: "bottom top", scrub: .6 } });
          const poster = one(visual === "brutal" ? ".brutal-photo" : ".retro-poster");
          if (poster) hero.from(poster, { x: 34, scale: .92, rotation: visual === "brutal" ? 12 : -5, ease: "steps(6)" }, .09);
          const stamp = one("[data-spin]");
          if (stamp) gsap.to(stamp, { rotation: 33, scrollTrigger: { trigger: stamp, start: "top 90%", end: "bottom 25%", scrub: 1 } });
          if (visual === "brutal" && conditions.pointer && button) cleanupInteraction = pointerDepth(button, button, 13);
          break;
        }
        case "luxury": {
          const image = one(".luxury-image .concept-photo");
          const photo = one(".luxury-image img");
          if (image) hero.from(image, { clipPath: "inset(0 0 18% 0)", duration: 1.3 }, .03);
          if (photo && image) {
            gsap.fromTo(photo, { scale: 1.08, yPercent: -2 }, { yPercent: 2, ease: "none",
              scrollTrigger: { trigger: image, start: "top 72%", end: "bottom top", scrub: .65 } });
          }
          break;
        }
        case "cyber": {
          const scan = one(".cyber-scan");
          const em = one("h1 em");
          if (scan) hero.fromTo(scan, { y: 0, opacity: .2 }, { y: 220, opacity: .38, duration: 1.9, ease: "sine.inOut" }, .05);
          if (em) hero.from(em, { x: 11, skewX: 6, ease: "steps(4)", duration: .32 }, .06);
          const levelChange = (event: Event) => {
            if (!(event.target instanceof HTMLInputElement)) return;
            const meter = event.target.parentElement?.querySelector("[data-meter]");
            if (meter) gsap.fromTo(meter, { scaleX: 0 }, { scaleX: 1, duration: .55, ease: "steps(8)", overwrite: true, clearProps: "transform" });
          };
          root.addEventListener("change", levelChange);
          cleanupInteraction = () => {
            root.removeEventListener("change", levelChange);
            const meters = all("[data-meter]");
            gsap.killTweensOf(meters);
            gsap.set(meters, { clearProps: "transform" });
          };
          break;
        }
        case "bento": {
          hero.from(all(".bento-collage > *"), { y: 28, scale: .92, stagger: .12, ease: "back.out(1.4)" }, .04);
          const progress = one("[data-meter]");
          if (progress) gsap.from(progress, { scaleX: 0, duration: 1.15,
            scrollTrigger: { trigger: progress, start: "top 91%", once: true } });
          const descriptions = all(".bento-features details > p");
          const expand = (event: Event) => {
            if (!(event.target instanceof HTMLDetailsElement) || !event.target.closest(".bento-features")) return;
            const description = event.target.querySelector("p");
            if (description && event.target.open) {
              gsap.fromTo(description, { height: 0, y: -6 }, {
                height: "auto", y: 0, ease: "power2.out", duration: .32,
                overwrite: true, clearProps: "height,transform", onComplete: () => ScrollTrigger.refresh()
              });
            } else {
              ScrollTrigger.refresh();
            }
          };
          root.addEventListener("toggle", expand, true);
          cleanupInteraction = () => {
            root.removeEventListener("toggle", expand, true);
            gsap.killTweensOf(descriptions);
            gsap.set(descriptions, { clearProps: "height,transform" });
          };
          break;
        }
        case "immersive": {
          const photo = one(".immersive-hero img");
          const stage = one(".product-stage");
          if (photo) hero.from(photo, { scale: 1.1, xPercent: 3, duration: 1.2 }, 0);
          if (stage) gsap.from(stage, { scale: .92, y: 25, ease: "none",
            scrollTrigger: { trigger: stage, start: "top bottom", end: "center 60%", scrub: .8 } });
          break;
        }
      }
      return () => {
        root.removeAttribute("data-animation-ready");
        if (counter && counterValue) counter.textContent = counterValue;
        cleanupInteraction?.();
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

