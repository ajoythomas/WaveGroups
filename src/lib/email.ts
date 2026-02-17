const RESEND_API_URL = "https://api.resend.com/emails";

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const apiKey = process.env.EMAIL_API_KEY;
  const from = process.env.FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error("Email service is not configured.");
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      reply_to: params.replyTo,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Email send failed: ${message}`);
  }
}
