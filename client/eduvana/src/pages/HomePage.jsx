import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  // Main dashboard cards (Interview Bot, Dashboard, Progress)
  const dashboardCards = [
    { 
      id: "interview", 
      title: "Interview Bot", 
      image: "/src/assets/images/interview-bot.jpg", 
      description: "Practice for technical interviews with our AI-powered bot",
      path: "/interview-bot"
    },
    { 
      id: "dashboard", 
      title: "Learning Dashboard", 
      image: "/src/assets/images/dashboard.jpg", 
      description: "Access your courses and learning materials",
      path: "/dashboard"
    },
    { 
      id: "progress", 
      title: "My Progress", 
      image: "/src/assets/images/progress.jpeg", 
      description: "Track your learning journey and achievements",
      path: "/progress"
    },
    { 
      id: "collaborative-learning", 
      title: "Collaborative Learning", 
      image: "/src/assets/images/bb.jpg", 
      description: "Join study groups and collaborate with others",
      path: "/collaborative-learning"
    },
    { 
      id: "learn-ai", 
      title: "AI Based Learning", 
      image: "/src/assets/images/ll.jpg", 
      description: "Explore AI-powered educational resources and tools",
      path: "/learn-ai"
    },
    { 
      id: "Text Summarizer", 
      title: "Text Summarizer", 
      image: "/src/assets/images/textsummarizer.png", 
      description: "Explore AI-powered educational resources and tools",
      path: "/summary"
    },
    { 
      id: "Hastha Vaani", 
      title: "Hastha Vaani", 
      image: "/src/assets/images/hasthavaasi.jpg", 
      description: "Explore AI-powered educational resources and tools",
      path: "/hasthavaani"
    }
  ];

  return (
    <div className="home-page">
      <h1>My Learning Platform</h1>
      
      {/* Main Dashboard Cards */}
      <div className="dashboard-cards">
        {dashboardCards.map((card) => (
          <Link 
            to={card.path} 
            key={card.id} 
            className="dashboard-card"
          >
            <div className="card-image">
              <img src={card.image} alt={card.title} />
            </div>
            <div className="card-content">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;