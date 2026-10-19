"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { googleAnalyticsId } from "@/lib/site";
import { trackConversion, type ConversionEvent } from "@/lib/analytics";

const consentKey = "portfolio-analytics-consent-v1";
type Consent = "unset" | "accepted" | "declined";
const validId = /^G-[A-Z0-9]+$/.test(googleAnalyticsId);
type AnalyticsWindow = Window & {
  portfolioAnalyticsConsent?: boolean;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};
function privacySignal() {
  return (
    navigator.doNotTrack === "1" ||
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}

export function Analytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>("unset");
  const [ready, setReady] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const publicPage = !pathname.startsWith("/admin");

  useEffect(() => {
    if (!validId) return;
    let saved: Consent = "unset";
    try {
      const value = localStorage.getItem(consentKey);
      if (value === "accepted" || value === "declined") saved = value;
    } catch {
      /* Storage may be blocked. */
    }
    if (privacySignal()) saved = "declined";
    (window as AnalyticsWindow).portfolioAnalyticsConsent =
      saved === "accepted";
    // Read persisted consent after hydration; never load analytics by default.
    const frame = requestAnimationFrame(() => {
      setConsent(saved);
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    (window as AnalyticsWindow).portfolioAnalyticsConsent =
      consent === "accepted" && publicPage;
    if (!validId || consent !== "accepted" || !publicPage || privacySignal())
      return;
    const handleClick = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!target) return;
      const explicit = target.dataset.conversion as ConversionEvent | undefined;
      const url = new URL(target.href, window.location.href);
      const properties: Record<string, string> = {};
      let conversion = explicit;
      if (
        !conversion &&
        url.origin === window.location.origin &&
        url.hash === "#contact"
      )
        conversion = "primary_cta_click";
      if (
        !conversion &&
        url.origin === window.location.origin &&
        url.pathname.startsWith("/projects/")
      )
        conversion = "portfolio_project_click";
      if (!conversion && ["mailto:", "tel:"].includes(url.protocol))
        conversion = "contact_link_click";
      if (!conversion && url.hostname === "wa.me")
        conversion = "contact_link_click";
      if (!conversion) return;
      // No form values, email addresses, complete external URLs or query strings.
      if (target.dataset.location)
        properties.location = target.dataset.location;
      if (conversion === "portfolio_project_click")
        properties.project_id =
          target.dataset.project || url.pathname.split("/").pop() || "unknown";
      if (conversion === "contact_link_click")
        properties.channel =
          url.hostname === "wa.me" ? "whatsapp" : url.protocol.replace(":", "");
      trackConversion(conversion, properties);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [consent, publicPage]);

  function choose(value: Consent) {
    setConsent(value);
    setPreferences(false);
    (window as AnalyticsWindow).portfolioAnalyticsConsent =
      value === "accepted" && !privacySignal();
    try {
      localStorage.setItem(consentKey, value);
    } catch {
      /* Consent still applies for this page. */
    }
    (window as AnalyticsWindow).gtag?.("consent", "update", {
      analytics_storage:
        value === "accepted" && !privacySignal() ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }

  if (!validId || !publicPage || !ready) return null;
  const accepted = consent === "accepted" && !privacySignal();
  return (
    <>
      {accepted ? (
        <>
          <Script
            id="ga-init"
            strategy="afterInteractive"
          >{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('js',new Date());gtag('config','${googleAnalyticsId}',{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});`}</Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
        </>
      ) : null}
      {consent === "unset" || preferences ? (
        <aside
          aria-label="Analytics preferences"
          className="fixed bottom-4 left-4 z-[70] max-w-sm rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-xl max-sm:right-20"
        >
          <p className="text-sm font-bold">Optional usage analytics</p>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            Allow Google Analytics to record navigation and enquiry events? Form
            contents are excluded. You can change this choice anytime.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => choose("declined")}
              className="min-h-11 rounded-lg border border-slate-300 px-4 text-xs font-bold"
            >
              Decline
            </button>
            <button
              onClick={() => choose("accepted")}
              disabled={privacySignal()}
              className="min-h-11 rounded-lg bg-blue-600 px-4 text-xs font-bold text-white disabled:opacity-50"
            >
              Allow analytics
            </button>
          </div>
          {privacySignal() ? (
            <p className="mt-2 text-xs text-slate-600">
              Your browser privacy preference is respected.
            </p>
          ) : null}
        </aside>
      ) : (
        <button
          onClick={() => setPreferences(true)}
          className="fixed bottom-2 left-2 z-[65] min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm"
        >
          Analytics preferences
        </button>
      )}
    </>
  );
}
