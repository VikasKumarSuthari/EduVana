import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SubjectPage from "./pages/SubjectPage";
import TopicContent from "./pages/TopicContent";
import TesseractLearning from "./pages/TesseractLearning";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/subject/:subjectId" element={<SubjectPage />} />
            <Route path="/subject/:subjectId/unit/:unitId/topic/:topicId" element={<TopicContent />} />
            <Route path="/learning" element={<TesseractLearning />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;