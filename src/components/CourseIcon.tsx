import { BriefcaseBusiness, Cpu, Palette, Rocket, type LucideProps } from "lucide-react";
import type { Course } from "../types";

const icons = { briefcase: BriefcaseBusiness, rocket: Rocket, cpu: Cpu, palette: Palette };

export function CourseIcon({ icon, ...props }: { icon: Course["icon"] } & LucideProps) {
  const Icon = icons[icon];
  return <Icon aria-hidden="true" {...props} />;
}
