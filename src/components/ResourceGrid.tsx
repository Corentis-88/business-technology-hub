import { ExternalLink, FileText, PlayCircle } from "lucide-react";
import type { ResourceLink } from "../types";

export function ResourceGrid({ resources: items }: { resources: ResourceLink[] }) {
  return (
    <div className="resource-grid">
      {items.map((resource) => (
        <a key={resource.id} href={resource.href} target="_blank" rel="noreferrer" className="resource-card">
          <div className="resource-card__icon">{resource.type === "Video" ? <PlayCircle /> : <FileText />}</div>
          <div><div className="resource-card__tags"><span>{resource.type}</span>{resource.official && <span className="official-tag">Official</span>}{resource.local && <span>Available offline</span>}</div><h3>{resource.title}</h3><p>{resource.description}</p></div>
          <ExternalLink size={18} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
