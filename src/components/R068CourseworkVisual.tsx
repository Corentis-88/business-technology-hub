import { ArrowRight, BarChart3, Calculator, CheckCircle2, MessageCircle, PencilRuler, Search, ShieldAlert, UserRound } from "lucide-react";
import "./r068-coursework-visual.css";

function Frame({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return <section className="r068-visual" aria-label={title}>
    <header><span>{label}</span><h3>{title}</h3><p>This shows how to present your own evidence. Replace every example with information from your assignment.</p></header>
    {children}
  </section>;
}

function ResearchBoard() {
  return <Frame label="Visual example: research board" title="Turn answers into useful evidence">
    <div className="research-board">
      <div className="research-tools" aria-label="Three research tools">
        <article><Search /><b>Questionnaire</b><small>Numbers + short reasons</small></article>
        <article><MessageCircle /><b>Interview</b><small>Detailed opinions</small></article>
        <article><BarChart3 /><b>Secondary source</b><small>Market facts and trends</small></article>
      </div>
      <div className="research-chart" role="img" aria-label="Example bar chart. Option A has 8 responses, option B has 14 and option C has 5.">
        <strong>Example result: preferred option</strong>
        <div><span>A</span><i style={{ "--bar": "53%" } as React.CSSProperties}>8</i></div>
        <div><span>B</span><i style={{ "--bar": "93%" } as React.CSSProperties}>14</i></div>
        <div><span>C</span><i style={{ "--bar": "33%" } as React.CSSProperties}>5</i></div>
        <small>Always add a title, labels and the number of people.</small>
      </div>
      <div className="research-story"><div><b>Finding</b><span>What did you discover?</span></div><ArrowRight /><div><b>Meaning</b><span>Why does it matter?</span></div><ArrowRight /><div><b>Decision</b><span>What will you do?</span></div></div>
    </div>
  </Frame>;
}

function CustomerProfile() {
  return <Frame label="Visual example: customer profile" title="Build one customer from real findings">
    <div className="persona-card">
      <div className="persona-person" aria-hidden="true"><div><UserRound /></div><b>Your target customer</b><small>Not “everyone”</small></div>
      <div className="persona-facts">
        <article><span>WHO?</span><b>Age or life stage</b><small>Add only details your evidence supports.</small></article>
        <article><span>WHERE?</span><b>Location</b><small>Explain why the place matters.</small></article>
        <article><span>WHAT MATTERS?</span><b>Needs and values</b><small>Use patterns from your research.</small></article>
        <article><span>HOW DO THEY BUY?</span><b>Budget and behaviour</b><small>Link price to spending power.</small></article>
      </div>
      <div className="persona-proof"><b>Proof strip</b><span>Profile detail</span><ArrowRight /><span>Exact Task 1 result</span><ArrowRight /><span>Why it matters</span></div>
    </div>
  </Frame>;
}

function DesignSheet() {
  return <Frame label="Visual example: annotated design sheet" title="Make every design label earn its place">
    <div className="design-sheet">
      <div className="design-note"><b>FEATURE</b><span>Name the exact part.</span></div>
      <div className="design-sketch" aria-label="Product-neutral idea placeholder"><PencilRuler /><strong>YOUR IDEA</strong><span>Front / side / detail view</span></div>
      <div className="design-note"><b>EVIDENCE</b><span>Which finding caused it?</span></div>
      <div className="design-note"><b>BENEFIT</b><span>How does it help the customer?</span></div>
      <div className="design-mix">
        <article><span>F</span><div><b>Function</b><small>What must it do?</small></div></article>
        <article><span>A</span><div><b>Aesthetics</b><small>How should it look and feel?</small></div></article>
        <article><span>£</span><div><b>Economic manufacture</b><small>Can it be made at a suitable cost?</small></div></article>
      </div>
    </div>
  </Frame>;
}

function FeedbackComparison() {
  return <Frame label="Visual example: development journey" title="Show how feedback changes the design">
    <div className="feedback-journey">
      <article className="feedback-card before"><span>BEFORE</span><div aria-hidden="true"><i /><i /><i /></div><b>Original idea</b><small>Label strengths and weaknesses.</small></article>
      <div className="feedback-middle"><MessageCircle /><b>Evidence</b><span>Self-assessment</span><span>Verbal feedback</span><span>Written feedback</span><ArrowRight /></div>
      <article className="feedback-card after"><span>AFTER</span><div aria-hidden="true"><i /><i /><i /><i /></div><b>Improved idea</b><small>Label every change and reason.</small></article>
      <div className="feedback-change"><b>A complete change note</b><span>“I changed <em>the feature</em> to <em>the new choice</em> because <em>the evidence</em>. This should <em>explain the benefit</em>.”</span></div>
    </div>
  </Frame>;
}

function FinanceVisual() {
  return <Frame label="Visual example: finance dashboard" title="See how the figures connect">
    <div className="finance-visual">
      <div className="formula-cards">
        <article><Calculator /><div><b>Total costs</b><span>fixed costs + total variable costs</span></div></article>
        <article><Calculator /><div><b>Revenue</b><span>selling price × units sold</span></div></article>
        <article><Calculator /><div><b>Profit or loss</b><span>revenue − total costs</span></div></article>
        <article><Calculator /><div><b>Break-even</b><span>fixed costs ÷ contribution per unit</span></div></article>
      </div>
      <figure className="break-even-chart">
        <figcaption>How to read a break-even chart</figcaption>
        <svg viewBox="0 0 520 300" role="img" aria-labelledby="be-title be-desc">
          <title id="be-title">Example break-even chart</title><desc id="be-desc">The revenue line crosses the total costs line at break-even. Before it is a loss area and after it is a profit area.</desc>
          <path className="axis" d="M58 25V250H495" /><text x="10" y="28">£</text><text x="418" y="280">Units sold</text>
          <path className="fixed-line" d="M58 205H490" /><path className="cost-line" d="M58 205L490 72" /><path className="revenue-line" d="M58 250L490 28" />
          <circle cx="330" cy="110" r="7" /><path className="guide-line" d="M330 110V250" />
          <text className="be-label" x="336" y="103">Break-even</text><text className="loss-label" x="117" y="154">LOSS</text><text className="profit-label" x="395" y="73">PROFIT</text>
        </svg>
        <div className="chart-legend"><span><i className="revenue-key" />Revenue</span><span><i className="cost-key" />Total costs</span><span><i className="fixed-key" />Fixed costs</span></div>
        <small>Use your own figures. Show the formula, working, answer and what the answer means.</small>
      </figure>
    </div>
  </Frame>;
}

function RiskDashboard() {
  return <Frame label="Visual example: risk dashboard" title="Judge the risk, then plan a response">
    <div className="risk-dashboard">
      <div className="risk-matrix" role="img" aria-label="Likelihood and impact risk matrix. Risks become more urgent towards the top right.">
        <b className="matrix-y">Impact ↑</b><b className="matrix-x">Likelihood →</b>
        <div className="low">LOW</div><div className="watch">WATCH</div><div className="high">HIGH</div>
        <div className="watch">WATCH</div><div className="high">HIGH</div><div className="urgent">URGENT</div>
        <div className="high">HIGH</div><div className="urgent">URGENT</div><div className="urgent">URGENT</div>
      </div>
      <div className="risk-chain"><article><ShieldAlert /><b>Risk</b><span>What could happen?</span></article><ArrowRight /><article><BarChart3 /><b>Impact</b><span>What could be harmed?</span></article><ArrowRight /><article><CheckCircle2 /><b>Response</b><span>How will you reduce it?</span></article></div>
      <div className="success-dashboard"><b>Check more than one measure of success</b><span>Sales<i style={{ "--score": "72%" } as React.CSSProperties} /></span><span>Costs<i style={{ "--score": "48%" } as React.CSSProperties} /></span><span>Customer trust<i style={{ "--score": "84%" } as React.CSSProperties} /></span><small>Example bars only. Explain short-term and longer-term effects using your proposal.</small></div>
    </div>
  </Frame>;
}

export function R068CourseworkVisual({ task }: { task: number }) {
  return task === 1 ? <ResearchBoard /> : task === 2 ? <CustomerProfile /> : task === 3 ? <DesignSheet /> : task === 4 ? <FeedbackComparison /> : task === 5 ? <FinanceVisual /> : task === 6 ? <RiskDashboard /> : null;
}
