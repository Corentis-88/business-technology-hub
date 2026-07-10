import type { CustomPage, HomeLayoutBlock, SiteSettings } from "../types";

export const baselineSiteSettings: SiteSettings = {
  id: "mea-site-settings",
  siteName: "MEA Business and Technology Hub",
  tagline: "Helping you easily learn and revise topics at MEA in Business and Technology",
  schoolName: "Manchester Enterprise Academy",
  logoSrc: "branding/mea-official-logo.svg",
  logoAlt: "Manchester Enterprise Academy",
};

export const baselineCustomPages: CustomPage[] = [];

export const baselineHomepageBlocks: HomeLayoutBlock[] = [
  { id: "hero", type: "hero", visible: true },
  { id: "courses", type: "courses", visible: true },
  { id: "tools", type: "tools", visible: true },
];
