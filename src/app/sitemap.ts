import type { MetadataRoute } from "next";
import { careers, projects, services } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about-wave", "/services", "/projects", "/careers", "/contact-us"];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/service-item/${service.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/portfolio-item/${project.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...careers.map((career) => ({
      url: absoluteUrl(`/career-item/${career.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
