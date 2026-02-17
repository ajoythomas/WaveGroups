import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { aboutPage } from "@/content/site";

export const metadata: Metadata = {
  title: "About Wave",
  description: "About Wave Groups and our engineering, inspections, and real estate services.",
};

export default function AboutWavePage() {
  return (
    <>
      <PageHero title="About Wave" />
      <section className="section">
        <div className="container copy">
          <h2>{aboutPage.title}</h2>
          <p>{aboutPage.intro}</p>
          {aboutPage.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
