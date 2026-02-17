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

export function CareerApplyForm({
  role,
  turnstileSiteKey,
}: {
  role: string;
  turnstileSiteKey?: string;
}) {
  const [state, setState] = useState<State>(initialState);
  const [turnstileToken, setTurnstileToken] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ ...initialState, loading: true });

    const form = event.currentTarget;
    const formData = new FormData(form);

    const resumeFile = formData.get("applicant-resume");
    if (!(resumeFile instanceof File) || !resumeFile.name) {
      setState({ loading: false, error: "Please upload a resume file.", success: "" });
      return;
    }

    const uploadResponse = await fetch("/api/careers/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: resumeFile.name,
        fileType: resumeFile.type || "application/octet-stream",
        fileSize: resumeFile.size,
      }),
    });

    if (!uploadResponse.ok) {
      const result = (await uploadResponse.json()) as { error?: string };
      setState({ loading: false, error: result.error || "Unable to prepare upload.", success: "" });
      return;
    }

    const uploadPayload = (await uploadResponse.json()) as {
      uploadUrl: string;
      key: string;
    };

    const putResponse = await fetch(uploadPayload.uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": resumeFile.type || "application/octet-stream",
      },
      body: resumeFile,
    });

    if (!putResponse.ok) {
      setState({ loading: false, error: "Upload failed. Please try again.", success: "" });
      return;
    }

    const applyResponse = await fetch("/api/careers/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role,
        applicantName: String(formData.get("applicant-name") || ""),
        applicantEmail: String(formData.get("applicant-email") || ""),
        applicantMobile: String(formData.get("applicant-mobile") || ""),
        applicantAddress: String(formData.get("applicant-address") || ""),
        aboutApplicant: String(formData.get("about-applicant") || ""),
        description: String(formData.get("description") || ""),
        resumeKey: uploadPayload.key,
        turnstileToken,
      }),
    });

    if (!applyResponse.ok) {
      const result = (await applyResponse.json()) as { error?: string };
      setState({ loading: false, error: result.error || "Application submission failed.", success: "" });
      return;
    }

    form.reset();
    setState({ loading: false, error: "", success: "Application submitted successfully." });
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-grid">
        <input name="applicant-name" type="text" placeholder="Full Name *" required />
        <input name="applicant-email" type="email" placeholder="Email *" required />
      </div>
      <div className="form-grid">
        <input name="applicant-mobile" type="text" placeholder="Phone Number *" required />
        <input name="applicant-address" type="text" placeholder="Address *" required />
      </div>
      <textarea name="about-applicant" rows={4} placeholder="Tell us about yourself *" required />
      <textarea name="description" rows={4} placeholder="Additional details" />
      <label className="file-label">
        Resume (PDF, DOC, DOCX) *
        <input
          type="file"
          name="applicant-resume"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
      </label>
      <TurnstileWidget siteKey={turnstileSiteKey} onToken={setTurnstileToken} />
      <button className="btn" type="submit" disabled={state.loading}>
        {state.loading ? "Submitting..." : "Submit Application"}
      </button>
      {state.error ? <p className="error-text">{state.error}</p> : null}
      {state.success ? <p className="success-text">{state.success}</p> : null}
    </form>
  );
}
