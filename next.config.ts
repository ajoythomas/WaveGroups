import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/client-login", destination: "/contact-us", permanent: true },
      { source: "/client-login/", destination: "/contact-us", permanent: true },
      { source: "/team", destination: "/about-wave", permanent: true },
      { source: "/team/", destination: "/about-wave", permanent: true },
      { source: "/faqs", destination: "/contact-us", permanent: true },
      { source: "/faqs/", destination: "/contact-us", permanent: true },
      { source: "/portfolio-2-col", destination: "/projects", permanent: true },
      { source: "/portfolio-2-col/", destination: "/projects", permanent: true },
      {
        source: "/enh_portfolio_tax/:path*",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
