import type { Metadata } from "next";
import { Montserrat, Mulish } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteName } from "@/content/site";
import "./globals.css";

const headingFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
});

const bodyFont = Mulish({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteName} - Civil Engineering | Structural | Foundation Inspection Dallas`,
    template: `%s - ${siteName}`,
  },
  description:
    "Wave Engineering provides consulting in Telecommunications, Foundation Inspections, Residential & Commercial buildings, Civil & Structural Engineering.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
