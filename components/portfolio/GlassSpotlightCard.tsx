"use client";

import type { ReactNode } from "react";

export function GlassSpotlightCard({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--spot-x", `${x.toFixed(1)}%`);
    e.currentTarget.style.setProperty("--spot-y", `${y.toFixed(1)}%`);
  };

  return (
    <div
      onPointerMove={onPointerMove}
      className={`glass-panel glass-spotlight rounded-3xl ${className}`}
    >
      {children}
    </div>
  );
}
