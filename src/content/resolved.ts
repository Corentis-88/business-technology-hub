import { baselineCustomPages, baselineHomepageBlocks, baselineSiteSettings } from "./defaults";
import { publishedContentOverride } from "./published";

export const siteSettings = publishedContentOverride?.siteSettings ?? baselineSiteSettings;
export const homepageBlocks = publishedContentOverride?.homepageBlocks ?? baselineHomepageBlocks;
export const customPages = publishedContentOverride?.customPages ?? baselineCustomPages;
