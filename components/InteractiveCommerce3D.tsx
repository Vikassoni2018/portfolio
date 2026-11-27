"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Layers, RefreshCw, ShieldCheck, Webhook } from "lucide-react";
import Link from "next/link";
import { TechBadgeIcon } from "@/components/TechIcons";

type ArchitecturePreset = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  layerNodes: Array<{ name: string; role: string; iconKey: string }>;
  telemetry: Array<{ label: string; value: string }>;
  snippet: string;
};

const PRESETS: ArchitecturePreset[] = [
  {
    id: "shopify-subs",
    label: "Subscription Engine",
    title: "Shopify Recurring Selling Plans",
    subtitle: "Customer portal, GraphQL Admin contract mutations, and webhook billing cadence.",
    layerNodes: [
      { name: "Online Store 2.0", role: "Liquid App Block UI", iconKey: "shopify" },
      { name: "Admin GraphQL", role: "SellingPlanContract Sync", iconKey: "graphql" },
      { name: "Symfony Worker", role: "HMAC Webhook Processor", iconKey: "php" }
    ],
    telemetry: [
      { label: "Contract state (Demo)", value: "Active Cycle" },
      { label: "Webhook verification", value: "HMAC-SHA256" },
      { label: "Retry queue", value: "Redis + RabbitMQ" }
    ],
    snippet: `mutation sellingPlanCreate($input: SellingPlanGroupInput!) {\n  sellingPlanGroupCreate(input: $input) {\n    sellingPlanGroup { id name merchantCode }\n  }\n}`
  },
  {
    id: "payments",
    label: "Payment Gateways",
    title: "Unified Gateway & Reconciliation",
    subtitle: "Stripe, PayPal, and Razorpay checkout orchestration with idempotent settlement logs.",
    layerNodes: [
      { name: "Stripe / PayPal", role: "Tokenized Intent Flow", iconKey: "stripe" },
      { name: "Laravel API", role: "Idempotent Capture", iconKey: "laravel" },
      { name: "PostgreSQL / MySQL", role: "Ledger Settlement", iconKey: "database" }
    ],
    telemetry: [
      { label: "Demo throughput", value: "Multi-Gateway" },
      { label: "Idempotency key", value: "Enforced" },
      { label: "Refund sync", value: "Event-Driven" }
    ],
    snippet: `public function capture(string $intentId, string $key): SettlementResult\n{\n    return $this->ledger->runIdempotent($key, fn () => $this->gateway->capture($intentId));\n}`
  },
  {
    id: "api-mesh",
    label: "API Middleware",
    title: "Multi-Tenant SaaS & AMP Speed",
    subtitle: "Centralized access management, Redis caching, and asynchronous queue dispatch.",
    layerNodes: [
      { name: "React / Next UI", role: "Merchant Dashboard", iconKey: "react" },
      { name: "REST + GraphQL", role: "Rate-Limited Proxy", iconKey: "rest" },
      { name: "Redis Cache", role: "Sub-second Reads", iconKey: "redis" }
    ],
    telemetry: [
      { label: "Cache strategy (Demo)", value: "Write-Through" },
      { label: "Auth model", value: "Token + RBAC" },
      { label: "Deployment", value: "Zero-Downtime" }
    ],
    snippet: `$redis->setex("store:{$shop}:catalog", 300, json_encode($payload));\n$bus->dispatch(new SyncCatalogMessage($shop));`
  }
];

export function InteractiveCommerce3D() {
  const [activeId, setActiveId] = useState<string>(PRESETS[0].id);
  const current = PRESETS.find((p) => p.id === activeId) ?? PRESETS[0];

  return (
    <section
      aria-labelledby="commerce-3d-title"
      className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#EEF2FF]/75 to-[#F5F3FF]/85 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-700 backdrop-blur-md">
              <Layers size={13} aria-hidden="true" />
              <span>Interactive Architecture Stage · Demo Data</span>
            </div>
            <h2
              id="commerce-3d-title"
              className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-5xl"
            >
              Inspect how storefronts, APIs, and payments connect.
            </h2>
          </div>
          <p className="max-w-md text-sm font-medium leading-6 text-slate-600">
            Select a system blueprint below to trace request lifecycles across storefront blocks, PHP middleware, gateways, and queues. Illustrative demo states only.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Commerce architecture blueprints"
          className="mb-8 flex flex-wrap gap-2.5"
        >
          {PRESETS.map((preset) => {
            const selected = preset.id === activeId;
            return (
              <button
                key={preset.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(preset.id)}
                className={`min-h-11 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  selected
                    ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-md shadow-indigo-500/20"
                    : "glass-pill text-slate-700 hover:border-indigo-300 hover:text-indigo-700"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        <div className="glass-panel-strong grid gap-8 rounded-3xl p-5 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div className="flex min-w-0 flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-indigo-600">
                <RefreshCw size={14} aria-hidden="true" />
                <span>Blueprint Overview</span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {current.title}
              </h3>
              <p className="mt-2.5 text-sm font-medium leading-6 text-slate-600">
                {current.subtitle}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {current.layerNodes.map((node, index) => (
                  <div
                    key={node.name}
                    className="rounded-2xl border border-indigo-100/90 bg-white/85 p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
                        <TechBadgeIcon id={node.iconKey} size={18} />
                      </span>
                      <span className="font-mono text-[10px] font-bold text-indigo-500">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-bold text-slate-900">{node.name}</p>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">{node.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-indigo-100/80 pt-6">
              {current.telemetry.map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-slate-900 sm:text-sm">
                    <CheckCircle2 size={14} className="shrink-0 text-indigo-600" aria-hidden="true" />
                    <span>{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-between rounded-2xl border border-indigo-100 bg-slate-50/90 p-4 sm:p-6">
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-600">
                  <Webhook size={14} className="text-indigo-600" aria-hidden="true" />
                  <span>contract-sample</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100/80 px-2.5 py-0.5 font-mono text-[10px] font-bold text-indigo-700">
                  <ShieldCheck size={11} aria-hidden="true" />
                  Demo Data · Illustrative
                </span>
              </div>

              <pre
                tabIndex={0}
                aria-label="Interactive architecture code sample"
                className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white/95 p-4 font-mono text-xs leading-relaxed text-slate-800 shadow-inner"
              >
                <code>{current.snippet}</code>
              </pre>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-medium text-slate-500">
                Built cleanly without unverified vanity metrics.
              </p>
              <Link
                href="/#contact"
                data-conversion="primary_cta_click"
                data-location="architecture_lab"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-indigo-600"
              >
                Discuss Architecture
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
