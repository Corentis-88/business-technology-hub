import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { VisualSiteEditor } from "../admin/editors/VisualSiteEditor";
import { createEditableSnapshotFromBaselines } from "../content";

describe("visual studio editor", () => {
  it("opens on a recognisable homepage canvas with real drag controls", () => {
    const bundle = createEditableSnapshotFromBaselines();
    render(<VisualSiteEditor bundle={bundle} onChange={vi.fn()} assets={[]} onAssetsChange={vi.fn()} />);

    expect(screen.getByRole("heading", { name: "Move the page, then edit what you see" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Homepage" })).toHaveClass("active");
    expect(screen.getByRole("button", { name: "Drag Hero and search" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Drag Qualifications" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Drag Revision tools" })).toBeInTheDocument();
    expect(screen.getByText("MEA Business and Technology Hub")).toBeInTheDocument();
  });

  it("switches to a draggable Revision Topic page", () => {
    const bundle = createEditableSnapshotFromBaselines();
    render(<VisualSiteEditor bundle={bundle} onChange={vi.fn()} assets={[]} onAssetsChange={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Revision topic" }));
    expect(screen.getByRole("combobox", { name: "Revision topic" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Enterprise and entrepreneurship" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Drag Change creates business opportunities" })).toBeInTheDocument();
  });
});
