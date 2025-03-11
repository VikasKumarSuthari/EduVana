import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Flashcard from "./Flashcard";
import { DiagramComponent, LayoutOrientation } from "@syncfusion/ej2-react-diagrams";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./LearnAI.css";

// Initialize Google Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyDVDNBDVaY6QFXpOqh4wXySZf0-ATjQ0Sc"); // Replace with your API key

function LearnAI() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("content");
  const [content, setContent] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [mindmap, setMindmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const diagramInstance = useRef(null);

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
      let response;

      if (type === "content") {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        response = await model.generateContent(`Provide educational content about ${topic}`);
        setContent(response.response.text());
      } else if (type === "flashcards") {
        response = await axios.post("http://localhost:5000/api/generate-content", { topic, type });
        setFlashcards(response.data.data.flashcards || []);
      } else if (type === "mindmap") {
        response = await axios.post("http://localhost:5000/api/generate-content", { topic, type });
        setMindmap(response.data.data.mindmap || null);
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setError("Failed to generate content. Please try again.");
    }

    setLoading(false);
  };

  // Convert Mind Map data to Syncfusion Diagram Nodes
  const generateDiagramNodes = () => {
    if (!mindmap) return { nodes: [], connectors: [] };

    let nodes = [
      { id: "main", annotations: [{ content: mindmap.main_topic }] }
    ];
    let connectors = [];

    mindmap.subtopics.forEach((subtopic, index) => {
      const subId = `sub-${index}`;
      nodes.push({
        id: subId,
        annotations: [{ content: subtopic.title }],
      });

      connectors.push({ id: `edge-${index}`, sourceID: "main", targetID: subId });

      subtopic.details.forEach((detail, detailIndex) => {
        const detailId = `detail-${index}-${detailIndex}`;
        nodes.push({
          id: detailId,
          annotations: [{ content: detail }],
        });

        connectors.push({ id: `edge-detail-${index}-${detailIndex}`, sourceID: subId, targetID: detailId });
      });
    });

    return { nodes, connectors };
  };

  const diagramData = generateDiagramNodes();

  // Fit diagram to screen without scrolling
  useEffect(() => {
    if (diagramInstance.current) {
      diagramInstance.current.fitToPage({ mode: "Width" });
    }
  }, [mindmap]);

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
        <div className="mindmap-container" style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
          <h2>Mind Map on {topic}</h2>
          <DiagramComponent
            id="mindmap-diagram"
            width={"100vw"}
            height={"90vh"}
            ref={diagramInstance}
            nodes={diagramData.nodes}
            connectors={diagramData.connectors}
            layout={{
              type: "HierarchicalTree",
              orientation: LayoutOrientation.TopToBottom,
            }}
            getNodeDefaults={(node) => {
              node.width = 150;
              node.height = 50;
              node.style = { fill: "#f8f9fa", strokeColor: "#333" };
              return node;
            }}
            getConnectorDefaults={(connector) => {
              connector.type = "Straight";
              connector.style = { strokeColor: "#666", strokeWidth: 2 };
              return connector;
            }}
            created={() => {
              if (diagramInstance.current) {
                diagramInstance.current.fitToPage({ mode: "Width" });
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default LearnAI;
