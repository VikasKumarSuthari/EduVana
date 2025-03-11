import React, { useState } from 'react';

const TesseractLearning = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedContentType, setSelectedContentType] = useState(null);
  
  // Sample data structure
  const subjects = [
    { id: 1, title: "FRONT END WEB DEVELOPMENT", code: "FE101" },
    { id: 2, title: "BACK END DEVELOPMENT", code: "BE201" },
    { id: 3, title: "DATA STRUCTURES & ALGORITHMS", code: "DS301" },
    { id: 4, title: "MOBILE APP DEVELOPMENT", code: "MD401" }
  ];
  
  const units = {
    1: [
      { id: 1, name: "UNIT-I: HTML & CSS" },
      { id: 2, name: "UNIT-II: JAVASCRIPT" }
    ],
    2: [
      { id: 1, name: "UNIT-I: NODE.JS" },
      { id: 2, name: "UNIT-II: DATABASES" }
    ],
    3: [
      { id: 1, name: "UNIT-I: ARRAYS & STRINGS" },
      { id: 2, name: "UNIT-II: TREES & GRAPHS" }
    ],
    4: [
      { id: 1, name: "UNIT-I: REACT NATIVE BASICS" },
      { id: 2, name: "UNIT-II: ADVANCED UI" }
    ]
  };
  
  const topics = {
    "1-1": [
      { id: 1, title: "HTML Structure & Elements" },
      { id: 2, title: "CSS Selectors & Properties" },
      { id: 3, title: "Responsive Design" },
      { id: 4, title: "Flexbox & Grid" }
    ],
    "1-2": [
      { id: 1, title: "JavaScript Fundamentals" },
      { id: 2, title: "DOM Manipulation" },
      { id: 3, title: "Event Handling" },
      { id: 4, title: "Async JavaScript" }
    ],
    "2-1": [
      { id: 1, title: "Node.js Basics" },
      { id: 2, title: "Express Framework" },
      { id: 3, title: "REST APIs" },
      { id: 4, title: "Authentication" }
    ]
    // ...other subject-unit combinations
  };
  
  // Navigation handlers
  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSelectedUnit(null);
    setSelectedTopic(null);
    setSelectedContentType(null);
    setCurrentView('subject');
  };
  
  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
    setSelectedTopic(null);
    setSelectedContentType(null);
    setCurrentView('unit');
  };
  
  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setSelectedContentType('video'); // Default to video
    setCurrentView('topic');
  };
  
  const handleContentTypeClick = (type) => {
    setSelectedContentType(type);
  };
  
  const goBack = () => {
    if (currentView === 'topic') {
      setCurrentView('unit');
      setSelectedTopic(null);
      setSelectedContentType(null);
    } else if (currentView === 'unit') {
      setCurrentView('subject');
      setSelectedUnit(null);
    } else if (currentView === 'subject') {
      setCurrentView('home');
      setSelectedSubject(null);
    }
  };


  const renderHomePage = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">TESSERACT LEARNING</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map(subject => (
          <div 
            key={subject.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleSubjectClick(subject)}
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold">{subject.title}</h2>
              <p className="text-sm text-gray-500 mt-2">Course Code: {subject.code}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium text-blue-600">2 Units</span>
                <button className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  View Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


  const renderSubjectPage = () => {
    if (!selectedSubject) return null;
    
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={goBack}
            className="mr-3 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 className="text-2xl font-bold">{selectedSubject.title}</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar with units */}
          <div className="w-full md:w-72">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-center mb-6">Units</h2>
              
              <div className="space-y-3">
                {units[selectedSubject.id]?.map(unit => (
                  <div 
                    key={unit.id}
                    onClick={() => handleUnitClick(unit)}
                    className="flex justify-between items-center py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-800">{unit.name.split(":")[0]}</span>
                    <div className="w-6 h-6 text-gray-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v8M8 12h8" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Empty content area */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-md p-6 min-h-96 flex flex-col items-center justify-center text-gray-500">
              <div className="w-16 h-16 text-yellow-500 mb-4">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L1 21h22L12 2z" />
                </svg>
              </div>
              <p>Nothing to show. Please select a unit from the list on the left</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderUnitPage = () => {
    if (!selectedSubject || !selectedUnit) return null;
    
    const unitTopics = topics[`${selectedSubject.id}-${selectedUnit.id}`] || [];
    
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={goBack}
            className="mr-3 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold">{selectedSubject.title}</h1>
            <h2 className="text-lg text-gray-600">{selectedUnit.name}</h2>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar with units */}
          <div className="w-full md:w-72">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-center mb-6">Units</h2>
              
              <div className="space-y-3">
                {units[selectedSubject.id]?.map(unit => (
                  <div 
                    key={unit.id}
                    onClick={() => handleUnitClick(unit)}
                    className={`flex justify-between items-center py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${selectedUnit.id === unit.id ? 'bg-gray-50 font-medium' : ''}`}
                  >
                    <span className="text-gray-800">{unit.name.split(":")[0]}</span>
                    <div className="w-6 h-6 text-gray-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        {selectedUnit.id !== unit.id && (
                          <path d="M12 8v8M8 12h8" />
                        )}
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Topics list */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Topics</h2>
              
              <div className="grid grid-cols-1 gap-4">
                {unitTopics.map(topic => (
                  <div 
                    key={topic.id}
                    onClick={() => handleTopicClick(topic)}
                    className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <h3 className="font-medium">{topic.title}</h3>
                  </div>
                ))}
                
                {unitTopics.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No topics available for this unit.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderTopicPage = () => {
    if (!selectedSubject || !selectedUnit || !selectedTopic) return null;
    
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={goBack}
            className="mr-3 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold">{selectedTopic.title}</h1>
            <h2 className="text-lg text-gray-600">{selectedUnit.name}</h2>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar with content types */}
          <div className="w-full md:w-72">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-center mb-6">Resources</h2>
              
              <div className="space-y-3">
                {['video', 'pdf', 'quiz'].map(type => (
                  <div 
                    key={type}
                    onClick={() => handleContentTypeClick(type)}
                    className={`flex items-center py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${selectedContentType === type ? 'bg-gray-50 font-medium' : ''}`}
                  >
                    <div className="w-8 h-8 mr-3 text-gray-500">
                      {type === 'video' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M23 7l-7 5 7 5V7z" />
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                      )}
                      {type === 'pdf' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                      )}
                      {type === 'quiz' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                      )}
                    </div>
                    <span className="capitalize">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Content display */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-md p-6">
              {selectedContentType === 'video' && (
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto text-red-500">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 font-medium text-lg">{selectedTopic.title} - Video Lecture</h3>
                    <p className="text-sm text-gray-500 mt-2">Click to play the lecture video</p>
                  </div>
                </div>
              )}
              
              {selectedContentType === 'pdf' && (
                <div className="min-h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto text-blue-600">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v1.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V8c0-.55.45-1 1-1H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2c-.28 0-.5-.22-.5-.5v-5c0-.28.22-.5.5-.5h2c.83 0 1.5.67 1.5 1.5v3zm4-3.75c0 .41-.34.75-.75.75H19v1h.75c.41 0 .75.34.75.75s-.34.75-.75.75H19v1.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V8c0-.55.45-1 1-1h1.25c.41 0 .75.34.75.75zM9 9.5h1v-1H9v1zM3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm11 5.5h1v-3h-1v3z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 font-medium text-lg">{selectedTopic.title} - PDF Notes</h3>
                    <p className="text-sm text-gray-500 mt-2">Download the lecture notes</p>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Download PDF
                    </button>
                  </div>
                </div>
              )}
              
              {selectedContentType === 'quiz' && (
                <div className="min-h-96">
                  <h2 className="text-xl font-semibold mb-6">{selectedTopic.title} - Quiz</h2>
                  
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="font-medium mb-4">Quiz Instructions:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Complete all questions to receive your score</li>
                      <li>You have 20 minutes to complete this quiz</li>
                      <li>You can attempt this quiz up to 3 times</li>
                    </ul>
                  </div>
                  
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Start Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Main render based on current view
  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'home' && renderHomePage()}
      {currentView === 'subject' && renderSubjectPage()}
      {currentView === 'unit' && renderUnitPage()}
      {currentView === 'topic' && renderTopicPage()}
    </div>
  );
};

export default TesseractLearning;