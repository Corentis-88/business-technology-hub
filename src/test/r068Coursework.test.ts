import { describe, expect, it } from "vitest";
import { r068CourseworkGuides } from "../data/r068Coursework";

describe("R068 coursework guidance", () => {
  it("covers all six tasks and preserves the 60-mark structure", () => {
    const guides = Object.values(r068CourseworkGuides);
    expect(guides).toHaveLength(6);
    expect(guides.map((guide) => guide.task)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(guides.reduce((total, guide) => total + guide.marks, 0)).toBe(60);
  });

  it("gives accessible planning support without presenting a model answer", () => {
    for (const guide of Object.values(r068CourseworkGuides)) {
      expect(guide.wordCountGuide.length).toBeGreaterThan(5);
      expect(guide.sections.length).toBeGreaterThan(1);
      expect(guide.finalChecks.length).toBeGreaterThan(2);
      expect(guide.sections.every((section) => section.include.length > 1)).toBe(true);
      expect(guide.sections.every((section) => section.prompts.length > 1)).toBe(true);
      expect(guide.sections.every((section) => section.starters.length > 1)).toBe(true);
    }
    const publicGuidance = JSON.stringify(r068CourseworkGuides).toLowerCase();
    expect(publicGuidance).not.toContain("candidate exemplar");
    expect(publicGuidance).not.toContain("distinction star");
    expect(publicGuidance).not.toContain("class designs");
  });
});
