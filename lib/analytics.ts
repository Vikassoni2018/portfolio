export type ConversionEvent =
  | "primary_cta_click"
  | "portfolio_project_click"
  | "contact_form_submit"
  | "enquiry_success"
  | "contact_link_click";

export function trackConversion(
  event: ConversionEvent,
  properties: Record<string, string> = {},
) {
  if (
    typeof window === "undefined" ||
    !/^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID ?? "")
  )
    return;
  if (
    navigator.doNotTrack === "1" ||
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl
  )
    return;
  const analytics = window as Window & {
    portfolioAnalyticsConsent?: boolean;
    gtag?: (...args: unknown[]) => void;
  };
  if (analytics.portfolioAnalyticsConsent !== true) return;
  analytics.gtag?.("event", event, properties);
}
