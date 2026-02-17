"use client";

import { FormEvent, useState } from "react";
import { TurnstileWidget } from "@/components/TurnstileWidget";

type State = {
  loading: boolean;
  error: string;
  success: string;
};

const initialState: State = {
  loading: false,
  error: "",
  success: "",
};

export function ContactForm({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const [state, setState] = useState<State>(initialState);
  const [turnstileToken, setTurnstileToken] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ ...initialState, loading: true });

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      turnstileToken,
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      setState({ loading: false, error: result.error || "Failed to send message.", success: "" });
      return;
    }

    event.currentTarget.reset();
    setTurnstileToken("");
    setState({ loading: false, error: "", success: "Thank you. Your message has been sent." });
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-grid">
        <input name="name" type="text" placeholder="Name *" required maxLength={120} />
        <input name="email" type="email" placeholder="Email *" required maxLength={200} />
      </div>
      <textarea name="message" placeholder="Message..." rows={6} maxLength={2000} required />
      <TurnstileWidget siteKey={turnstileSiteKey} onToken={setTurnstileToken} />
      <button className="btn" type="submit" disabled={state.loading}>
        {state.loading ? "Sending..." : "Send Message"}
      </button>
      {state.error ? <p className="error-text">{state.error}</p> : null}
      {state.success ? <p className="success-text">{state.success}</p> : null}
    </form>
  );
}
