import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { R068CourseworkVisual } from "../components/R068CourseworkVisual";

describe("R068 Coursework Assist visuals", () => {
  const expected = [
    [1, "Turn answers into useful evidence"],
    [2, "Build one customer from real findings"],
    [3, "Make every design label earn its place"],
    [4, "Show how feedback changes the design"],
    [5, "See how the figures connect"],
    [6, "Judge the risk, then plan a response"],
  ] as const;

  it.each(expected)("shows the task %i teaching visual", (task, title) => {
    const { unmount } = render(<R068CourseworkVisual task={task} />);
    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    expect(screen.getByText(/Replace every example with information from your assignment/i)).toBeInTheDocument();
    unmount();
  });

  it("explains the break-even chart to screen-reader users", () => {
    render(<R068CourseworkVisual task={5} />);
    expect(screen.getByRole("img", { name: /revenue line crosses the total costs line/i })).toBeInTheDocument();
  });
});
