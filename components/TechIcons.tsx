import {
  siCss,
  siDocker,
  siGit,
  siGraphql,
  siHtml5,
  siJavascript,
  siLaravel,
  siLess,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPaypal,
  siPhp,
  siPostgresql,
  siPostman,
  siRabbitmq,
  siRazorpay,
  siReact,
  siRedis,
  siShopify,
  siStripe,
  siSymfony,
  siTypescript
} from "simple-icons";
import {
  Blocks,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Server,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Terminal,
  Webhook
} from "lucide-react";

type BrandIconSpec = {
  title: string;
  path: string;
  hex: string;
};

const BRAND_ICONS: Record<string, BrandIconSpec> = {
  shopify: { title: siShopify.title, path: siShopify.path, hex: "#5E8E3E" },
  php: { title: siPhp.title, path: siPhp.path, hex: "#4F5B93" },
  symfony: { title: siSymfony.title, path: siSymfony.path, hex: "#1E293B" },
  laravel: { title: siLaravel.title, path: siLaravel.path, hex: "#FF2D20" },
  graphql: { title: siGraphql.title, path: siGraphql.path, hex: "#E10098" },
  javascript: { title: siJavascript.title, path: siJavascript.path, hex: "#C29B0C" },
  typescript: { title: siTypescript.title, path: siTypescript.path, hex: "#3178C6" },
  react: { title: siReact.title, path: siReact.path, hex: "#0284C7" },
  nodejs: { title: siNodedotjs.title, path: siNodedotjs.path, hex: "#3F7F36" },
  nextjs: { title: siNextdotjs.title, path: siNextdotjs.path, hex: "#0F172A" },
  stripe: { title: siStripe.title, path: siStripe.path, hex: "#635BFF" },
  paypal: { title: siPaypal.title, path: siPaypal.path, hex: "#003087" },
  razorpay: { title: siRazorpay.title, path: siRazorpay.path, hex: "#0C2451" },
  redis: { title: siRedis.title, path: siRedis.path, hex: "#DC382D" },
  rabbitmq: { title: siRabbitmq.title, path: siRabbitmq.path, hex: "#EA580C" },
  mysql: { title: siMysql.title, path: siMysql.path, hex: "#4479A1" },
  postgresql: { title: siPostgresql.title, path: siPostgresql.path, hex: "#4169E1" },
  docker: { title: siDocker.title, path: siDocker.path, hex: "#2496ED" },
  git: { title: siGit.title, path: siGit.path, hex: "#F05032" },
  postman: { title: siPostman.title, path: siPostman.path, hex: "#FF6C37" },
  html5: { title: siHtml5.title, path: siHtml5.path, hex: "#E34F26" },
  css3: { title: siCss.title, path: siCss.path, hex: "#6366F1" },
  less: { title: siLess.title, path: siLess.path, hex: "#1D365D" }
};

export function TechBadgeIcon({
  id,
  size = 20,
  className = ""
}: {
  id: string;
  size?: number;
  className?: string;
}) {
  const key = id.toLowerCase();
  const brand = BRAND_ICONS[key];

  if (brand) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={className}
        style={{ color: brand.hex }}
      >
        <path d={brand.path} />
      </svg>
    );
  }

  switch (key) {
    case "rest":
      return <Webhook size={size} className={className} aria-hidden="true" />;
    case "database":
    case "sql":
      return <Database size={size} className={className} aria-hidden="true" />;
    case "server":
      return <Server size={size} className={className} aria-hidden="true" />;
    case "commerce":
    case "shopify-app":
      return <ShoppingBag size={size} className={className} aria-hidden="true" />;
    case "liquid":
      return <Sparkles size={size} className={className} aria-hidden="true" />;
    case "performance":
      return <Cpu size={size} className={className} aria-hidden="true" />;
    case "architecture":
      return <Layers size={size} className={className} aria-hidden="true" />;
    case "security":
      return <ShieldCheck size={size} className={className} aria-hidden="true" />;
    case "blocks":
      return <Blocks size={size} className={className} aria-hidden="true" />;
    case "terminal":
      return <Terminal size={size} className={className} aria-hidden="true" />;
    case "globe":
      return <Globe size={size} className={className} aria-hidden="true" />;
    default:
      return <Code2 size={size} className={className} aria-hidden="true" />;
  }
}

export function resolveSkillIconKey(category: string, index: number): string {
  const lower = category.toLowerCase();
  if (lower.includes("shopify app") || lower.includes("shopify expert")) return "shopify";
  if (lower.includes("liquid") || lower.includes("theme")) return "liquid";
  if (lower.includes("symfony") || lower.includes("php")) return "php";
  if (lower.includes("laravel")) return "laravel";
  if (lower.includes("graphql")) return "graphql";
  if (lower.includes("payment")) return "stripe";
  if (lower.includes("javascript") || lower.includes("frontend")) return "javascript";
  if (lower.includes("git") || lower.includes("devops")) return "git";
  if (lower.includes("full stack")) return "react";
  if (lower.includes("web development")) return "html5";
  const fallbacks = ["shopify", "php", "graphql", "stripe", "liquid", "javascript", "git", "laravel"];
  return fallbacks[index % fallbacks.length];
}
