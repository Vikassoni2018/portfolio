import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { Theme } from "@/data/showcase";
import { showcasePath, themeInquiry } from "@/data/showcase";

export type ThemeProps = { theme: Theme };

export function BrandNav({
  theme, mark, links
}: ThemeProps & { mark?: React.ReactNode; links: readonly (readonly [string, string])[] }) {
  return (
    <header className="brand-nav">
      <a className="brand-name" href="#main-content">{mark}<span>{theme.brand}</span></a>
      <nav aria-label={`${theme.brand} navigation`}>
        {links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
    </header>
  );
}

export function Photo({
  theme, priority = false, className = "", sizes = "(max-width: 700px) 100vw, (max-width: 1100px) 65vw, 700px",
  asset = { src: `/showcase/${theme.visual}.webp`, alt: theme.alt }
}: ThemeProps & { priority?: boolean; className?: string; sizes?: string; asset?: { src: string; alt: string } }) {
  return (
    <figure className={`concept-photo ${className}`}>
      <Image src={asset.src} alt={asset.alt} fill sizes={sizes}
        loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />
    </figure>
  );
}

export function Jump({ to, children }: { to: string; children: React.ReactNode }) {
  return <a className="concept-button" href={`#${to}`}>{children}<ArrowDownRight size={18} aria-hidden="true" /></a>;
}

export function ConceptFooter({ theme }: ThemeProps) {
  return (
    <footer className="concept-footer">
      <section className="concept-closing" aria-labelledby="concept-cta-title" id="design">
        <div>
          <p className="concept-kicker">A portfolio design concept by Vikas Soni</p>
          <h2 id="concept-cta-title">Want a Website Like This?</h2>
        </div>
        <a className="concept-button" href={themeInquiry(theme.slug)} target="_top">
          Build My Website in This Style <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </section>
      <div className="concept-footer-bar">
        <span>{theme.brand} · Fictional brand</span>
        <nav aria-label="Breadcrumb">
          <Link href="/" target="_top">Portfolio</Link><span aria-hidden="true">/</span>
          <Link href={showcasePath} target="_top">Design Showcase</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{theme.name}</span>
        </nav>
      </div>
    </footer>
  );
}

