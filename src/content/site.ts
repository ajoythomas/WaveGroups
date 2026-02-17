import type { Career, HeroSlide, Project, Service } from "@/types/content";

export const siteName = "Wave Groups";
export const siteUrl = "https://www.wavegroups.com";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about-wave", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/contact-us", label: "Contact Us" },
];

export const topContact = {
  phonePrimary: "972-454-9283",
  phoneSecondary: "972-891-9283",
  email: "info@wavegroups.com",
  fax: "972-212-9316",
  officeHours: "Mon - Fri 8am - 5pm",
  address: "1515 N Town East Blvd, Suite#138-403, Mesquite, TX",
};

export const heroSlides: HeroSlide[] = [
  {
    image: "/media/0111.jpg",
    alt: "Civil and structural engineering",
    title: "Civil/Structural Engineering & Real Estate",
    description:
      "We offer engineering and real estate services at the highest quality.",
    ctaLabel: "Get Started Now",
    ctaHref: "/services",
  },
  {
    image: "/media/021.jpg",
    alt: "Trustworthy service",
    title: "Trustworthy",
    description:
      "Over 80% of our work comes from repeat clients. We promise. We deliver.",
    ctaLabel: "About Wave",
    ctaHref: "/about-wave",
  },
  {
    image: "/media/03.jpg",
    alt: "Cost effective projects",
    title: "Cost Effective",
    description:
      "Our services will save you money without compromising quality.",
    ctaLabel: "Our Projects",
    ctaHref: "/projects",
  },
];

export const services: Service[] = [
  {
    slug: "foundationinspections",
    title: "Foundation Inspections",
    summary:
      "Residential and commercial foundation assessments with practical recommendations.",
    body: [
      "Our inspection team evaluates visible foundation performance, drainage context, and structural behavior indicators.",
      "You receive clear findings, photo-backed documentation, and recommendations designed to support real estate transactions and long-term maintenance decisions.",
    ],
    image: "/media/Foundation.png",
    imageAlt: "Foundation inspection",
  },
  {
    slug: "telecommunication",
    title: "Telecommunication Structural Engineering & Design Services",
    summary:
      "Telecom tower engineering for modifications, analyses, and deployment support.",
    body: [
      "We support telecom operators and contractors with structural analysis, design, and drawing packages for towers and rooftop structures.",
      "Our team works with project constraints, permitting needs, and deployment schedules to keep projects moving with confidence.",
    ],
    image: "/media/101.jpg",
    imageAlt: "Telecommunications tower",
  },
  {
    slug: "realestate",
    title: "Real Estate",
    summary:
      "Engineering-driven support for residential and commercial real estate decisions.",
    body: [
      "We partner with buyers, sellers, agents, and developers to assess structural and civil considerations before key milestones.",
      "Our reports prioritize clarity so stakeholders can make informed decisions quickly.",
    ],
    image: "/media/hr4039726-1.jpg",
    imageAlt: "Residential real estate",
  },
];

export const projects: Project[] = [
  {
    slug: "water-tower",
    title: "Water Tower",
    category: "Telecommunications",
    summary: "Structural scope for elevated and tower-adjacent projects.",
    body: [
      "Project support included structural review and engineering coordination.",
      "Deliverables focused on safe implementation and documentation quality.",
    ],
    image: "/media/100_0762-1.jpg",
    imageAlt: "Water tower",
  },
  {
    slug: "construction-drawings",
    title: "Construction Drawings",
    category: "Civil and Architecture",
    summary: "Construction drawing packages aligned with structural requirements.",
    body: [
      "The team prepared coordinated drawing sets for field execution.",
      "Scope covered essential details required for clear interpretation on site.",
    ],
    image: "/media/f03.jpg",
    imageAlt: "Construction drawings",
  },
  {
    slug: "foundation-inspections-2",
    title: "Foundation Inspections",
    category: "Foundation Inspections",
    summary: "Foundation review and reporting with practical recommendations.",
    body: [
      "Inspection output included observed conditions and engineering interpretation.",
      "Recommendations were structured for prompt action by owners and contractors.",
    ],
    image: "/media/IMG_0923.jpg",
    imageAlt: "Foundation inspection project",
  },
  {
    slug: "building-rooftop",
    title: "Building Rooftop",
    category: "Telecommunications",
    summary: "Rooftop structural assessments for telecom equipment deployment.",
    body: [
      "Work covered structural feasibility and integration constraints.",
      "Design support minimized change orders during installation.",
    ],
    image: "/media/IMG_0891-1.jpg",
    imageAlt: "Building rooftop",
  },
  {
    slug: "telecommunication",
    title: "Guyed Tower",
    category: "Telecommunications",
    summary: "Analysis and engineering support for guyed tower work.",
    body: [
      "The project required structural checks and documentation for implementation.",
      "Engineering deliverables aligned with project schedule expectations.",
    ],
    image: "/media/2.jpg",
    imageAlt: "Guyed tower",
  },
  {
    slug: "self-support-tower",
    title: "Self Support Tower",
    category: "Telecommunications",
    summary: "Structural engineering for self-support tower projects.",
    body: [
      "Scope included analysis, design intent, and execution-focused documents.",
      "The final package supported efficient handoff to field teams.",
    ],
    image: "/media/A92A3605.jpg",
    imageAlt: "Self support tower",
  },
];

export const careers: Career[] = [
  {
    slug: "real-estate-agents",
    title: "Real Estate Agents",
    summary:
      "Help clients navigate transactions with engineering-backed property insight.",
    responsibilities: [
      "Guide buyers and sellers through listing and transaction process",
      "Coordinate with engineering team to align client expectations",
      "Maintain responsive communication and documentation",
    ],
    requirements: [
      "Active real estate license",
      "Strong communication and client management",
      "Experience in residential or commercial transactions",
    ],
  },
  {
    slug: "civil-engineers",
    title: "Civil / Structural Engineers",
    summary:
      "Deliver civil and structural services across telecom, foundations, and property projects.",
    responsibilities: [
      "Prepare structural analyses and engineering reports",
      "Support drawing production and quality checks",
      "Collaborate with field and project stakeholders",
    ],
    requirements: [
      "Civil or structural engineering degree",
      "Experience with design and analysis workflows",
      "Clear technical writing and communication",
    ],
  },
];

export const aboutPage = {
  title: "About Wave",
  intro:
    "Wave Groups provides consulting in telecommunications, foundation inspections, and residential and commercial engineering support.",
  paragraphs: [
    "We focus on practical engineering solutions, reliable communication, and quick turnaround timelines.",
    "Our work is built around long-term client relationships, and most projects come from repeat business and referrals.",
  ],
};
