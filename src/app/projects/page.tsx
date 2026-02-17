import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Wave Groups engineering project portfolio.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero title="Projects" />
      <section className="section">
        <div className="container grid">
          {projects.map((project) => (
            <article key={project.slug} className="card">
              <Image src={project.image} alt={project.imageAlt} width={720} height={420} />
              <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <Link className="btn" href={`/portfolio-item/${project.slug}`}>
                  View Project
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
