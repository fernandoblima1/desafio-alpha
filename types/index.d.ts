import type { Icon } from "lucide-react";

import { Icons } from "@/components/shared/icons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type SocialConfig = {
  name: string;
  description: string;
  url: string;
  mailSupport: string;
  links: {
    linkedin: string;
    github: string;
  };
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export type UpdateProduct = {
  name: string;
  description: string;
  price: number;
  stock: number;
};
