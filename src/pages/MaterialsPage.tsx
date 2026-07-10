import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CourseIcon } from "../components/CourseIcon";
import { ResourceGrid } from "../components/ResourceGrid";
import { courses } from "../data/courses";
import { resources } from "../data/resources";
import type { CourseId } from "../types";

export function MaterialsPage() {
  const [params] = useSearchParams();
  const requested = params.get("course") as CourseId | null;
  const initial = courses.some((course) => course.id === requested) ? requested! : courses[0].id;
  const [courseId, setCourseId] = useState<CourseId>(initial);
  const course = courses.find((item) => item.id === courseId)!;
  const filtered = resources.filter((item) => item.courseId === courseId);
  return (
    <div className="page-section materials-page" style={{ "--course-accent": course.accent } as React.CSSProperties}>
      <header className="page-hero compact"><span className="eyebrow">Trusted materials</span><h1>Specifications, papers and reports</h1><p>Select one qualification to view only the materials that belong to that exact course.</p></header>
      <div className="integrity-banner"><ShieldCheck /><div><strong>Assessment-safe resources</strong><p>Only public materials are included. Live Cambridge National assignments and teacher-only candidate exemplars are never stored here.</p></div></div>
      <section className="materials-qualification-picker" aria-labelledby="materials-qualification-title"><div><span className="eyebrow">Qualification</span><h2 id="materials-qualification-title">Choose the course materials</h2></div><div className="materials-course-buttons">{courses.map((item) => <button type="button" key={item.id} aria-pressed={courseId === item.id} style={{ "--course-accent": item.accent } as React.CSSProperties} onClick={() => setCourseId(item.id)}><CourseIcon icon={item.icon} /><span><b>{item.shortTitle}</b><small>{item.examBoard} · {item.code}</small></span></button>)}</div></section>
      <div className="selected-materials-heading"><CourseIcon icon={course.icon} /><div><span className="eyebrow">Currently showing</span><h2>{course.shortTitle}</h2><p>{course.examBoard} · {course.code} · {filtered.length} resources</p></div></div>
      <ResourceGrid resources={filtered} />
    </div>
  );
}
