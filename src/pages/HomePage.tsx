import { ArrowRight, BookOpenCheck, FileQuestion, Network, PenLine, Sparkles } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { CourseCard } from "../components/CourseCard";
import { SearchBox } from "../components/SearchBox";
import { courses } from "../data/courses";
import { homepageBlocks, siteSettings } from "../content";
import type { HomeLayoutBlock } from "../types";

const tools = [
  { icon: FileQuestion, eyebrow: "Quiz", title: "Build a focused quiz", text: "Choose a qualification, topic, difficulty and up to 50 questions.", to: "/revision", action: "Set up a quiz" },
  { icon: Network, eyebrow: "Visual revision", title: "Completed concept maps", text: "See the definitions, processes and consequences in each topic as one connected map.", to: "/concept-maps", action: "Open concept maps" },
  { icon: PenLine, eyebrow: "Pearson Business", title: "Extended writing", text: "Turn case-study evidence into connected BLT strands, analysis and supported judgements.", to: "/business/extended-writing", action: "Practise extended writing" },
  { icon: BookOpenCheck, eyebrow: "Trusted sources", title: "Official materials", text: "Open specifications, public papers, mark schemes, reports and safe sample assignments.", to: "/materials", action: "Browse materials" },
];

function HeroBlock() {
  return (
    <section className="hero">
        <div className="hero__inner">
          <div className="hero__copy"><span className="hero-kicker"><Sparkles size={16} /> {siteSettings.schoolName}</span><h1>Business &amp; <em>Technology Hub</em></h1><p>{siteSettings.tagline}</p></div>
          <div className="hero__search"><SearchBox large /><div className="popular-searches"><span>Try:</span><Link to="/search?q=break-even">break-even</Link><Link to="/search?q=CPU">CPU</Link><Link to="/search?q=R095">R095</Link><Link to="/search?q=BLT">BLT</Link></div></div>
          <div className="hero-visual" aria-label="Learning journey: understand, connect, practise and apply">
            <div className="orbit orbit--one"><span>Understand</span></div><div className="orbit orbit--two"><span>Connect</span></div><div className="orbit orbit--three"><span>Practise</span></div><div className="hero-visual__centre"><strong>BTH</strong><span>Business + Tech</span></div>
          </div>
        </div>
      </section>
  );
}

function CoursesBlock() {
  return (
    <section className="page-section subject-section">
        <div className="section-heading"><div><span className="eyebrow">Choose your qualification</span><h2>Start with the course you're working towards</h2></div><p>You do not need to tackle everything at once. Choose the exact qualification, take one topic at a time, and use the route that helps it make sense.</p></div>
        <div className="course-grid">{courses.map((course) => <CourseCard key={course.id} course={course} />)}</div>
      </section>
  );
}

function ToolsBlock() {
  return (
    <section className="page-section hub-tools">
        <div className="section-heading"><div><span className="eyebrow">Revision tools</span><h2>What would help you most today?</h2></div><p>Whether you're learning something for the first time or trying to make it stick, there is a clear next step waiting for you.</p></div>
        <div className="hub-tool-grid">{tools.map(({ icon: Icon, eyebrow, title, text, to, action }) => <article key={title}><div className="dashboard-card__icon"><Icon /></div><span className="eyebrow">{eyebrow}</span><h3>{title}</h3><p>{text}</p><Link className="text-link" to={to}>{action} <ArrowRight size={16} /></Link></article>)}</div>
      </section>
  );
}

function CustomBlockLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("https://")) return <a className="button button--primary home-custom-block__button" href={href}>{children}</a>;
  return <Link className="button button--primary home-custom-block__button" to={href.startsWith("/") ? href : `/${href}`}>{children}</Link>;
}

function customImageSrc(src: string) {
  if (src.startsWith("https://")) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\.?\//, "")}`;
}

function renderBlock(block: HomeLayoutBlock) {
  if (block.type === "hero") return <HeroBlock />;
  if (block.type === "courses") return <CoursesBlock />;
  if (block.type === "tools") return <ToolsBlock />;
  if (block.type === "text") return (
    <section className="page-section home-custom-block home-custom-block--text">
      {block.eyebrow && <span className="eyebrow">{block.eyebrow}</span>}
      <h2>{block.title}</h2>
      <div className="home-custom-block__body">{block.body.map((paragraph, index) => <p key={`${block.id}-paragraph-${index}`}>{paragraph}</p>)}</div>
    </section>
  );
  if (block.type === "callout") return (
    <section className="page-section home-custom-block home-custom-block--callout">
      <div>
        {block.eyebrow && <span className="eyebrow">{block.eyebrow}</span>}
        <h2>{block.title}</h2>
        <p>{block.body}</p>
      </div>
      {block.buttonLabel && block.buttonHref && <CustomBlockLink href={block.buttonHref}>{block.buttonLabel} <ArrowRight size={16} /></CustomBlockLink>}
    </section>
  );
  return (
    <section className="page-section home-custom-block home-custom-block--image">
      <div><h2>{block.title}</h2>{block.body && <p>{block.body}</p>}</div>
      <figure><img src={customImageSrc(block.image.src)} alt={block.image.alt} loading="lazy" /><figcaption>{block.image.caption}</figcaption></figure>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      {homepageBlocks.filter((block) => block.visible).map((block) => <Fragment key={block.id}>{renderBlock(block)}</Fragment>)}
    </>
  );
}
