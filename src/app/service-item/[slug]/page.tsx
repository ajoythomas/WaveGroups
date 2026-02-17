import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { services } from "@/content/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find((entry) => entry.slug === params.slug);
  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.summary,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((entry) => entry.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHero title={service.title} />
      <section className="section">
        <div className="container two-col">
          <article className="copy">
            {service.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
          <article className="card">
            <Image src={service.image} alt={service.imageAlt} width={1000} height={680} />
          </article>
        </div>
      </section>
    </>
  );
}
