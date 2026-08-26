import Script from "next/script";
import { googleAnalyticsId } from "@/lib/site";

/**
 * Renders nothing until NEXT_PUBLIC_GA_ID is set, so local and preview builds
 * stay clean and no measurement id is hardcoded into the repo.
 *
 * afterInteractive keeps the tag off the critical path, which matters because
 * third-party script weight is the usual cause of a bad INP score.
 */
export function Analytics() {
  if (!googleAnalyticsId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
