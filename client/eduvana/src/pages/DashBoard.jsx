import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = 'http://localhost:5001/api';

  useEffect(() => {
    // Fetch subjects from the backend API
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/subjects`);
        const data = await response.json();
        
        console.log("Fetched subjects:", data); 
    
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format from API");
        }
    
        setSubjects(data);
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchSubjects();
  }, []);

  if (loading) {
    return <div className="loading">Loading subjects...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="dashboard-page">
      <h1>Learning Dashboard</h1>
      
      <div className="subject-cards">
        {subjects.map((subject) => (
          <Link
            to={`/subject/${subject._id}`}
            key={subject._id}
            className="subject-card"
          >
            <div className="subject-image">
              <img src={subject.image} alt={subject.title} />
              <div className="progress-indicator">
                <div className="progress-bar" style={{ width: `${subject.progress}%` }}></div>
                <span>{subject.progress}% Complete</span>
              </div>
            </div>
            <div className="subject-content">
              <h3>{subject.title}</h3>
              <button className="continue-btn">Continue Learning</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;