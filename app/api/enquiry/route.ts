import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { validateEnquiry } from "@/lib/enquiry";
import { deliverEnquiry, isDeliveryConfigured } from "@/lib/enquiry-delivery";

export const runtime = "nodejs";
// Best-effort per-instance protection. Use a shared limiter/WAF for multi-instance deployments.
const attempts = new Map<string, { count: number; expires: number }>();
const windowMs = 15 * 60 * 1000;
const respond = (body: object, status: number) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    return respond({ error: "Please submit the form from this website." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return respond({ error: "JSON request required." }, 415);
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.expires <= now) attempts.delete(key);
  // Forwarded IPs are trustworthy only behind a proxy that overwrites them (such as Vercel).
  const ip = process.env.VERCEL
    ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    : "local";
  const ipKey = createHash("sha256").update(ip).digest("hex");
  const bucket = attempts.get(ipKey) ?? { count: 0, expires: now + windowMs };
  if (bucket.count >= 5 || (attempts.size >= 1000 && !attempts.has(ipKey))) {
    return NextResponse.json(
      { error: "Too many attempts. Please try later or email me directly." },
      {
        status: 429,
        headers: { "Retry-After": "900", "Cache-Control": "no-store" },
      },
    );
  }
  bucket.count += 1;
  attempts.set(ipKey, bucket);

  let input: Record<string, unknown>;
  try {
    // Bound bytes read, including requests with a missing or dishonest Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return respond({ error: "A project brief is required." }, 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) {
        await reader.cancel();
        return respond({ error: "Project brief is too large." }, 413);
      }
      chunks.push(value);
    }
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error();
    input = parsed as Record<string, unknown>;
  } catch {
    return respond({ error: "Invalid form data. Please try again." }, 400);
  }

  if (
    input.website ||
    typeof input.startedAt !== "number" ||
    now - input.startedAt < 3000 ||
    now - input.startedAt > 24 * 60 * 60 * 1000
  ) {
    return respond(
      {
        error:
          "Please wait a few seconds and try again. If the form has been open a long time, refresh the page.",
      },
      400,
    );
  }
  const { data, errors } = validateEnquiry(input);
  if (Object.keys(errors).length)
    return respond(
      { error: "Please check the highlighted fields.", errors },
      422,
    );
  if (
    typeof input.requestId !== "string" ||
    !/^[a-f0-9-]{36}$/i.test(input.requestId)
  )
    return respond({ error: "Please refresh the page and try again." }, 400);
  const config = {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.CONTACT_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL,
  };
  if (!isDeliveryConfigured(config))
    return respond(
      {
        error:
          "Online enquiries are temporarily unavailable. Please use the email link below; your message has not been sent.",
      },
      503,
    );
  try {
    const fingerprint = createHash("sha256")
      .update(JSON.stringify(data))
      .digest("hex")
      .slice(0, 24);
    await deliverEnquiry(data, config, `${input.requestId}-${fingerprint}`);
    return respond(
      {
        ok: true,
        message:
          "Your enquiry has been accepted for email delivery. Thank you for sharing your project.",
      },
      200,
    );
  } catch {
    // Do not log customer details or leak the provider response/configuration.
    return respond(
      {
        error:
          "Email delivery could not be confirmed. Please try again or email me directly.",
      },
      502,
    );
  }
}
