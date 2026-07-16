import type { CustomPage, HomeLayoutBlock, SiteSettings } from "../types";

export const baselineSiteSettings: SiteSettings = {
  id: "business-technology-hub-settings",
  siteName: "Business & Technology Hub",
  tagline: "Helping you easily learn and revise Business and Technology qualifications",
  schoolName: "Clear revision for your qualification",
  logoSrc: "branding/business-technology-hub-logo.svg",
  logoAlt: "Business and Technology Hub",
};

export const baselineCustomPages: CustomPage[] = [];

export const baselineHomepageBlocks: HomeLayoutBlock[] = [
  { id: "hero", type: "hero", visible: true },
  { id: "courses", type: "courses", visible: true },
  { id: "tools", type: "tools", visible: true },
];
