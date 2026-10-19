import type { Enquiry } from "./enquiry";

export type DeliveryConfig = { apiKey?: string; from?: string; to?: string };
export function isDeliveryConfigured(config: DeliveryConfig) {
  return Boolean(config.apiKey && config.from && config.to);
}

/** Only imported by the server route. A provider acknowledgement is required. */
export async function deliverEnquiry(
  data: Enquiry,
  config: DeliveryConfig,
  idempotencyKey: string,
  send: typeof fetch = fetch,
) {
  if (!isDeliveryConfigured(config)) throw new Error("Delivery not configured");
  const response = await send("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: data.email,
      subject: `Portfolio enquiry: ${data.service}`,
      // Plain text avoids interpreting user content as HTML.
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Website: ${data.companyUrl || "Not supplied"}`,
        `Service: ${data.service}`,
        `Budget: ${data.budget || "Not supplied"}`,
        "",
        data.description,
      ].join("\n"),
    }),
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error("Email provider rejected the enquiry");
  const result: unknown = await response.json();
  if (
    !result ||
    typeof result !== "object" ||
    !("id" in result) ||
    typeof result.id !== "string" ||
    !result.id
  )
    throw new Error("Missing provider acknowledgement");
  return result.id;
}
