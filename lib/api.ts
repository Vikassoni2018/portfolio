import { NextResponse, type NextRequest } from "next/server";
import { isRequestAuthenticated } from "@/lib/auth";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function requireApiAuth(request: NextRequest) {
  if (!isRequestAuthenticated(request)) {
    return jsonError("Authentication required.", 401);
  }
  return null;
}

export async function parseJson<T = unknown>(request: NextRequest): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new Error("Invalid JSON body.");
  }
}
