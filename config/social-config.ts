import { SocialConfig } from "@/types";

const site_url = process.env.NEXT_PUBLIC_APP_URL;

export const socialConfig: SocialConfig = {
  name: "Alpha",
  description:
    "Badget revolutionizes real estate listings with AI-driven efficiency. Streamline your workflow with intuitive tools and seamless integrations. Projectx is tailored for the modern real estate professional who values precision, security, and scalability.",
  url: site_url || "http://localhost:3000",
  links: {
    linkedin: "https://www.linkedin.com/in/fernandoblima1/",
    github: "https://github.com/fernandoblima1",
  },
  mailSupport: "luisfborges2002@gmail.com",
};
