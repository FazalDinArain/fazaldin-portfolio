import { seoMeta } from "@/config/seo-meta";

export const site = {
  name: "FazalDin",
  title: seoMeta.homeTitle,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fazaldin.vercel.app",
  email: "fazaldinarain@gmail.com",
  phone: "+923033833081",
  github: "https://github.com/FazalDinBidec",
  linkedin: "https://linkedin.com/in/fazaldin-arain",
  cvUrl: "/FazalDinArainCV.pdf",
  hero: {
    greeting: "Hi, I'm FazalDin",
    headline: "Full-Stack Developer",
    subtitle: "I build modern, scalable web applications and RESTful APIs.",
    tags: ["Laravel", "NestJS", "React", "Next.js", "REST APIs"],
  },
  jsonLd: {
    jobTitle: "Full-Stack Developer",
    knowsAbout: [
      "Laravel",
      "NestJS",
      "REST APIs",
      "MySQL",
      "PostgreSQL",
      "React",
      "Next.js",
      "Backend Development",
      "Database Design",
      "TypeScript",
      "PHP",
      "Node.js",
    ],
  },
  defaultDescription: seoMeta.homeDescription,
} as const;
