import { ArrowLeftRight, ArrowRight, Eye, RefreshCw, Scale } from "lucide-react";
import type { SimpleVisualSpec } from "../data/enterpriseSimple";

export function SimpleConceptVisual({ spec }: { spec: SimpleVisualSpec }) {
  const compare = spec.type === "compare" || spec.type === "balance";
  const HeaderIcon = spec.type === "cycle" ? RefreshCw : spec.type === "balance" ? Scale : spec.type === "compare" ? ArrowLeftRight : ArrowRight;

  return (
    <figure className={`simple-picture simple-picture--${spec.type}`} aria-label={`${spec.title}. ${spec.caption}`}>
      <header><Eye /><span><small>Picture it</small><b>{spec.title}</b></span></header>
      {compare ? (
        <div className="simple-picture__compare">
          <div><span>A</span><strong>{spec.labels[0]}</strong><small>{spec.labels[1]}</small></div>
          <HeaderIcon aria-hidden="true" />
          <div><span>B</span><strong>{spec.labels[2]}</strong><small>{spec.labels[3]}</small></div>
        </div>
      ) : (
        <div className="simple-picture__flow">
          {spec.labels.map((label, index) => <div className="simple-picture__flow-item" key={label}><div><span>{index + 1}</span><strong>{label}</strong></div>{index < spec.labels.length - 1 && <ArrowRight aria-hidden="true" />}</div>)}
          {spec.type === "cycle" && <RefreshCw className="simple-picture__return" aria-label="The cycle starts again" />}
        </div>
      )}
      <figcaption>{spec.caption}</figcaption>
    </figure>
  );
}
