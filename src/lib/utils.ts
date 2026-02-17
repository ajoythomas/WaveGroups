export function absoluteUrl(path: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.wavegroups.com";
  return new URL(path, siteUrl).toString();
}

export function formatPhoneForHref(phone: string): string {
  return phone.replace(/[^0-9+]/g, "");
}
