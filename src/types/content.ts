export type HeroSlide = {
  image: string;
  alt: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  image: string;
  imageAlt: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  body: string[];
  image: string;
  imageAlt: string;
};

export type Career = {
  slug: string;
  title: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};
