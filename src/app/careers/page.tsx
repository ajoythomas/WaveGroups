import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { careers } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Current career opportunities at Wave Groups.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero title="Careers" />
      <section className="section">
        <div className="container grid">
          {careers.map((career) => (
            <article key={career.slug} className="copy">
              <h3>{career.title}</h3>
              <p>{career.summary}</p>
              <Link className="btn" href={`/career-item/${career.slug}`}>
                View Position
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
