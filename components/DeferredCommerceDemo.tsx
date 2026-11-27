"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const CommerceDemo = dynamic(
  () =>
    import("@/components/InteractiveCommerce3D").then(
      (module) => module.InteractiveCommerce3D
    ),
  {
    ssr: false,
    loading: () => <DemoPlaceholder />
  }
);

function DemoPlaceholder() {
  return (
    <div
      className="flex min-h-[680px] items-center justify-center bg-gradient-to-b from-[#F8FAFC] via-[#EEF2FF] to-[#F5F3FF] px-5 text-center text-sm font-semibold text-slate-600"
      role="status"
    >
      Interactive Shopify &amp; API Architecture Stage loading · Illustrative Demo Data
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
      { rootMargin: "350px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="commerce-demo" ref={target} className="commerce-demo-slot">
      {ready ? <CommerceDemo /> : <DemoPlaceholder />}
      <noscript>
        <p className="bg-[#EEF2FF] px-5 py-6 text-center text-sm font-semibold text-slate-800">
          Enable JavaScript to interact with the Shopify &amp; backend architecture preview. All displayed metrics are illustrative demo data.
        </p>
      </noscript>
    </div>
  );
}
