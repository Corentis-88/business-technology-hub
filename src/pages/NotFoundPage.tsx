import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return <div className="page-section empty-state page-not-found"><Search /><h1>That page isn’t in the course map</h1><p>Search for the topic or return to the four qualifications.</p><div><Link className="button button--primary" to="/search">Search the hub</Link><Link className="button button--secondary" to="/">Return home</Link></div></div>;
}
