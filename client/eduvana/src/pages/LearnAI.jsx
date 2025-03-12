import React, { useState } from "react";
import axios from "axios";
import Flashcard from "./Flashcard";
import MindMap from "./MindMap"; // Import the MindMap component
import "./LearnAI.css";

function LearnAI() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("content");
  const [content, setContent] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [mindmap, setMindmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateContent = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }

    setLoading(true);
    setContent(null);
    setFlashcards([]);
    setMindmap(null);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/generate-content", {
        topic,
        type,
      });

      const data = response.data.data;

      if (type === "content") {
        
        setContent(data.text || null);
      } else if (type === "flashcards") {
        setFlashcards(data.flashcards || []);
      } else if (type === "mindmap") {
        setMindmap(data.mindmap || null);
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setError("Failed to generate content. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="learn-ai-page">
      <h1>AI-Based Learning</h1>
      <p>Explore AI-powered educational resources.</p>

      <div className="content-generator">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., Cloud Computing)"
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="content">Text Content</option>
          <option value="flashcards">Flashcards</option>
          <option value="mindmap">Mind Map</option>
        </select>

        <button onClick={handleGenerateContent} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {content && type === "content" && (
        <div className="generated-content">
          <h2>Generated Content on {topic}</h2>
          <p>{content}</p>
        </div>
      )}

      {flashcards.length > 0 && type === "flashcards" && (
        <div className="flashcard-container">
          <h2>Flashcards on {topic}</h2>
          {flashcards.map((card, index) => (
            <Flashcard key={index} question={card.question} answer={card.answer} />
          ))}
        </div>
      )}

      {mindmap && type === "mindmap" && (
        <div className="mindmap-container">
          <h2>Mind Map on {topic}</h2>
          <MindMap mindmap={mindmap} />
        </div>
      )}
    </div>
  );
}

export default LearnAI;
