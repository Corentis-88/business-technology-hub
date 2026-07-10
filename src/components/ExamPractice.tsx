import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { useState } from "react";
import type { ExamQuestion } from "../types";

export function ExamPractice({ questions }: { questions: ExamQuestion[] }) {
  const [open, setOpen] = useState<string[]>([]);
  if (!questions.length) return null;
  return (
    <div className="exam-question-list">
      {questions.map((question) => {
        const expanded = open.includes(question.id);
        return (
          <article className="exam-question" key={question.id}>
            <div className="exam-question__top"><span className="command-chip">{question.command}</span><strong>{question.marks} marks</strong><span>About {Math.max(question.marks, Math.round(question.marks * 1.15))} minutes</span></div>
            <p>{question.prompt}</p>
            <button type="button" className="reveal-button" aria-expanded={expanded} onClick={() => setOpen((current) => expanded ? current.filter((id) => id !== question.id) : [...current, question.id])}><Lightbulb size={17} /> {expanded ? "Hide guidance" : "Show guidance"}{expanded ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</button>
            {expanded && <div className="exam-guidance"><h4>What a strong response needs</h4><ul>{question.guidance.map((item) => <li key={item}>{item}</li>)}</ul>{question.model && <><h4>Illustrative response</h4><p>{question.model}</p></>}</div>}
          </article>
        );
      })}
    </div>
  );
}
