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
    <div className="home-page">
      <h1>My Learning Dashboard</h1>
      <div className="subject-cards">
        {subjects.map((subject) => (
          <Link 
            to={`/subject/${subject.id}`} 
            key={subject.id} 
            className="subject-card"
          >
            <img src={subject.image} alt={subject.title} />
            <h3>{subject.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;