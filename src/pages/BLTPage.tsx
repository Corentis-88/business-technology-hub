import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BLTBuilder } from "../components/BLTBuilder";

export function BLTPage() {
  return <div className="page-section blt-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronRight size={14} /><Link to="/course/business">Business</Link><ChevronRight size={14} /><span>BLT builder</span></nav><BLTBuilder /></div>;
}
