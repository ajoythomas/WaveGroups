import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { topContact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Wave Groups for tower inquiries, foundation inspections, and real estate needs.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" />
      <section className="section">
        <div className="container two-col">
          <article className="copy">
            <h2>Schedule Appointments</h2>
            <p>
              Please fill out the form or call {topContact.phonePrimary} to schedule your appointment for tower
              inquiries, foundation inspections, and real estate needs.
            </p>
            <ContactForm turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
          </article>

          <article className="copy">
            <h3>Office Information</h3>
            <p>
              <strong>Office Hours:</strong> {topContact.officeHours}
            </p>
            <p>
              <strong>Address:</strong> {topContact.address}
            </p>
            <p>
              <strong>Tel:</strong> {topContact.phonePrimary} / {topContact.phoneSecondary}
            </p>
            <p>
              <strong>Fax:</strong> {topContact.fax}
            </p>
            <Image src="/media/Capture-1.png" alt="Wave Groups map" width={1492} height={594} />
          </article>
        </div>
      </section>
    </>
  );
}
