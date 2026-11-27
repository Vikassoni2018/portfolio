"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PortfolioData } from "@/lib/types";
import { PublicNavbar } from "@/components/PublicNavbar";
import { DeferredCommerceDemo } from "@/components/DeferredCommerceDemo";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { ProjectsCarouselSection } from "@/components/portfolio/ProjectsCarouselSection";
import { FlagshipSpotlightSection } from "@/components/portfolio/FlagshipSpotlightSection";
import { SkillsHorizontalSection } from "@/components/portfolio/SkillsHorizontalSection";
import { InteractiveExpertiseSection } from "@/components/portfolio/InteractiveExpertiseSection";
import { PinnedServicesSection } from "@/components/portfolio/PinnedServicesSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { ProjectsShowcaseSection } from "@/components/portfolio/ProjectsShowcaseSection";
import { FaqSection } from "@/components/portfolio/FaqSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { FooterSection } from "@/components/portfolio/FooterSection";
import { ObjectFlightController } from "@/components/portfolio/ObjectFlightController";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioPage({ data }: { data: PortfolioData }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.dispatchEvent(new Event("portfolio:sections-ready"));

    if (prefersReduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      // Section header 3D lift reveals matching fsf-animations.js choreography
      gsap.utils.toArray<HTMLElement>("[data-gsap='section-header']").forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          rotationX: -12,
          transformOrigin: "50% 100%",
          duration: 0.55,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true
          }
        });
      });

      // Grid / bento stagger reveals
      gsap.utils.toArray<HTMLElement>("[data-gsap='stagger-grid']").forEach((grid) => {
        const cards = Array.from(grid.children);
        if (!cards.length) return;
        gsap.from(cards, {
          y: 22,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: grid,
            start: "top 90%",
            once: true
          }
        });
      });

      // Experience vertical progress spine
      const spine = document.querySelector<HTMLElement>("[data-gsap='timeline-spine']");
      const timelineWrap = document.getElementById("experience");
      if (spine && timelineWrap) {
        gsap.to(spine, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineWrap,
            start: "top 68%",
            end: "bottom 65%",
            scrub: 0.6
          }
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-gsap='timeline-item']").forEach((item) => {
        gsap.from(item, {
          y: 26,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: item,
            start: "top 86%",
            once: true
          }
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-gsap='project-stage-card']").forEach((card) => {
          const mockup = card.querySelector(".device-tilt-card");
          if (!mockup) return;
          gsap.fromTo(
            mockup,
            { rotateY: -9, rotateX: 4, y: 16 },
            {
              rotateY: 0,
              rotateX: 0,
              y: -8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "center 42%",
                scrub: 0.8
              }
            }
          );
        });
      });

      ScrollTrigger.refresh();
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative z-10 min-h-screen text-[#0F172A]">
      <PublicNavbar />
      <ObjectFlightController />

      {/* overflow-x-clip keeps position:sticky active on Hero, Horizontal Skills & Pinned Services */}
      <main id="main-content" className="overflow-x-clip">
        <HeroSection profile={data.profile} />
        <ProjectsCarouselSection projects={data.projects} />
        <FlagshipSpotlightSection />
        <SkillsHorizontalSection skills={data.skills} />
        <InteractiveExpertiseSection />
        <PinnedServicesSection />
        <AboutSection profile={data.profile} education={data.education} />
        <ExperienceSection experience={data.experience} />
        <DeferredCommerceDemo />
        <ProjectsShowcaseSection projects={data.projects} />
        <FaqSection />
        <ContactSection profile={data.profile} />
      </main>

      <FooterSection profile={data.profile} />
    </div>
  );
}
