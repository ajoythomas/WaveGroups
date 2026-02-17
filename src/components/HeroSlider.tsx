"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/types/content";

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((value) => (value + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="hero">
      {slides.map((slide, slideIndex) => (
        <article
          key={slide.title}
          className={`hero-slide ${slideIndex === index ? "active" : ""}`}
          aria-hidden={slideIndex !== index}
        >
          <Image src={slide.image} alt={slide.alt} fill priority sizes="100vw" className="hero-image" />
          <div className="hero-overlay">
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <Link className="btn" href={slide.ctaHref}>
              {slide.ctaLabel}
            </Link>
          </div>
        </article>
      ))}
      <div className="hero-dots" role="tablist" aria-label="Hero slides">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.title}
            className={slideIndex === index ? "active" : ""}
            onClick={() => setIndex(slideIndex)}
            aria-label={`Go to slide ${slideIndex + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
