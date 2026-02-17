"use client";

import Script from "next/script";
import { useEffect } from "react";

type Props = {
  siteKey?: string;
  onToken: (token: string) => void;
};

export function TurnstileWidget({ siteKey, onToken }: Props) {
  if (!siteKey) {
    return null;
  }

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-callback="onWaveTurnstileToken"
        data-theme="light"
      />
      <Script id="turnstile-callback" strategy="afterInteractive">
        {`
          window.onWaveTurnstileToken = function(token) {
            window.dispatchEvent(new CustomEvent('wave-turnstile-token', { detail: token }));
          }
        `}
      </Script>
      <TokenListener onToken={onToken} />
    </>
  );
}

function TokenListener({ onToken }: { onToken: (token: string) => void }) {
  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      onToken(customEvent.detail);
    };

    window.addEventListener("wave-turnstile-token", handler);
    return () => window.removeEventListener("wave-turnstile-token", handler);
  }, [onToken]);

  return null;
}
