import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Course } from "../types";
import { CourseIcon } from "./CourseIcon";

export function CourseCard({ course }: { course: Course }) {
  const topics = course.units.flatMap((unit) => unit.topics);
  return (
    <Link to={`/course/${course.slug}`} className="course-card" style={{ "--course-accent": course.accent } as React.CSSProperties}>
      <div className="course-card__icon"><CourseIcon icon={course.icon} size={28} /></div>
      <div className="course-card__body">
        <span className="eyebrow">{course.examBoard} · {course.code}</span>
        <h3>{course.shortTitle}</h3>
        <p>{course.description}</p>
        <div className="course-card__meta"><span>{course.units.length} units</span><span>{topics.length} topic guides</span></div>
        <span className="course-card__button">Open qualification <ArrowRight size={16} /></span>
      </div>
    </Link>
  );
}
