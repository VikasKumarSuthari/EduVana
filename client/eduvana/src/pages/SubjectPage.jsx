import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UnitsSidebar from "../components/UnitsSidebar";
import TopicsList from "../components/TopicsList";
import "./SubjectPage.css";

function SubjectPage() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [units, setUnits] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  
  // Fetch subject details
  useEffect(() => {
    // Replace with actual API call
    const mockSubject = { id: subjectId, title: `Subject ${subjectId}` };
    setSubject(mockSubject);
    
    // Mock units for this subject
    const mockUnits = [
      { id: 1, title: "Unit 1: Introduction" },
      { id: 2, title: "Unit 2: Core Concepts" },
      { id: 3, title: "Unit 3: Advanced Topics" },
    ];
    setUnits(mockUnits);
    // Select first unit by default
    if (mockUnits.length > 0 && !selectedUnitId) {
      setSelectedUnitId(mockUnits[0].id);
    }
  }, [subjectId]);
  
  // Fetch topics when unit is selected
  useEffect(() => {
    if (selectedUnitId) {
      // Replace with actual API call
      const mockTopics = [
        { id: 1, title: "Topic 1.1", unitId: selectedUnitId },
        { id: 2, title: "Topic 1.2", unitId: selectedUnitId },
        { id: 3, title: "Topic 1.3", unitId: selectedUnitId },
      ];
      setTopics(mockTopics);
    }
  }, [selectedUnitId]);
  
  const handleUnitClick = (unitId) => {
    setSelectedUnitId(unitId);
  };
  
  const handleTopicClick = (topicId) => {
    navigate(`/subject/${subjectId}/unit/${selectedUnitId}/topic/${topicId}`);
  };

  if (!subject) return <div>Loading...</div>;

  return (
    <div className="subject-page">
      <h1>{subject.title}</h1>
      <div className="subject-layout">
        <UnitsSidebar 
          units={units} 
          selectedUnitId={selectedUnitId} 
          onUnitClick={handleUnitClick} 
        />
        <TopicsList 
          topics={topics} 
          onTopicClick={handleTopicClick} 
        />
      </div>
    </div>
  );
}

export default SubjectPage;