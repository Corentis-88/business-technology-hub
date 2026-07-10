import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";
import type { CourseId, QuizQuestion } from "../types";
import { useAppState } from "../state/AppState";

export function Quiz({ questions, courseId, topicId, title = "Knowledge check", showSourceTopic = false }: { questions: QuizQuestion[]; courseId: CourseId; topicId: string; title?: string; showSourceTopic?: boolean }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const { updateProgress } = useAppState();
  const question = questions[index];

  if (!questions.length) return null;

  const next = () => {
    const correct = selected === question.answer;
    const nextScore = score + (correct ? 1 : 0);
    if (index === questions.length - 1) {
      setScore(nextScore);
      setFinished(true);
      updateProgress(courseId, topicId, Math.round((nextScore / questions.length) * 100));
    } else {
      setScore(nextScore);
      setIndex((value) => value + 1);
      setSelected(null);
    }
  };

  const reset = () => { setIndex(0); setSelected(null); setScore(0); setFinished(false); };

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <section className="quiz-panel quiz-result" aria-live="polite">
        <span className="eyebrow">{title} complete</span>
        <div className="score-orbit" aria-label={`${percent}%`}><strong>{percent}%</strong><span>{score}/{questions.length}</span></div>
        <h3>{percent >= 80 ? "Secure work" : percent >= 50 ? "Good start—one more pass" : "This topic needs another look"}</h3>
        <p>{percent >= 80 ? "You retrieved this accurately. Schedule a later review to keep it secure." : "Review the explanations above, then try again without looking."}</p>
        <button type="button" className="button button--secondary" onClick={reset}><RotateCcw size={17} /> Try again</button>
      </section>
    );
  }

  const answered = selected !== null;
  const isCorrect = answered && selected === question.answer;
  return (
    <section className="quiz-panel">
      <div className="quiz-header"><div><span className="eyebrow">{title}</span><h3>Question {index + 1} of {questions.length}</h3></div><span className="quiz-score">{score} correct</span></div>
      <div className="quiz-progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      {showSourceTopic && question.sourceTopicTitle && <span className="quiz-topic-label">{question.sourceTopicTitle}</span>}
      <p className="quiz-prompt">{question.prompt}</p>
      <div className="quiz-options">
        {question.options.map((option, optionIndex) => {
          const state = answered ? optionIndex === question.answer ? "correct" : optionIndex === selected ? "incorrect" : "muted" : "";
          return <button type="button" key={option} className={state} disabled={answered} onClick={() => setSelected(optionIndex)}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}{state === "correct" && <CheckCircle2 size={18} />}{state === "incorrect" && <XCircle size={18} />}</button>;
        })}
      </div>
      {answered && <div className={`answer-feedback ${isCorrect ? "is-correct" : "is-incorrect"}`} role="status"><strong>{isCorrect ? "Correct" : "Not quite"}</strong><p>{question.explanation}</p></div>}
      <button type="button" className="button button--primary" disabled={!answered} onClick={next}>{index === questions.length - 1 ? "Finish quiz" : "Next question"}</button>
    </section>
  );
}
