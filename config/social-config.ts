import { SocialConfig } from "@/types";

const site_url = process.env.NEXT_PUBLIC_APP_URL;

export const socialConfig: SocialConfig = {
  name: "Alpha",
  description:
    "Com nosso sistema de gerenciamento de produtos, você pode adicionar, editar e excluir produtos num piscar de olhos.",
  url: site_url || "http://localhost:3000",
  links: {
    linkedin: "https://www.linkedin.com/in/fernandoblima1/",
    github: "https://github.com/fernandoblima1",
  },
  mailSupport: "luisfborges2002@gmail.com",
};
