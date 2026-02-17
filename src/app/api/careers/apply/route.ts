import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
import { getResumePublicUrl, resumeExists } from "@/lib/r2";
import { rateLimit } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

const schema = z.object({
  role: z.string().min(2).max(120),
  applicantName: z.string().min(2).max(120),
  applicantEmail: z.string().email().max(200),
  applicantMobile: z.string().min(7).max(40),
  applicantAddress: z.string().min(5).max(220),
  aboutApplicant: z.string().min(10).max(2000),
  description: z.string().max(2000).optional().default(""),
  resumeKey: z.string().min(10).max(400),
  turnstileToken: z.string().optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!rateLimit(`careers-apply:${ip}`, 10, 60_000)) {
      return NextResponse.json({ error: "Too many requests. Please wait and retry." }, { status: 429 });
    }

    const payload = schema.parse(await request.json());

    const turnstileOk = await verifyTurnstileToken(payload.turnstileToken, ip);
    if (!turnstileOk) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }

    const fileExists = await resumeExists(payload.resumeKey);
    if (!fileExists) {
      return NextResponse.json({ error: "Uploaded resume file was not found." }, { status: 400 });
    }

    const recipient = process.env.CAREERS_TO_EMAIL;
    if (!recipient) {
      return NextResponse.json({ error: "Careers email is not configured." }, { status: 500 });
    }

    const resumeUrl = getResumePublicUrl(payload.resumeKey);

    await sendEmail({
      to: recipient,
      subject: `New Career Application - ${escapeHtml(payload.role)}`,
      replyTo: payload.applicantEmail,
      html: `
        <h2>New Career Application</h2>
        <p><strong>Position:</strong> ${escapeHtml(payload.role)}</p>
        <p><strong>Name:</strong> ${escapeHtml(payload.applicantName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.applicantEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(payload.applicantMobile)}</p>
        <p><strong>Address:</strong> ${escapeHtml(payload.applicantAddress)}</p>
        <p><strong>About Applicant:</strong><br/>${escapeHtml(payload.aboutApplicant).replace(/\n/g, "<br/>")}</p>
        <p><strong>Additional Details:</strong><br/>${escapeHtml(payload.description).replace(/\n/g, "<br/>")}</p>
        <p><strong>Resume:</strong> <a href="${resumeUrl}">${resumeUrl}</a></p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to process application." }, { status: 500 });
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
