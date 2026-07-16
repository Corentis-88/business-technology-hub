import { AlertTriangle, Calculator, Check, ChevronDown, ClipboardCheck, Lightbulb, Link2, MessageSquareText, Target } from "lucide-react";
import { useMemo, useState } from "react";
import { r068CourseworkGuides } from "../data/r068Coursework";
import { R068CourseworkVisual } from "./R068CourseworkVisual";
import "./r068-coursework-assist.css";
import "./r068-coursework-media.css";

function FinancialCalculator() {
  const [fixed, setFixed] = useState("");
  const [variable, setVariable] = useState("");
  const [price, setPrice] = useState("");
  const [units, setUnits] = useState("");
  const numbers = [fixed, variable, price, units].map(Number);
  const [fixedCost, unitCost, sellingPrice, quantity] = numbers;
  const valid = numbers.every((value) => Number.isFinite(value) && value >= 0) && sellingPrice > unitCost && quantity > 0;
  const results = valid ? {
    total: fixedCost + unitCost * quantity,
    revenue: sellingPrice * quantity,
    profit: sellingPrice * quantity - (fixedCost + unitCost * quantity),
    contribution: sellingPrice - unitCost,
    breakEven: Math.ceil(fixedCost / (sellingPrice - unitCost)),
  } : null;
  return <section className="coursework-calculator"><header><Calculator /><div><span>Check your own working</span><h3>Financial calculator</h3></div></header><p>Enter figures from your current assignment. This checks calculations only; you must explain what the results mean.</p><div className="coursework-calculator__inputs"><label>Fixed costs (£)<input inputMode="decimal" value={fixed} onChange={(event) => setFixed(event.target.value)} /></label><label>Variable cost per unit (£)<input inputMode="decimal" value={variable} onChange={(event) => setVariable(event.target.value)} /></label><label>Selling price (£)<input inputMode="decimal" value={price} onChange={(event) => setPrice(event.target.value)} /></label><label>Predicted units sold<input inputMode="numeric" value={units} onChange={(event) => setUnits(event.target.value)} /></label></div>{results ? <div className="coursework-calculator__results"><div><span>Total costs</span><strong>£{results.total.toFixed(2)}</strong></div><div><span>Revenue</span><strong>£{results.revenue.toFixed(2)}</strong></div><div><span>Profit / loss</span><strong>£{results.profit.toFixed(2)}</strong></div><div><span>Contribution</span><strong>£{results.contribution.toFixed(2)}</strong></div><div><span>Break-even</span><strong>{results.breakEven} units</strong></div></div> : <small>Enter all four figures. The selling price must be higher than the unit variable cost.</small>}</section>;
}

export function R068CourseworkAssist({ topicId }: { topicId: string }) {
  const guide = r068CourseworkGuides[topicId];
  const [checked, setChecked] = useState<number[]>([]);
  const completion = useMemo(() => guide ? Math.round((checked.length / guide.finalChecks.length) * 100) : 0, [checked, guide]);
  if (!guide) return null;
  return <section className="coursework-assist" aria-labelledby="coursework-assist-title">
    <header className="coursework-assist__hero"><div><span>R068 coursework assist · Task {guide.task} · {guide.marks} marks</span><h2 id="coursework-assist-title">{guide.title}</h2><p>Use this guide to plan and check your own evidence. Complete every prompt using your own research, design choices and assignment figures.</p></div><ClipboardCheck aria-hidden="true" /></header>
    <figure className="coursework-assist__overview-picture">
      <img src={`${import.meta.env.BASE_URL}images/r068/coursework-evidence-workshop.webp`} alt="Students working together with research charts, a customer profile, annotated product sketches, feedback notes, a break-even chart and a risk grid." />
      <figcaption><strong>Coursework is an evidence journey.</strong> Research the market, understand the customer, design for their needs, improve from feedback, check the finances, then judge risks and success.</figcaption>
    </figure>
    <div className="coursework-integrity"><AlertTriangle /><div><strong>Use your current teacher-issued assignment</strong><p>The product and figures can change each year. This guide explains the task structure, but it does not provide an assessed answer. Never copy another candidate’s work.</p></div></div>
    <section className="coursework-top-band"><Target /><div><span>What the highest mark band is looking for</span><p>{guide.topBand}</p><small>Following this guidance does not guarantee a mark. Your evidence must also be relevant, accurate and your own.</small></div></section>
    <section className="coursework-word-guide" aria-label="Suggested length"><div><span>Planning guide</span><strong>{guide.wordCountGuide}</strong></div><p>This is a rough guide to help you plan. OCR does not set a word count. Clear, relevant evidence matters more than writing extra words.</p></section>
    <div className="coursework-chain" aria-label="Recommended evidence order">{guide.evidenceChain.map((item, index) => <div key={item}><span>{index + 1}</span><b>{item}</b>{index < guide.evidenceChain.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div>
    <R068CourseworkVisual task={guide.task} />
    <div className="coursework-section-heading"><span>Build the task</span><h2>Work through one section at a time</h2><p>Open a section to see exactly what to include, questions to answer and sentence starters.</p></div>
    <div className="coursework-step-list">{guide.sections.map((section, index) => <details key={section.heading} open={index === 0}><summary><span>{index + 1}</span><div><strong>{section.heading}</strong><small>{section.purpose}</small></div><ChevronDown /></summary><div className="coursework-step__body"><section><h3><Check /> Exactly what to include</h3><ul>{section.include.map((item) => <li key={item}>{item}</li>)}</ul></section><section className="coursework-prompts"><h3><Lightbulb /> Questions to answer</h3><ul>{section.prompts.map((item) => <li key={item}>{item}</li>)}</ul></section><section className="coursework-starters"><h3><MessageSquareText /> Sentence starters</h3><p>Finish these with your own evidence. Change the wording so it sounds like you.</p>{section.starters.map((item) => <div key={item}><Link2 aria-hidden="true" /><span>{item}</span></div>)}</section></div></details>)}</div>
    {guide.task === 5 && <FinancialCalculator />}
    <div className="coursework-warning"><AlertTriangle /><strong>Common reason marks are lost</strong><p>{guide.warning}</p></div>
    <section className="coursework-final-check"><header><div><span>Final self-check</span><h2>Have you included the evidence?</h2></div><strong>{completion}% checked</strong></header><div>{guide.finalChecks.map((item, index) => <label key={item}><input type="checkbox" checked={checked.includes(index)} onChange={() => setChecked((current) => current.includes(index) ? current.filter((value) => value !== index) : [...current, index])} /><span>{item}</span></label>)}</div></section>
  </section>;
}
