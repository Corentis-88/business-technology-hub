import { ArrowRight, BookOpenCheck, ChevronRight, Clock3, FileCheck2, FileQuestion, GraduationCap, HeartHandshake, Network, PenLine, Scale } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { CourseIcon } from "../components/CourseIcon";
import { CourseVocabulary } from "../components/CourseVocabulary";
import { ResourceGrid } from "../components/ResourceGrid";
import { SearchBox } from "../components/SearchBox";
import { courseBySlug } from "../data/courses";
import { resources } from "../data/resources";
import { NotFoundPage } from "./NotFoundPage";

export function CoursePage() {
  const { courseSlug } = useParams();
  const course = courseBySlug(courseSlug);
  if (!course) return <NotFoundPage />;
  const topics = course.units.flatMap((unit) => unit.topics);
  const courseResources = resources.filter((item) => item.courseId === course.id).slice(0, 4);
  return (
    <div style={{ "--course-accent": course.accent } as React.CSSProperties}>
      <section className="course-hero">
        <div className="course-hero__inner">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronRight size={14} /><span>{course.shortTitle}</span></nav>
          <div className="course-hero__content">
            <div className="course-hero__icon"><CourseIcon icon={course.icon} size={40} /></div>
            <div><span className="eyebrow">{course.examBoard} · {course.code}</span><h1>{course.shortTitle}</h1><p>{course.qualification}</p></div>
            <div className="course-guide-count"><strong>{topics.length}</strong><span>visual topic guides</span></div>
          </div>
          <div className="course-search"><span className="course-search__label">Search within {course.shortTitle}</span><SearchBox courseId={course.id} /></div>
        </div>
      </section>
      <section className="page-section course-overview">
        <div className="course-welcome"><HeartHandshake /><div><strong>You're working towards {course.shortTitle}, and every topic you understand moves you closer to the result you want.</strong><p>Take the course one unit at a time. Use the search, vocabulary links and visual maps whenever you need a quicker route back into the material.</p></div></div>
        <div className="course-facts"><div><GraduationCap /><span>Qualification</span><strong>{course.code}</strong></div><div><Clock3 /><span>Assessment</span><strong>{course.assessmentSummary}</strong></div><div><BookOpenCheck /><span>Coverage</span><strong>{topics.length} topic guides</strong></div>{course.id === "enterprise" || course.id === "creative-imedia" ? <div><Scale /><span>NEA rule</span><strong>Practice skills only</strong></div> : <div><FileCheck2 /><span>Revision flow</span><strong>Learn → Map → Quiz → Apply</strong></div>}</div>
        <nav className="course-action-row" aria-label={`${course.shortTitle} revision tools`}>
          <Link to={`/concept-maps?course=${course.id}`}><Network /><span><b>Concept maps</b><small>Completed visual overviews</small></span><ArrowRight /></Link>
          <Link to={`/revision?course=${course.id}`}><FileQuestion /><span><b>Build a quiz</b><small>Topic, amount and difficulty</small></span><ArrowRight /></Link>
          <Link to={`/materials?course=${course.id}`}><BookOpenCheck /><span><b>Official materials</b><small>Papers, reports and specifications</small></span><ArrowRight /></Link>
          {course.id === "business" && <Link to="/business/extended-writing"><PenLine /><span><b>Extended writing</b><small>Case evidence and connected strands</small></span><ArrowRight /></Link>}
        </nav>
        {course.answerMethod && <Link to="/business/blt" className="method-banner"><div><span className="eyebrow">Pearson Business answer method</span><h2>{course.answerMethod.shortName}: {course.answerMethod.name}</h2><p>{course.answerMethod.pattern}</p></div><span className="button button--primary">Open BLT builder <ArrowRight size={17} /></span></Link>}
        <div className="unit-list">
          <div className="section-heading"><div><span className="eyebrow">Course map</span><h2>Choose a unit</h2></div><p>{course.description}</p></div>
          {course.units.map((unit, index) => (
            <article className="unit-card" key={unit.id}>
              <div className="unit-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="unit-card__main"><div className="unit-card__heading"><div><span className="eyebrow">{unit.code} · {unit.weight}</span><h2>{unit.title}</h2><p>{unit.description}</p></div><div className="unit-assessment"><span>Assessment</span><strong>{unit.assessment}</strong></div></div>
                <div className="topic-link-grid">{unit.topics.map((topic) => <Link key={topic.id} to={`/course/${course.slug}/unit/${unit.id}/topic/${topic.id}`}><span className="topic-code-chip">{topic.code}</span><span><strong>{topic.title}</strong><small>Learn · Concept map · Quiz · Exam</small></span><ChevronRight size={17} /></Link>)}</div>
              </div>
            </article>
          ))}
        </div>
        <CourseVocabulary course={course} />
        <section className="course-materials-preview"><div className="section-heading"><div><span className="eyebrow">Trusted materials</span><h2>Start with the official sources</h2></div><Link className="text-link" to={`/materials?course=${course.id}`}>View all materials <ArrowRight size={16} /></Link></div><ResourceGrid resources={courseResources} /></section>
      </section>
    </div>
  );
}
