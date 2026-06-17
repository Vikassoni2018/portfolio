import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

const cookieName = "portfolio_admin_session";
const maxAgeSeconds = 60 * 60 * 8;

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 24) {
    throw new Error("SESSION_SECRET must be set to a long random value.");
  }
  return secret;
}

function sign(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function makeSessionValue(username: string) {
  const expires = Date.now() + maxAgeSeconds * 1000;
  const payload = JSON.stringify({ username, expires });
  const encodedPayload = Buffer.from(payload).toString("base64url");
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifySessionValue(value?: string) {
  if (!value) return false;
  const [encodedPayload, signature] = value.split(".");
  if (!encodedPayload || !signature) return false;

  const expected = sign(encodedPayload);
  if (Buffer.byteLength(signature) !== Buffer.byteLength(expected)) {
    return false;
  }
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as {
      username: string;
      expires: number;
    };
    return payload.username === process.env.ADMIN_USERNAME && payload.expires > Date.now();
  } catch {
    return false;
  }
}

export function isRequestAuthenticated(request: NextRequest) {
  return verifySessionValue(request.cookies.get(cookieName)?.value);
}

export async function getIsAuthenticated() {
  const cookieStore = await cookies();
  return verifySessionValue(cookieStore.get(cookieName)?.value);
}

export async function requireAdmin() {
  if (!(await getIsAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function setSessionCookie(username: string) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, makeSessionValue(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}
