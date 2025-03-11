import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import SubjectPage from "./pages/SubjectPage";
import TopicContent from "./pages/TopicContent";

import InterviewBot from "./pages/InterviewBot";
import Progress from "./pages/Progress";
// import AIAssistant from "./pages/AIAssistant.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/interview-bot" element={<InterviewBot />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/subject/:subjectId" element={<SubjectPage />} />
            <Route path="/subject/:subjectId/unit/:unitId/topic/:topicId" element={<TopicContent />} />
         
            {/* <Route path="/ai-assistant" element={<AIAssistant />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;