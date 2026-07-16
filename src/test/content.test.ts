import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { baselineHomepageBlocks } from "../content/defaults";
import { homepageBlocks, siteSettings } from "../content/resolved";
import { publishedContentOverride } from "../content/published";
import { createEditableSnapshotFromBaselines } from "../content/snapshot";
import { validateContentBundle } from "../content/validation";
import { baselineCourses, courses } from "../data/courses";
import { baselinePracticeCases, practiceCases } from "../data/extendedWriting";
import { baselineResources, resources } from "../data/resources";
import { HomePage } from "../pages/HomePage";

describe("versioned editable content seam", () => {
  it("preserves the current public baselines while no override is published", () => {
    expect(publishedContentOverride).toBeNull();
    expect(courses).toBe(baselineCourses);
    expect(resources).toBe(baselineResources);
    expect(practiceCases).toBe(baselinePracticeCases);
    expect(homepageBlocks).toBe(baselineHomepageBlocks);
    expect(homepageBlocks.map((block) => block.type)).toEqual(["hero", "courses", "tools"]);
    expect(homepageBlocks.every((block) => block.visible)).toBe(true);
  });

  it("keeps the default homepage order and public copy unchanged", () => {
    const { container } = render(createElement(MemoryRouter, null, createElement(HomePage)));
    expect(Array.from(container.children).map((element) => element.getAttribute("class"))).toEqual([
      "hero",
      "page-section subject-section",
      "page-section hub-tools",
    ]);
    expect(screen.getByRole("heading", { name: "Business & Technology Hub" })).toBeInTheDocument();
    expect(screen.getByText("Helping you easily learn and revise Business and Technology qualifications")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Start with the course you're working towards" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What would help you most today?" })).toBeInTheDocument();
    expect(container.querySelector(".home-custom-block")).toBeNull();
  });

  it("creates a complete, detached and valid editable snapshot", () => {
    const snapshot = createEditableSnapshotFromBaselines({ contentVersion: 7, updatedAt: "2026-07-10T09:00:00.000Z" });

    expect(snapshot.schemaVersion).toBe(1);
    expect(snapshot.contentVersion).toBe(7);
    expect(snapshot.courses).toHaveLength(baselineCourses.length);
    expect(snapshot.resources).toHaveLength(baselineResources.length);
    expect(snapshot.practiceCases).toHaveLength(baselinePracticeCases.length);
    expect(snapshot.siteSettings.siteName).toBe("Business & Technology Hub");
    expect(snapshot.homepageBlocks.map((block) => block.type)).toEqual(["hero", "courses", "tools"]);
    expect(snapshot.homepageBlocks).not.toBe(baselineHomepageBlocks);
    expect(snapshot.customPages).toEqual([]);
    expect(snapshot.enterpriseSimpleGuides.length).toBeGreaterThan(0);
    expect(Object.keys(snapshot.enterpriseSimpleVisuals).length).toBeGreaterThan(0);
    expect(snapshot.courses).not.toBe(baselineCourses);
    expect(snapshot.courses.flatMap((course) => course.units.flatMap((unit) => unit.topics.flatMap((topic) => topic.sections))).every((section) => section.id.length > 0)).toBe(true);
    expect(validateContentBundle(snapshot)).toEqual([]);
  });

  it("reports unsafe or structurally broken edits before publication", () => {
    const snapshot = createEditableSnapshotFromBaselines();
    const business = snapshot.courses.find((course) => course.id === "business")!;
    const enterprise = snapshot.courses.find((course) => course.id === "enterprise")!;
    const topic = business.units[0].topics[0];
    const section = topic.sections[0];

    section.id = "";
    section.paragraphs = ["   "];
    section.image = { src: "uploads/example.webp", alt: "", caption: "Example" };
    topic.quiz[0].options = ["Only one option"];
    topic.quiz[0].answer = 4;
    snapshot.resources[1].id = snapshot.resources[0].id;
    snapshot.resources[0].href = "javascript:alert('unsafe')";
    business.answerMethod!.scope = "Use BLT for every qualification";
    enterprise.answerMethod = structuredClone(business.answerMethod);
    snapshot.enterpriseSimpleGuides = snapshot.enterpriseSimpleGuides.filter((guide) => guide.topicId !== enterprise.units[0].topics[0].id);
    snapshot.homepageBlocks = snapshot.homepageBlocks.filter((block) => block.type !== "tools");
    snapshot.homepageBlocks.push({ id: "hero-copy", type: "hero", visible: true });
    snapshot.homepageBlocks.push({ id: "bad-text", type: "text", visible: true, title: "", body: [" "] });
    snapshot.homepageBlocks.push({ id: "bad-image", type: "image", visible: true, title: "Image", image: { src: "javascript:alert('unsafe')", alt: "", caption: "" } });

    const codes = new Set(validateContentBundle(snapshot).map((issue) => issue.code));
    expect([...codes]).toEqual(expect.arrayContaining([
      "empty-id",
      "duplicate-id",
      "missing-section-text",
      "missing-image-alt",
      "bad-quiz-options",
      "bad-quiz-answer",
      "bad-resource-url",
      "business-blt-scope",
      "blt-outside-business",
      "missing-simple-guide",
      "missing-home-block",
      "duplicate-home-block",
      "missing-home-block-text",
      "missing-home-image-alt",
      "bad-home-block-url",
    ]));
  });
});
