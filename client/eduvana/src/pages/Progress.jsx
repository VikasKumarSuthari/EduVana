import { useState, useEffect } from 'react';

import './Progress.css';

const Progress = () => {

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [units, setUnits] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [badges] = useState({
    quiz: { earned: 4, total: 17 },
    video: { earned: 7, total: 17 },
    pdf: { earned: 5, total: 17 }
  });

  // Fetch subjects on component mount
  useEffect(() => {
    // Mock API call to fetch subjects
    const mockSubjects = [
      { id: 1, title: "Cloud Computing", image: "/src/assets/cc.jpeg", progress: 65 },
      { id: 2, title: "Database Management Systems", image: "/src/assets/dbms.jpeg", progress: 42 },
      { id: 3, title: "Operating Systems", image: "/src/assets/os.jpeg", progress: 78 },
    ];
    setSubjects(mockSubjects);
  }, []);

  // Fetch units when subject is selected
  useEffect(() => {
    if (selectedSubject) {
      // Mock API call to fetch units for the selected subject
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
    }
  }, [selectedSubject]);
  
  // Fetch topics when unit is selected
  useEffect(() => {
    if (selectedUnitId) {
      // Mock API call to fetch topics for the selected unit
      const mockTopics = [
        { id: 1, title: "Topic 1.1", unitId: selectedUnitId },
        { id: 2, title: "Topic 1.2", unitId: selectedUnitId },
        { id: 3, title: "Topic 1.3", unitId: selectedUnitId },
      ];
      setTopics(mockTopics);
    }
  }, [selectedUnitId]);

  // Handle subject selection
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedUnitId(null);
    setSelectedTopic(null);
  };

  // Handle unit selection
  const handleUnitSelect = (unitId) => {
    setSelectedUnitId(unitId);
    setSelectedTopic(null);
  };

  // Handle topic selection
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="progress-page">
      <h1>Your Learning Progress</h1>
      
      {/* Overall Progress Summary */}
      <div className="overall-progress">
        <h2>Overall Progress</h2>
        <div className="progress-cards">
          {subjects.map(subject => (
            <div 
              key={subject.id} 
              className={`subject-card ${selectedSubject?.id === subject.id ? 'selected' : ''}`}
              onClick={() => handleSubjectSelect(subject)}
            >
              <div className="subject-image">
                <img src={subject.image} alt={subject.title} />
              </div>
              <h3>{subject.title}</h3>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
              <div className="progress-percentage">{subject.progress}% complete</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Badge Summary */}
      <div className="badges-section">
        <h2>Badges Earned</h2>
        <div className="badges-container">
          <div className="badge-item">
            <div className="badge-icon quiz-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4CAF50">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <span className="badge-name">Quiz Badge</span>
            <span className="badge-count">{badges.quiz.earned} of {badges.quiz.total}</span>
          </div>
          
          <div className="badge-item">
            <div className="badge-icon video-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2196F3">
                <circle cx="12" cy="12" r="10"/>
                <path d="M10 8l6 4-6 4V8z" fill="white"/>
              </svg>
            </div>
            <span className="badge-name">Video Badge</span>
            <span className="badge-count">{badges.video.earned} of {badges.video.total}</span>
          </div>
          
          <div className="badge-item">
            <div className="badge-icon pdf-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF5722">
                <circle cx="12" cy="12" r="10"/>
                <rect x="9" y="8" width="6" height="8" fill="white"/>
              </svg>
            </div>
            <span className="badge-name">PDF Badge</span>
            <span className="badge-count">{badges.pdf.earned} of {badges.pdf.total}</span>
          </div>
        </div>
      </div>
      
      {/* Detailed Progress */}
      {selectedSubject && (
        <div className="detailed-progress">
          <h2>Subject: {selectedSubject.title}</h2>
          
          <div className="content-container">
            {/* Units Sidebar */}
            <div className="sidebar">
              <div className="units-section">
                <h3>Units</h3>
                <ul className="unit-list">
                  {units.map(unit => (
                    <li 
                      key={unit.id} 
                      className={`unit-item ${selectedUnitId === unit.id ? 'active' : ''}`}
                      onClick={() => handleUnitSelect(unit.id)}
                    >
                      <span>{unit.title}</span>
                      <button className="unit-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <path d={selectedUnitId === unit.id ? "M8 12h8" : "M12 8v8M8 12h8"}/>
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Topics */}
            {selectedUnitId && (
              <div className="topics-section">
                <h3>Topics</h3>
                <ul className="topic-list">
                  {topics.map(topic => (
                    <li 
                      key={topic.id} 
                      className={`topic-item ${selectedTopic?.id === topic.id ? 'active' : ''}`}
                      onClick={() => handleTopicSelect(topic)}
                    >
                      <span>{topic.title}</span>
                      <div className="topic-resources">
                        <div className="resource-icon video-icon" title="Video watched">▶️</div>
                        <div className="resource-icon pdf-icon" title="PDF read">📄</div>
                        <div className="resource-icon quiz-icon completed" title="Quiz completed">✓</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Resource Sidebar - appears when topic is selected */}
            {selectedTopic && (
              <div className="resources-sidebar">
                <h3>Resources</h3>
                <div className="resource-buttons">
                  <button className="resource-button video">
                    <span className="resource-icon">▶️</span>
                    <span>Video</span>
                  </button>
                  <button className="resource-button pdf">
                    <span className="resource-icon">📄</span>
                    <span>PDF</span>
                  </button>
                  <button className="resource-button quiz">
                    <span className="resource-icon">✓</span>
                    <span>Quiz</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;