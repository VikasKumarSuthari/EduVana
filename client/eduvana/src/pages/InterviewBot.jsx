import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InterviewBot.css';

const InterviewBot = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [interviewSession, setInterviewSession] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [sessionId, setSessionId] = useState('');
  
  const subjects = [
    { id: 1, name: 'Operating System' },
    { id: 2, name: 'Database Management' },
    { id: 3, name: 'Cloud Computing' },
    { id: 4, name: 'Web Development' },
    { id: 5, name: 'Data Structures' }
  ];
  
  // Check if there's an existing session on component mount
  useEffect(() => {
    const existingSessionId = localStorage.getItem('interviewSessionId');
    if (existingSessionId) {
      fetchExistingSession(existingSessionId);
    }
  }, []);

  // Set current answer whenever currentQuestionIndex changes
  useEffect(() => {
    if (interviewSession && interviewSession.questions) {
      const currentQuestion = interviewSession.questions[currentQuestionIndex];
      if (currentQuestion) {
        setCurrentAnswer(answers[currentQuestion.id] || '');
      }
    }
  }, [currentQuestionIndex, answers, interviewSession]);

  // Fetch an existing session if available
  const fetchExistingSession = async (sessionId) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication required. Please log in.');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/interview/session/${sessionId}', {
        headers: {
          'x-auth-token': token
        }
      });
      
      if (response.data.success) {
        setInterviewSession(response.data.session);
        setSessionId(response.data.session.id);
        setSelectedSubject(response.data.session.subject);
        
        // Attempt to load saved answers
        const savedAnswers = localStorage.getItem(`answers_${sessionId}`);
        if (savedAnswers) {
          setAnswers(JSON.parse(savedAnswers));
        }
        
        setSuccess('Resumed previous interview session');
      }
    } catch (error) {
      console.error('Error fetching session:', error);
      setError('Could not retrieve previous session');
      localStorage.removeItem('interviewSessionId');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    // Reset any existing session when subject changes
    setInterviewSession(null);
    setAnswers({});
    setCurrentAnswer('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedSubject) {
      setError('Please select a subject');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Get authentication token
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication required. Please log in.');
        setIsLoading(false);
        return;
      }
      
      // Send the selected subject to the backend with auth token
      const response = await axios.post('http://localhost:5000/api/interview/start', {
        subject: selectedSubject
      }, {
        headers: {
          'x-auth-token': token
        }
      });
      
      // Store the interview session data
      setInterviewSession(response.data.session);
      setSessionId(response.data.session.id);
      setCurrentQuestionIndex(0);
      setSuccess('Interview session created successfully!');
      
      // Save session ID to local storage for potential recovery
      localStorage.setItem('interviewSessionId', response.data.session.id);
      
      // Initialize empty answers object
      const emptyAnswers = {};
      response.data.session.questions.forEach(q => {
        emptyAnswers[q.id] = '';
      });
      setAnswers(emptyAnswers);
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to start interview';
      setError(`Error: ${errorMessage}`);
      
      if (error.response?.status === 401) {
        setError('Authentication expired. Please log in again.');
        // Handle token expiration - redirect to login or refresh token
      }
      
      console.error('Error starting interview:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAnswerChange = (e) => {
    setCurrentAnswer(e.target.value);
    
    // Update answers object
    if (interviewSession && interviewSession.questions) {
      const updatedAnswers = { ...answers };
      const currentQuestion = interviewSession.questions[currentQuestionIndex];
      updatedAnswers[currentQuestion.id] = e.target.value;
      setAnswers(updatedAnswers);
      
      // Save answers to local storage
      localStorage.setItem(`answers_${sessionId}`, JSON.stringify(updatedAnswers));
    }
  };
  
  const handleNextQuestion = () => {
    if (interviewSession && currentQuestionIndex < interviewSession.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleRestartInterview = () => {
    // Clear the current session
    setInterviewSession(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCurrentAnswer('');
    localStorage.removeItem('interviewSessionId');
    localStorage.removeItem(`answers_${sessionId}`);
    setSessionId('');
  };
  
  // Render based on whether we have an active interview session
  return (
    <div className="interview-container">
      {interviewSession ? (
        <div className="interview-card">
          <div className="interview-header">
            <h2>{interviewSession.subject} Interview</h2>
            <p className="question-counter">
              Question {currentQuestionIndex + 1} of {interviewSession.questions.length}
            </p>
            <div className="difficulty-badge" data-difficulty={interviewSession.questions[currentQuestionIndex].difficulty.toLowerCase()}>
              {interviewSession.questions[currentQuestionIndex].difficulty}
            </div>
          </div>
          
          <div className="question-container">
            <h3 className="question-text">{interviewSession.questions[currentQuestionIndex].question}</h3>
            
            <div className="answer-container">
              <label htmlFor="answer">Your Answer:</label>
              <textarea
                id="answer"
                value={currentAnswer}
                onChange={handleAnswerChange}
                rows="5"
                className="form-control"
                placeholder="Type your answer here..."
              />
            </div>
          </div>
          
          <div className="interview-navigation">
            <button 
              onClick={handlePreviousQuestion} 
              disabled={currentQuestionIndex === 0}
              className="btn btn-secondary"
            >
              Previous
            </button>
            
            <button 
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === interviewSession.questions.length - 1}
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
          
          <div className="interview-footer">
            <button 
              onClick={handleRestartInterview}
              className="btn btn-outline-danger restart-btn"
            >
              End Interview & Start New
            </button>
          </div>
        </div>
      ) : (
        <div className="interview-card">
          <h2>Start Interview Session</h2>
          <p>Please select a subject for your interview practice session:</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="subject">Select Subject:</label>
              <select 
                id="subject"
                value={selectedSubject}
                onChange={handleSubjectChange}
                className="form-control"
                disabled={isLoading}
              >
                <option value="">Select a subject</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            
            {error && (
              <div className="message error">
                {error}
              </div>
            )}
            
            {success && (
              <div className="message success">
                {success}
              </div>
            )}
            
            <button 
              type="submit" 
              className="btn btn-success"
              disabled={isLoading}
            >
              {isLoading ? 'Generating Questions...' : 'Start Interview'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InterviewBot;