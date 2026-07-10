import type { CourseId, ProgressStatus } from "../types";
import { useAppState } from "../state/AppState";

const labels: Record<ProgressStatus, string> = { "not-started": "Not started", learning: "Learning", secure: "Secure", revisit: "Revisit" };

export function StatusControl({ courseId, topicId }: { courseId: CourseId; topicId: string }) {
  const { progress, setTopicStatus } = useAppState();
  const current = progress[`${courseId}:${topicId}`]?.status ?? "not-started";
  return (
    <label className={`status-control status-${current}`}>
      <span>My status</span>
      <select value={current} onChange={(event) => setTopicStatus(courseId, topicId, event.target.value as ProgressStatus)}>
        {Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
    </label>
  );
}
