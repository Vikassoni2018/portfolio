import { NextResponse } from "next/server";
import { getIsAuthenticated } from "@/lib/auth";

export async function GET() {
  return NextResponse.json({ authenticated: await getIsAuthenticated() });
}
