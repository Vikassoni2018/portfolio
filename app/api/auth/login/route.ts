import { NextResponse, type NextRequest } from "next/server";
import { setSessionCookie } from "@/lib/auth";
import { jsonError, parseJson } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = (await parseJson(request)) as { username?: string; password?: string };
    const username = body.username?.trim();
    const password = body.password ?? "";

    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
      return jsonError("Admin credentials are not configured.", 500);
    }

    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      return jsonError("Invalid username or password.", 401);
    }

    await setSessionCookie(username);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return jsonError((error as Error).message);
  }
}
