import { NextResponse, type NextRequest } from "next/server";
import { jsonError, requireApiAuth } from "@/lib/api";
import { saveUploadedFile } from "@/lib/upload";

export async function POST(request: NextRequest) {
  const authError = requireApiAuth(request);
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return jsonError("File is required.");

    const url = await saveUploadedFile(file, "image");
    return NextResponse.json({ url });
  } catch (error) {
    return jsonError((error as Error).message);
  }
}
