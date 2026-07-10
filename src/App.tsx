import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AboutPage } from "./pages/AboutPage";
import { BLTPage } from "./pages/BLTPage";
import { CoursePage } from "./pages/CoursePage";
import { ConceptMapsPage } from "./pages/ConceptMapsPage";
import { HomePage } from "./pages/HomePage";
import { ExtendedWritingPage } from "./pages/ExtendedWritingPage";
import { MaterialsPage } from "./pages/MaterialsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PlannerPage } from "./pages/PlannerPage";
import { RevisionPage } from "./pages/RevisionPage";
import { SearchPage } from "./pages/SearchPage";
import { TopicPage } from "./pages/TopicPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:courseSlug" element={<CoursePage />} />
        <Route path="/concept-maps" element={<ConceptMapsPage />} />
        <Route path="/course/:courseSlug/unit/:unitId/topic/:topicId" element={<TopicPage />} />
        <Route path="/business/blt" element={<BLTPage />} />
        <Route path="/business/extended-writing" element={<ExtendedWritingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/revision" element={<RevisionPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
