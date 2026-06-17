import { NextResponse, type NextRequest } from "next/server";
import { jsonError, parseJson, requireApiAuth } from "@/lib/api";
import { getProfile, saveProfile } from "@/lib/data";
import { validateProfile } from "@/lib/validation";

export async function GET() {
  return NextResponse.json(await getProfile());
}

export async function PUT(request: NextRequest) {
  const authError = requireApiAuth(request);
  if (authError) return authError;

  try {
    const profile = validateProfile(await parseJson(request));
    return NextResponse.json(await saveProfile(profile));
  } catch (error) {
    return jsonError((error as Error).message);
  }
}
