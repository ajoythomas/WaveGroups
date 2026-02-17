import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { projects } from "@/content/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((entry) => entry.slug === params.slug);
  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((entry) => entry.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <PageHero title={project.title} />
      <section className="section">
        <div className="container two-col">
          <article className="copy">
            <p>
              <strong>Category:</strong> {project.category}
            </p>
            {project.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
          <article className="card">
            <Image src={project.image} alt={project.imageAlt} width={1000} height={680} />
          </article>
        </div>
      </section>
    </>
  );
}
