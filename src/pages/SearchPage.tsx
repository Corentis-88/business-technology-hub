import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchBox } from "../components/SearchBox";
import { courses } from "../data/courses";
import { searchTopics } from "../lib/search";

export function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";
  const initialCourse = params.get("course") ?? "";
  const [courseFilter, setCourseFilter] = useState(initialCourse);
  const results = useMemo(() => searchTopics(query, courseFilter || undefined), [query, courseFilter]);
  const cleaned = query.trim().toLowerCase();
  const isBLT = ["blt", "because leads to therefore", "business blt"].includes(cleaned);
  const isExtendedWriting = /extended writing|case stud|justify|evaluate/.test(cleaned);
  return (
    <div className="page-section search-page">
      <header className="search-page__header"><span className="eyebrow">Search the whole hub</span><h1>{query ? <>Results for “{query}”</> : "What do you need help with?"}</h1><SearchBox large initialValue={query} autoFocus={!query} /></header>
      {query && <div className="search-tools"><div><SlidersHorizontal size={17} /><strong>Filter by qualification</strong></div><div className="filter-chips"><button type="button" aria-pressed={!courseFilter} onClick={() => setCourseFilter("")}>All</button>{courses.map((course) => <button type="button" key={course.id} aria-pressed={courseFilter === course.id} onClick={() => setCourseFilter(course.id)}>{course.shortTitle}</button>)}</div></div>}
      {isBLT && !courseFilter && <Link to="/business/blt" className="direct-answer"><span className="eyebrow">Best answer · Pearson Business only</span><h2>BLT: Because, Leads To, Therefore</h2><p>Build the business point first, then add <strong>because</strong>. One complete BLT answers one three-mark question.</p><span className="button button--primary">Open interactive BLT builder</span></Link>}
      {isExtendedWriting && (!courseFilter || courseFilter === "business") && <Link to="/business/extended-writing" className="direct-answer"><span className="eyebrow">Pearson Business only</span><h2>Extended writing and case-study strands</h2><p>Practise Analyse, Justify and Evaluate using original case studies, evidence banks, connected BLT strands and completed answers.</p><span className="button button--primary">Open extended writing lab</span></Link>}
      {query && <div className="search-results-heading"><span>{results.length} topic{results.length === 1 ? "" : "s"}</span><p>Results are grouped and labelled so similarly named topics never get mixed between qualifications.</p></div>}
      <div className="search-results">{results.map(({ item }) => { const course = courses.find((entry) => entry.id === item.courseId)!; return <Link key={item.id} to={`/course/${course.slug}/unit/${item.unitId}/topic/${item.topicId}`} style={{ "--course-accent": course.accent } as React.CSSProperties}><div className="result-course"><span>{item.courseTitle}</span><small>{item.courseCode}</small></div><div><span className="eyebrow">{item.topicCode} · {item.unitTitle}</span><h2>{item.title}</h2><p>{item.summary}</p><div className="keyword-row">{item.keywords.slice(0, 4).map((keyword) => <span key={keyword}>{keyword}</span>)}</div></div></Link>; })}</div>
      {query && results.length === 0 && !isBLT && !isExtendedWriting && <div className="empty-state"><Search /><h2>No exact match yet</h2><p>Try a unit code such as R093, a shorter phrase, or one of the qualification filters.</p></div>}
    </div>
  );
}
