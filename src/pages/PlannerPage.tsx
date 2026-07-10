import { CalendarDays, Check, Circle, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { allTopics, courseById, courses } from "../data/courses";
import { useAppState } from "../state/AppState";
import type { CourseId } from "../types";

const today = new Date().toISOString().slice(0, 10);

export function PlannerPage() {
  const { tasks, addTask, toggleTask, removeTask } = useAppState();
  const [courseId, setCourseId] = useState<CourseId>("business");
  const courseTopics = allTopics.filter((item) => item.course.id === courseId);
  const [topicId, setTopicId] = useState(courseTopics[0]?.topic.id ?? "");
  const [date, setDate] = useState(today);
  const [minutes, setMinutes] = useState(25);
  const selected = courseTopics.find(({ topic }) => topic.id === topicId) ?? courseTopics[0];
  const sorted = useMemo(() => [...tasks].sort((a, b) => Number(a.complete) - Number(b.complete) || a.date.localeCompare(b.date)), [tasks]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selected) return;
    addTask({ courseId, topicId: selected.topic.id, title: selected.topic.title, date, minutes });
  };

  return (
    <div className="page-section planner-page">
      <header className="page-hero compact"><span className="eyebrow">Revision planner</span><h1>A small plan you can finish</h1><p>Choose a realistic session and give yourself one clear thing to complete. Small, steady steps still move you forward.</p></header>
      <div className="planner-layout">
        <section className="planner-form-panel"><div className="side-heading"><Plus /><div><span className="eyebrow">Add a session</span><h2>What will you do?</h2></div></div><form onSubmit={submit}>
          <label><span>Qualification</span><select value={courseId} onChange={(event) => { const next = event.target.value as CourseId; setCourseId(next); setTopicId(allTopics.find((item) => item.course.id === next)?.topic.id ?? ""); }}>{courses.map((course) => <option value={course.id} key={course.id}>{course.shortTitle} · {course.code}</option>)}</select></label>
          <label><span>Topic</span><select value={topicId} onChange={(event) => setTopicId(event.target.value)}>{courseTopics.map(({ unit, topic }) => <option value={topic.id} key={topic.id}>{topic.code} · {topic.title} ({unit.code})</option>)}</select></label>
          <div className="form-row"><label><span>Date</span><input type="date" min={today} value={date} onChange={(event) => setDate(event.target.value)} /></label><label><span>Minutes</span><select value={minutes} onChange={(event) => setMinutes(Number(event.target.value))}><option value={10}>10 minutes</option><option value={20}>20 minutes</option><option value={25}>25 minutes</option><option value={40}>40 minutes</option><option value={60}>60 minutes</option></select></label></div>
          <button type="submit" className="button button--primary"><Plus size={17} /> Add to my plan</button>
        </form></section>
        <section className="plan-list-panel"><div className="section-heading"><div><span className="eyebrow">Chosen sessions</span><h2>{tasks.filter((task) => !task.complete).length} still to complete</h2></div><CalendarDays /></div>{sorted.length ? <div className="plan-list">{sorted.map((task) => { const course = courseById(task.courseId)!; const match = allTopics.find(({ course: itemCourse, topic }) => itemCourse.id === task.courseId && topic.id === task.topicId); return <article key={task.id} className={task.complete ? "is-complete" : ""} style={{ "--course-accent": course.accent } as React.CSSProperties}><button type="button" className="task-check" aria-label={task.complete ? "Mark incomplete" : "Mark complete"} onClick={() => toggleTask(task.id)}>{task.complete ? <Check /> : <Circle />}</button><div><span className="eyebrow">{course.shortTitle} · {task.minutes} minutes</span><h3>{task.title}</h3><p>{new Date(`${task.date}T12:00:00`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</p>{match && <Link to={`/course/${course.slug}/unit/${match.unit.id}/topic/${match.topic.id}`}>Open topic</Link>}</div><button type="button" className="icon-button" aria-label="Delete session" onClick={() => removeTask(task.id)}><Trash2 /></button></article>; })}</div> : <div className="empty-state small"><CalendarDays /><h3>No sessions chosen</h3><p>Add one realistic session using the form.</p></div>}</section>
      </div>
    </div>
  );
}
