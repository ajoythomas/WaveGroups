import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Civil engineering, telecommunications, foundation inspections, and real estate services.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Services" />
      <section className="section">
        <div className="container grid">
          {services.map((service) => (
            <article key={service.slug} className="card">
              <Image src={service.image} alt={service.imageAlt} width={720} height={420} />
              <div className="card-content">
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <Link className="btn" href={`/service-item/${service.slug}`}>
                  View Service
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
