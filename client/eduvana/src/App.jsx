import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import SubjectPage from "./pages/SubjectPage";
import TopicContent from "./pages/TopicContent";
import InterviewBot from "./pages/Interview";
import Progress from "./pages/Progress";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import CollaborativeLearning from "./pages/CollaborativeLearning";
import LearnAI from "./pages/LearnAI";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch("http://localhost:5000/api/user", {
            headers: { "x-auth-token": token },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("token"); // Remove invalid token
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={logout} />
        <div className="content-area">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={!isAuthenticated ? <Login onLogin={login} /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isAuthenticated ? <Signup onLogin={login} /> : <Navigate to="/" />} />

            {/* Protected Routes */}
            <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/interview-bot" element={isAuthenticated ? <InterviewBot /> : <Navigate to="/login" />} />
            <Route path="/progress" element={isAuthenticated ? <Progress /> : <Navigate to="/login" />} />
            <Route path="/subject/:subjectId" element={isAuthenticated ? <SubjectPage /> : <Navigate to="/login" />} />
            <Route
              path="/subject/:subjectId/unit/:unitId/topic/:topicId"
              element={isAuthenticated ? <TopicContent /> : <Navigate to="/login" />}
            />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
            <Route path="/collaborative-learning" element={<CollaborativeLearning />} />
            <Route path="/learn-ai" element={<LearnAI />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
