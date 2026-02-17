import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CareerApplyForm } from "@/components/CareerApplyForm";
import { PageHero } from "@/components/PageHero";
import { careers } from "@/content/site";

export function generateStaticParams() {
  return careers.map((career) => ({ slug: career.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const career = careers.find((entry) => entry.slug === params.slug);
  if (!career) {
    return {};
  }

  return {
    title: career.title,
    description: career.summary,
  };
}

export default function CareerDetailPage({ params }: { params: { slug: string } }) {
  const career = careers.find((entry) => entry.slug === params.slug);

  if (!career) {
    notFound();
  }

  return (
    <>
      <PageHero title={career.title} />
      <section className="section">
        <div className="container two-col">
          <article className="copy">
            <h2>{career.title}</h2>
            <p>{career.summary}</p>

            <h3>Responsibilities</h3>
            <ul>
              {career.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3>Requirements</h3>
            <ul>
              {career.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="copy">
            <h3>Apply for this position</h3>
            <CareerApplyForm
              role={career.title}
              turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            />
          </article>
        </div>
      </section>
    </>
  );
}
