import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

function removePrivateResearchFromBuild() {
  return {
    name: "remove-private-research-from-build",
    closeBundle() {
      const output = join(process.cwd(), "dist");
      for (const entry of readdirSync(output, { withFileTypes: true })) {
        if (entry.isFile() && /\.(md|csv|json)$/i.test(entry.name)) rmSync(join(output, entry.name));
      }
      rmSync(join(output, "branding", "mea-official-logo.svg"), { force: true });
      const officialDocuments = join(output, "official-documents");
      for (const entry of readdirSync(officialDocuments, { withFileTypes: true })) {
        if (entry.isFile() && /^mea-/i.test(entry.name)) rmSync(join(officialDocuments, entry.name), { force: true });
      }
    },
  };
}

export default defineConfig(({ command }) => ({
  base: process.env.VITE_BASE_PATH ?? (command === "build" ? "/business-technology-hub/" : "/"),
  plugins: [react(), removePrivateResearchFromBuild()],
  publicDir: "research",
  server: { port: 4173, strictPort: true },
  preview: { port: 4173, strictPort: true },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true
  }
}));
