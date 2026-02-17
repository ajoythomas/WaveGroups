import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  message: z.string().min(10).max(2000),
  turnstileToken: z.string().optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!rateLimit(`contact:${ip}`, 10, 60_000)) {
      return NextResponse.json({ error: "Too many requests. Please wait and retry." }, { status: 429 });
    }

    const payload = schema.parse(await request.json());
    const turnstileOk = await verifyTurnstileToken(payload.turnstileToken, ip);

    if (!turnstileOk) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }

    const recipient = process.env.CONTACT_TO_EMAIL;
    if (!recipient) {
      return NextResponse.json({ error: "Contact email is not configured." }, { status: 500 });
    }

    await sendEmail({
      to: recipient,
      subject: "New Contact Request - Wave Groups",
      replyTo: payload.email,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to process request." }, { status: 500 });
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
