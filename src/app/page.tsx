import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/HeroSlider";
import { heroSlides, projects, services } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <HeroSlider slides={heroSlides} />

      <section className="section">
        <div className="container">
          <h2>Our Services</h2>
          <div className="grid">
            {services.map((service) => (
              <article className="card" key={service.slug}>
                <Image src={service.image} alt={service.imageAlt} width={640} height={380} />
                <div className="card-content">
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <Link className="btn" href={`/service-item/${service.slug}`}>
                    Learn More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Selected Projects</h2>
          <div className="grid">
            {projects.slice(0, 3).map((project) => (
              <article className="card" key={project.slug}>
                <Image src={project.image} alt={project.imageAlt} width={640} height={380} />
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
        </div>
      </section>
    </>
  );
}
