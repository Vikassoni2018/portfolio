import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupGallery(root: HTMLElement) {
  const media = gsap.matchMedia();
  let animateFilter: ((grid: HTMLDivElement) => void) | undefined;
  let filterTween: gsap.core.Tween | undefined;
  media.add("(prefers-reduced-motion: no-preference)", () => {
    const tiles = root.querySelectorAll(".showcase-collage-tile");
    const cards = root.querySelector(".showcase-cards");
    gsap.from(tiles, { opacity: .5, y: 30, scale: .97, duration: 1, stagger: .1, ease: "power3.out" });
    if (cards) gsap.from(cards, { y: 18, duration: .65,
      scrollTrigger: { trigger: cards, start: "top 93%", once: true } });
    animateFilter = (grid) => {
      filterTween?.revert();
      filterTween = gsap.from(grid.children, { y: 14, duration: .35, stagger: .045,
        ease: "power2.out", clearProps: "transform" });
    };
    return () => { animateFilter = undefined; filterTween?.revert(); };
  }, root);
  return {
    filter: (grid: HTMLDivElement) => animateFilter?.(grid),
    dispose: () => media.revert()
  };
}

