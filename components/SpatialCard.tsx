"use client";

import { useEffect, useRef } from "react";

type SpatialCardProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glow?: string;
};

export function SpatialCard({
  children,
  className = "",
  intensity = 7,
  glow = "34, 211, 238"
}: SpatialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      card.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) card.dataset.visible = "true";
      },
      { threshold: 0.14 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (x - 0.5) * intensity * 2;
    const rotateX = (0.5 - y) * intensity * 2;

    event.currentTarget.style.setProperty("--spatial-rotate-x", `${rotateX.toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--spatial-rotate-y", `${rotateY.toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--spatial-glow-x", `${(x * 100).toFixed(1)}%`);
    event.currentTarget.style.setProperty("--spatial-glow-y", `${(y * 100).toFixed(1)}%`);
  };

  const reset = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--spatial-rotate-x", "0deg");
    event.currentTarget.style.setProperty("--spatial-rotate-y", "0deg");
    event.currentTarget.style.setProperty("--spatial-glow-x", "50%");
    event.currentTarget.style.setProperty("--spatial-glow-y", "50%");
  };

  return (
    <div className="spatial-card-wrap">
      <div
        ref={cardRef}
        className={`spatial-card ${className}`}
        style={{ "--spatial-glow": glow } as React.CSSProperties}
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
      >
        <span className="spatial-card-glow" aria-hidden="true" />
        <span className="spatial-card-edge" aria-hidden="true" />
        <div className="spatial-card-content">{children}</div>
      </div>
    </div>
  );
}
