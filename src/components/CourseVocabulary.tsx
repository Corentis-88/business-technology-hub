import { ArrowUpRight, BookOpenText, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { anchorForTerm } from "../lib/topicNavigation";
import type { Course } from "../types";

export function CourseVocabulary({ course }: { course: Course }) {
  const termCount = course.units.reduce((total, unit) => total + unit.topics.reduce((topicTotal, topic) => topicTotal + topic.keyTerms.length, 0), 0);
  return (
    <section className="course-vocabulary" aria-labelledby="course-vocabulary-title">
      <div className="section-heading"><div><span className="eyebrow">Key vocabulary</span><h2 id="course-vocabulary-title">Find the term, then jump to the explanation</h2></div><p>{termCount} important terms are linked directly to the section that teaches them, so you can get back on track quickly.</p></div>
      <div className="vocabulary-units">{course.units.map((unit) => {
        const unitTerms = unit.topics.flatMap((topic) => topic.keyTerms.map((term) => ({ topic, term })));
        return <details key={unit.id}><summary><span><BookOpenText /><b>{unit.code} · {unit.title}</b><small>{unitTerms.length} linked terms</small></span><ChevronDown /></summary><div className="vocabulary-link-grid">{unitTerms.map(({ topic, term }) => <Link key={`${topic.id}-${term.term}`} to={`/course/${course.slug}/unit/${unit.id}/topic/${topic.id}#${anchorForTerm(topic, term)}`}><span><strong>{term.term}</strong><small>{topic.code} · {topic.title}</small></span><ArrowUpRight /></Link>)}</div></details>;
      })}</div>
    </section>
  );
}
