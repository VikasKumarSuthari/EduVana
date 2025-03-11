import React, { useState } from 'react';
import FlashcardsDisplay from './FlashcardsDisplay';
import './AIContentGenerator.css';

const AIContentGenerator = ({  subjectName, topicName, topicId }) => {
  const [activeTab, setActiveTab] = useState('flashcards');
 
  
  // Your existing code...

  return (
    <div className="ai-content-generator">
      <div className="generator-header">
        <h2>AI Learning Materials for {subjectName || "General Subject"} - {topicName || "Topic"}</h2>
        <div className="tab-switcher">
          <button 
            className={`tab-button ${activeTab === 'flashcards' ? 'active' : ''}`}
            onClick={() => setActiveTab('flashcards')}
          >
            Flashcards
          </button>
          <button 
            className={`tab-button ${activeTab === 'mindmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('mindmap')}
          >
            Mind Map
          </button>
        </div>
      </div>

      <div className="generator-content">
        {activeTab === 'flashcards' && (
          <FlashcardsDisplay topicId={topicId} />
        )}

       
      </div>
    </div>
  );
};

export default AIContentGenerator;