import { BrainCircuit, CheckCircle2, Clock3, Play, RefreshCw, SlidersHorizontal, Target } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Quiz } from "../components/Quiz";
import { CourseIcon } from "../components/CourseIcon";
import { courses } from "../data/courses";
import { createQuizSession, difficultyFromSlider, difficultyLabel } from "../lib/quizEngine";
import type { CourseId, QuizDifficulty } from "../types";

interface ActiveQuizSettings {
  courseId: CourseId;
  topicId?: string;
  difficulty: QuizDifficulty;
  count: number;
  seed: number;
}

export function RevisionPage() {
  const [params] = useSearchParams();
  const requestedCourse = params.get("course") as CourseId | null;
  const initialCourse = courses.some((item) => item.id === requestedCourse) ? requestedCourse! : "business";
  const [courseId, setCourseId] = useState<CourseId>(initialCourse);
  const [topicId, setTopicId] = useState("all");
  const [difficultyValue, setDifficultyValue] = useState(2);
  const [questionCount, setQuestionCount] = useState(10);
  const [active, setActive] = useState<ActiveQuizSettings>({ courseId: initialCourse, difficulty: "medium", count: 10, seed: 1 });
  const course = courses.find((item) => item.id === courseId)!;
  const activeCourse = courses.find((item) => item.id === active.courseId)!;
  const questionMaximum = topicId === "all" ? 50 : 20;
  const session = useMemo(() => createQuizSession({ course: activeCourse, topicId: active.topicId, difficulty: active.difficulty, count: active.count, seed: active.seed }), [active, activeCourse]);

  const chooseCourse = (nextCourseId: CourseId) => {
    setCourseId(nextCourseId);
    setTopicId("all");
    setQuestionCount(10);
    setActive({ courseId: nextCourseId, difficulty: difficultyFromSlider(difficultyValue), count: 10, seed: Date.now() });
  };

  const chooseTopic = (value: string) => {
    setTopicId(value);
    if (value !== "all" && questionCount > 20) setQuestionCount(20);
  };

  const startQuiz = (event: FormEvent) => {
    event.preventDefault();
    setActive({ courseId, topicId: topicId === "all" ? undefined : topicId, difficulty: difficultyFromSlider(difficultyValue), count: Math.min(questionCount, questionMaximum), seed: Date.now() });
  };

  const newQuestionSet = () => setActive((current) => ({ ...current, seed: current.seed + 1 }));

  return (
    <div className="page-section revision-page">
      <header className="page-hero compact"><span className="eyebrow">Quiz centre</span><h1>Build a quiz for one qualification</h1><p>Choose the qualification first, then cover its full specification or focus on one topic. Questions never cross into another qualification.</p></header>
      <section className="revision-course-picker"><div className="section-heading"><div><span className="eyebrow">Step 1</span><h2>Choose a qualification</h2></div><p>Every question stays inside the exact qualification you select.</p></div><div className="revision-course-grid">{courses.map((item) => <button type="button" key={item.id} aria-pressed={courseId === item.id} style={{ "--course-accent": item.accent } as React.CSSProperties} onClick={() => chooseCourse(item.id)}><CourseIcon icon={item.icon} /><span><strong>{item.shortTitle}</strong><small>{item.code}</small></span>{courseId === item.id && <CheckCircle2 />}</button>)}</div></section>
      <section className="quiz-builder" style={{ "--course-accent": course.accent } as React.CSSProperties}>
        <div className="quiz-builder__heading"><SlidersHorizontal aria-hidden="true" /><div><span className="eyebrow">Step 2 · {course.shortTitle}</span><h2>Choose the quiz settings</h2><p>Review the topic, question count and difficulty before starting.</p></div></div>
        <form onSubmit={startQuiz}>
          <div className="quiz-setting quiz-setting--topic"><label htmlFor="quiz-topic">Question focus</label><select id="quiz-topic" value={topicId} onChange={(event) => chooseTopic(event.target.value)}><option value="all">Whole {course.shortTitle} qualification</option>{course.units.map((unit) => <optgroup key={unit.id} label={`${unit.code} · ${unit.title}`}>{unit.topics.map((topic) => <option key={topic.id} value={topic.id}>{topic.code} · {topic.title}</option>)}</optgroup>)}</select><small>{topicId === "all" ? `This quiz uses topics from ${course.shortTitle} only and can contain up to 50 questions.` : `This quiz stays within the selected ${course.shortTitle} topic and can contain up to 20 questions.`}</small></div>
          <div className="quiz-setting quiz-setting--range"><div className="quiz-setting__label"><label htmlFor="quiz-amount">Number of questions</label><output htmlFor="quiz-amount">{questionCount}</output></div><input id="quiz-amount" type="range" min="1" max={questionMaximum} step="1" value={questionCount} onChange={(event) => setQuestionCount(Number(event.target.value))} /><div className="range-labels" aria-hidden="true"><span>1</span><span>{questionMaximum}</span></div></div>
          <div className="quiz-setting quiz-setting--range"><div className="quiz-setting__label"><label htmlFor="quiz-difficulty">Difficulty</label><output htmlFor="quiz-difficulty">{difficultyLabel(difficultyFromSlider(difficultyValue))}</output></div><input id="quiz-difficulty" type="range" min="1" max="3" step="1" value={difficultyValue} onChange={(event) => setDifficultyValue(Number(event.target.value))} aria-valuetext={difficultyLabel(difficultyFromSlider(difficultyValue))} /><div className="range-labels range-labels--three" aria-hidden="true"><span>Low</span><span>Medium</span><span>High</span></div></div>
          <button type="submit" className="button button--primary"><Play size={17} aria-hidden="true" /> Start this quiz</button>
        </form>
      </section>
      <div className="revision-dashboard revision-dashboard--single">
        <section className="revision-main"><div className="section-heading"><div><span className="eyebrow">Step 3 · {activeCourse.shortTitle}</span><h2>{active.topicId ? activeCourse.units.flatMap((unit) => unit.topics).find((topic) => topic.id === active.topicId)?.title : `${activeCourse.shortTitle} qualification quiz`}</h2><p>{difficultyLabel(active.difficulty)} difficulty · {active.count} question{active.count === 1 ? "" : "s"} · {activeCourse.code} only</p></div><button type="button" className="button button--ghost" onClick={newQuestionSet}><RefreshCw size={17} /> New question set</button></div>{session.usesReinforcement && <p className="quiz-reinforcement-note" role="note">This longer session revisits some core ideas in clearly labelled reinforcement checks. Their order and answer positions change so retrieval remains active.</p>}<Quiz key={`${active.courseId}-${active.topicId ?? "all"}-${active.difficulty}-${active.count}-${active.seed}`} questions={session.questions} courseId={active.courseId} topicId={active.topicId ?? `${active.courseId}-qualification`} title={active.topicId ? "Focused retrieval" : `${activeCourse.shortTitle} qualification retrieval`} showSourceTopic={!active.topicId} /></section>
      </div>
      <section className="revision-method"><div><Clock3 /><span>Choose the length</span><p>Run a one-question check or build a longer 50-question qualification session.</p></div><div><BrainCircuit /><span>Adjust the challenge</span><p>Move from direct recall through understanding to applied reasoning.</p></div><div><Target /><span>One qualification only</span><p>Cover the full selected course or focus on one topic without crossing into another qualification.</p></div></section>
    </div>
  );
}
