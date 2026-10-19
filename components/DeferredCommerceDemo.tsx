"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const CommerceDemo = dynamic(
  () =>
    import("@/components/InteractiveCommerce3D").then(
      (module) => module.InteractiveCommerce3D,
    ),
  {
    ssr: false,
    loading: () => <DemoPlaceholder />,
  },
);
function DemoPlaceholder() {
  return (
    <div
      className="flex min-h-[860px] items-center justify-center bg-slate-950 px-5 text-center text-sm font-semibold text-slate-300 lg:min-h-[680px]"
      role="status"
    >
      Interactive commerce demo loading · Illustrative Metrics
    </div>
  );
}
export function DeferredCommerceDemo() {
  const target = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const node = target.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div id="commerce-demo" ref={target} className="commerce-demo-slot">
      {ready ? <CommerceDemo /> : <DemoPlaceholder />}
      <noscript>
        <p className="bg-slate-950 px-5 py-5 text-center text-white">
          Enable JavaScript to explore the interactive 3D demo. All demo figures
          are illustrative.
        </p>
      </noscript>
    </div>
  );
}
