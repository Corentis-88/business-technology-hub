import { ArrowDown, ArrowRight, BookOpen, CheckCircle2, ChevronDown, Layers3, Network, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { topicSectionAnchor } from "../lib/topicNavigation";
import type { Course, KeyTerm, Topic, TopicSection, Unit } from "../types";

function firstSentence(text: string) {
  const match = text.match(/^.*?[.!?](?:\s|$)/);
  return (match?.[0] ?? text).trim();
}

function relationship(section: TopicSection) {
  const heading = section.heading.toLowerCase();
  if (/impact|effect|risk|reward|benefit|influence/.test(heading)) return "leads to";
  if (/cost|finance|cash|revenue|profit|data|measure|performance/.test(heading)) return "is measured by";
  if (/plan|create|build|production|develop|design|prepare/.test(heading)) return "requires";
  if (/compare|choice|option|versus|strategy/.test(heading)) return "is compared through";
  if (/process|cycle|flow|sequence|algorithm/.test(heading)) return "moves through";
  return "includes";
}

function relatedTerms(topic: Topic, section: TopicSection, fallback?: KeyTerm) {
  const content = [section.heading, ...section.paragraphs, ...(section.bullets ?? [])].join(" ").toLowerCase();
  const matches = topic.keyTerms.filter((term) => content.includes(term.term.toLowerCase())).slice(0, 3);
  if (!matches.length && fallback) return [fallback];
  return matches;
}

interface ConceptMapProps {
  topic: Topic;
  compact?: boolean;
  courseSlug?: string;
  unitId?: string;
}

export function ConceptMap({ topic, compact = false, courseSlug, unitId }: ConceptMapProps) {
  const mapId = `concept-map-${topic.id}`;
  const sectionBranches = topic.sections.slice(0, 6).map((section, index) => {
    const terms = relatedTerms(topic, section, topic.keyTerms[index % topic.keyTerms.length]);
    const details = [
      ...section.paragraphs.slice(0, 2).map(firstSentence),
      ...(section.bullets ?? []).slice(0, 3),
      ...(section.formula ? [`Formula: ${section.formula}`] : []),
      ...(section.example ? [`Example: ${firstSentence(section.example)}`] : []),
    ];
    return {
      heading: section.heading,
      relation: relationship(section),
      detail: section.formula ?? section.bullets?.[0] ?? firstSentence(section.paragraphs[0]),
      details: [...new Set(details)].slice(0, 5),
      terms,
      sectionIndex: index,
    };
  });
  const extraTerms = topic.keyTerms
    .filter((term) => !sectionBranches.some((branch) => branch.heading.toLowerCase().includes(term.term.toLowerCase())))
    .slice(0, Math.max(0, 4 - sectionBranches.length))
    .map((term) => ({ heading: term.term, relation: "is defined as", detail: term.definition, details: [term.definition, `Connect this term to: ${topic.summary}`], terms: [term], sectionIndex: 0 }));
  const fallbackBranches = [
    { heading: "Exam connection", relation: "is applied by", detail: topic.examTips[0], details: topic.examTips.slice(0, 3), terms: [] as KeyTerm[], sectionIndex: 0 },
    { heading: "Common misconception", relation: "is checked by", detail: topic.commonMistakes[0], details: topic.commonMistakes.slice(0, 3), terms: [] as KeyTerm[], sectionIndex: 0 },
  ];
  const initialBranches = [...sectionBranches, ...extraTerms];
  const branches = [...initialBranches, ...fallbackBranches.slice(0, Math.max(0, 4 - initialBranches.length))].slice(0, 6);

  return (
    <figure className={`concept-map ${compact ? "concept-map--compact" : ""}`} aria-labelledby={`${mapId}-title`}>
      <header className="concept-map__header">
        <div><span className="eyebrow"><Network size={15} /> Completed concept map</span><h2 id={`${mapId}-title`}>{topic.title}</h2><p>Open a high-level box to reveal its supporting detail, vocabulary and route back into the lesson.</p></div>
        {!compact && <button type="button" className="button button--ghost" onClick={() => window.print()}><Printer size={16} /> Print map</button>}
      </header>
      <div className="concept-map__diagram">
        <div className="concept-map__centre"><small>Central topic</small><strong>{topic.title}</strong><span>{topic.code}</span></div>
        <div className="concept-map__connector" aria-hidden="true"><i /><ArrowDown /><span>connects to</span></div>
        <div className="concept-map__branches">
          {branches.map((branch) => (
            <details className="concept-map__branch" key={branch.heading}>
              <summary>
                <span className="concept-map__relation">{branch.relation}</span>
                <h3>{branch.heading}</h3>
                <p>{branch.detail}</p>
                <small>Open this connection <ChevronDown size={16} /></small>
              </summary>
              <div className="concept-map__reveal">
                <strong>What sits inside this branch</strong>
                <ul>{branch.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                {branch.terms.length > 0 && <div className="concept-map__terms"><span>Linked vocabulary</span>{branch.terms.map((term) => <b key={term.term}>{term.term}: <i>{term.definition}</i></b>)}</div>}
                {courseSlug && unitId && <Link to={`/course/${courseSlug}/unit/${unitId}/topic/${topic.id}#${topicSectionAnchor(topic, branch.sectionIndex)}`}>Read this part of the topic <ArrowRight size={15} /></Link>}
              </div>
            </details>
          ))}
        </div>
      </div>
      {!compact && <details className="concept-map__outline"><summary>Text version of this map</summary><ul>{branches.map((branch) => <li key={branch.heading}><strong>{topic.title}</strong> {branch.relation} <strong>{branch.heading}</strong>: {branch.details.join(" ")}</li>)}</ul></details>}
      <figcaption>{topic.summary}</figcaption>
    </figure>
  );
}

export function UnitConceptMap({ course, unit, onSelectTopic }: { course: Course; unit: Unit; onSelectTopic: (topicId: string) => void }) {
  return (
    <figure className="unit-concept-map" aria-labelledby={`unit-map-${unit.id}`}>
      <header><span className="eyebrow"><Layers3 size={15} /> Unit overview</span><h2 id={`unit-map-${unit.id}`}>{unit.code} · {unit.title}</h2><p>Each high-level box is a topic in this unit. Open a box to reveal its sections, essential vocabulary and next links.</p></header>
      <div className="unit-map__centre"><small>Unit</small><strong>{unit.title}</strong><span>{unit.topics.length} connected topics</span></div>
      <div className="unit-map__connector" aria-hidden="true"><ArrowDown /><span>is made up of</span></div>
      <div className="unit-map__topics">{unit.topics.map((topic) => <details key={topic.id}><summary><span>{topic.code}</span><h3>{topic.title}</h3><p>{topic.summary}</p><small>Open topic detail <ChevronDown size={16} /></small></summary><div className="unit-map__reveal"><div><strong>Information inside this topic</strong><ul>{topic.sections.map((section) => <li key={section.heading}>{section.heading}</li>)}</ul></div><div><strong>Essential vocabulary</strong><p>{topic.keyTerms.slice(0, 5).map((term) => term.term).join(" · ")}</p></div><div className="unit-map__actions"><button type="button" className="button button--secondary" onClick={() => onSelectTopic(topic.id)}>Show completed topic map</button><Link className="text-link" to={`/course/${course.slug}/unit/${unit.id}/topic/${topic.id}`}><BookOpen size={15} /> Open topic guide</Link></div></div></details>)}</div>
      <figcaption>{unit.description}</figcaption>
    </figure>
  );
}
