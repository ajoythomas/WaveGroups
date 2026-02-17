import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createResumeUploadUrl } from "@/lib/r2";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_SIZE_BYTES = 8 * 1024 * 1024;
const allowedTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const schema = z.object({
  fileName: z.string().min(3).max(200),
  fileType: z.string().min(3).max(150),
  fileSize: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!rateLimit(`careers-upload:${ip}`, 20, 60_000)) {
      return NextResponse.json({ error: "Too many upload attempts." }, { status: 429 });
    }

    const payload = schema.parse(await request.json());

    if (!allowedTypes.has(payload.fileType)) {
      return NextResponse.json({ error: "Only PDF, DOC, and DOCX files are allowed." }, { status: 400 });
    }

    if (payload.fileSize > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "Resume file must be 8MB or smaller." }, { status: 400 });
    }

    const cleanFileName = payload.fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
    const key = `careers/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${cleanFileName}`;

    const uploadUrl = await createResumeUploadUrl({
      key,
      contentType: payload.fileType,
    });

    return NextResponse.json({ key, uploadUrl });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid upload request." }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to prepare upload." }, { status: 500 });
  }
}
