import { Check, Copy, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

type QuestionType = "3" | "6-discuss" | "6-analyse" | "9" | "12";
interface Chain { pointBecause: string; leadsTo: string; therefore: string; }

const blank = (): Chain => ({ pointBecause: "", leadsTo: "", therefore: "" });
const config: Record<QuestionType, { label: string; chains: number; context: boolean; judgement: boolean; help: string }> = {
  "3": { label: "3-mark Explain", chains: 1, context: false, judgement: false, help: "One complete BLT answers one three-mark question." },
  "6-discuss": { label: "6-mark Discuss", chains: 2, context: false, judgement: false, help: "Build two relevant chains. A conclusion is not required." },
  "6-analyse": { label: "6-mark Analyse", chains: 2, context: true, judgement: false, help: "Build developed chains and apply the named business throughout." },
  "9": { label: "9-mark Justify", chains: 2, context: true, judgement: true, help: "Analyse the chosen option, then use a judgement BLT to explain why it fits this business." },
  "12": { label: "12-mark Evaluate", chains: 2, context: true, judgement: true, help: "Develop supporting and challenging reasoning, then make a conditional judgement." },
};

function validate(chain: Chain) {
  const errors: string[] = [];
  const first = chain.pointBecause.trim();
  if (/^because\b/i.test(first)) errors.push("‘Because’ cannot start the sentence. Make the business point first.");
  if (!/\bbecause\b/i.test(first)) errors.push("Add ‘because’ after your initial business point.");
  if (chain.leadsTo.trim().length < 8) errors.push("Develop the immediate consequence in Leads To.");
  if (chain.therefore.trim().length < 8) errors.push("Finish with a specific business effect in Therefore.");
  return errors;
}

export function BLTBuilder() {
  const [type, setType] = useState<QuestionType>("3");
  const [chains, setChains] = useState<Chain[]>([blank()]);
  const [judgement, setJudgement] = useState<Chain>(blank());
  const [copied, setCopied] = useState(false);
  const mode = config[type];

  const changeType = (next: QuestionType) => {
    setType(next);
    setChains(Array.from({ length: config[next].chains }, (_, index) => chains[index] ?? blank()));
  };

  const chainText = (chain: Chain) => `${chain.pointBecause.trim()} This leads to ${chain.leadsTo.trim()}. Therefore, ${chain.therefore.trim()}.`;
  const answer = useMemo(() => [
    ...chains.map(chainText),
    ...(mode.judgement ? [`Overall, ${chainText(judgement)}`] : []),
  ].join("\n\n"), [chains, judgement, mode.judgement]);
  const errors = chains.flatMap((chain, index) => validate(chain).map((error) => `BLT ${index + 1}: ${error}`));
  if (mode.judgement) errors.push(...validate(judgement).map((error) => `Judgement: ${error}`));

  const update = (index: number, key: keyof Chain, value: string) => setChains((current) => current.map((chain, chainIndex) => chainIndex === index ? { ...chain, [key]: value } : chain));
  const copy = async () => { await navigator.clipboard.writeText(answer); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const reset = () => { setChains(Array.from({ length: mode.chains }, blank)); setJudgement(blank()); };

  return (
    <div className="blt-builder">
      <div className="blt-intro">
        <div><span className="eyebrow">MEA method · Pearson Business only</span><h2>Build an answer with BLT</h2><p>Make the business point first. The word <strong>because must never start a sentence</strong>.</p></div>
        <div className="blt-pattern"><span>Point <b>because</b> reason</span><i>→</i><span><b>Leads To</b> consequence</span><i>→</i><span><b>Therefore</b> effect</span></div>
      </div>
      <div className="segmented-control" aria-label="Question type">
        {(Object.keys(config) as QuestionType[]).map((key) => <button type="button" key={key} aria-pressed={type === key} onClick={() => changeType(key)}>{config[key].label}</button>)}
      </div>
      <div className="blt-mode-help"><strong>{mode.label}</strong><span>{mode.help}</span>{mode.context && <span className="context-chip">Use the business context</span>}</div>
      <div className="blt-chain-list">
        {chains.map((chain, index) => (
          <section className="blt-chain" key={index}>
            <div className="blt-chain__header"><h3>BLT {index + 1}</h3>{chains.length > mode.chains && <button className="icon-button" type="button" aria-label={`Remove BLT ${index + 1}`} onClick={() => setChains((current) => current.filter((_, chainIndex) => chainIndex !== index))}><Trash2 size={17} /></button>}</div>
            <label><span>Business point + because</span><textarea value={chain.pointBecause} onChange={(event) => update(index, "pointBecause", event.target.value)} placeholder="Training may improve customer service because employees will know how to handle complaints." /></label>
            <label><span>This leads to…</span><textarea value={chain.leadsTo} onChange={(event) => update(index, "leadsTo", event.target.value)} placeholder="customers receiving a faster and more helpful response" /></label>
            <label><span>Therefore…</span><textarea value={chain.therefore} onChange={(event) => update(index, "therefore", event.target.value)} placeholder="customer satisfaction and repeat purchases may increase" /></label>
          </section>
        ))}
        {chains.length < 3 && type !== "3" && <button type="button" className="button button--ghost add-chain" onClick={() => setChains((current) => [...current, blank()])}><Plus size={17} /> Add another developed BLT</button>}
        {mode.judgement && (
          <section className="blt-chain blt-chain--judgement">
            <div className="blt-chain__header"><div><span className="eyebrow">Evaluation layer</span><h3>Judgement BLT</h3></div></div>
            <label><span>Decision + because</span><textarea value={judgement.pointBecause} onChange={(event) => setJudgement((value) => ({ ...value, pointBecause: event.target.value }))} placeholder="Option A is the better choice because it matches the business's limited budget." /></label>
            <label><span>This leads to…</span><textarea value={judgement.leadsTo} onChange={(event) => setJudgement((value) => ({ ...value, leadsTo: event.target.value }))} placeholder="the business achieving its objective without increasing borrowing" /></label>
            <label><span>Therefore…</span><textarea value={judgement.therefore} onChange={(event) => setJudgement((value) => ({ ...value, therefore: event.target.value }))} placeholder="Option A is preferable, provided demand remains high enough" /></label>
          </section>
        )}
      </div>
      <section className="blt-preview">
        <div className="blt-preview__header"><div><span className="eyebrow">Live answer preview</span><h3>Your complete response</h3></div><div><button type="button" className="button button--ghost" onClick={reset}><RotateCcw size={16} /> Reset</button><button type="button" className="button button--secondary" disabled={errors.length > 0} onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied" : "Copy answer"}</button></div></div>
        {answer.replace(/[.\s]/g, "") ? <p className="answer-preview">{answer}</p> : <p className="empty-preview">Your answer will appear here as you build each link.</p>}
        {errors.length > 0 && <ul className="validation-list">{errors.map((error) => <li key={error}>{error}</li>)}</ul>}
      </section>
    </div>
  );
}
