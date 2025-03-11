import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [subjects, setSubjects] = useState([]);
  
  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulating API fetch
    const mockSubjects = [
      { id: 1, title: "Mathematics", image: "/images/math.jpg" },
      { id: 2, title: "Science", image: "/images/science.jpg" },
      { id: 3, title: "History", image: "/images/history.jpg" },
      { id: 4, title: "English", image: "/images/english.jpg" },
    ];
    setSubjects(mockSubjects);
  }, []);

  return (
    <div className="homepage-container">
      <h1 className="dashboard-title">My Learning Dashboard</h1>
      
      <div className="subjects-grid">
        {subjects.map((subject) => (
          <Link to={`/subject/${subject.id}`} key={subject.id} className="subject-card">
            <img src={subject.image} alt={subject.title} className="subject-image" />
            <h2 className="subject-title">{subject.title}</h2>
          </Link>
        ))}
      </div>

      {/* AI Assistant Chatbot Button */}
      <Link to="/ai-assistant" className="ai-assistant-button">
        <div className="robot-icon">
          <img src="src/assets/robot.png" alt="AI Assistant" />
        </div>
        <span className="assistant-tooltip">Chat with AI</span>
      </Link>
    </div>
  );
}

export default HomePage;