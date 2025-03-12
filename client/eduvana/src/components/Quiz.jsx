import React, { useState, useEffect } from "react";
import "./Quiz.css";

function Quiz({ topicId, topicName }) {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);

  // Fetch or generate quiz based on topicId
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/quizzes/topic/${topicId}`);
        const data = await response.json();
        
        if (data.success && data.quiz) {
          setQuiz(data.quiz);
          setTimeLeft(data.quiz.timeLimit * 60); // Convert minutes to seconds
        } else {
          setError("No quiz found for this topic");
        }
      } catch (err) {
        setError("Failed to load quiz");
        console.error("Error fetching quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      fetchQuiz();
    }
  }, [topicId]);

  // Timer countdown
  useEffect(() => {
    if (!timeLeft || showResult) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, showResult]);

  const handleGenerateQuiz = async () => {
    try {
      setGeneratingQuiz(true);
      setError(null);
      
      // First generate the quiz content
      const generateResponse = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topicName,
          type: "quiz"
        })
      });
      
      const generatedData = await generateResponse.json();
      
      if (!generatedData.data || !generatedData.data.quiz) {
        throw new Error("Failed to generate quiz content");
      }
      
      // Then save the generated quiz
      const saveResponse = await fetch("/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: topicId,
          quizData: generatedData.data
        })
      });
      
      const savedData = await saveResponse.json();
      
      if (savedData.success) {
        // Fetch the newly saved quiz
        const fetchResponse = await fetch(`/api/quizzes/${savedData.quizId}`);
        const fetchedQuiz = await fetchResponse.json();
        
        setQuiz(fetchedQuiz.quiz);
        setTimeLeft(fetchedQuiz.quiz.timeLimit * 60);
        resetQuizState();
      } else {
        throw new Error("Failed to save generated quiz");
      }
    } catch (err) {
      setError(`Error generating quiz: ${err.message}`);
      console.error("Quiz generation error:", err);
    } finally {
      setGeneratingQuiz(false);
    }
  };

  const resetQuizState = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    setShowExplanation(false);
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    // Save answer
    const isCorrect = selectedOption === quiz.questions[currentQuestion].correctAnswer;
    if (isCorrect) setScore(score + 1);
    
    setAnswers([...answers, {
      questionIndex: currentQuestion,
      selectedOption,
      isCorrect
    }]);
    
    // Move to next question or show results
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRetakeQuiz = () => {
    resetQuizState();
    setTimeLeft(quiz.timeLimit * 60);
  };

  // Format time left
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) return <div className="quiz-loading">Loading quiz...</div>;
  if (generatingQuiz) return <div className="quiz-loading">Generating new quiz for {topicName}...</div>;
  if (error && !quiz) return (
    <div className="quiz-error">
      <p>{error}</p>
      <button className="generate-quiz-btn" onClick={handleGenerateQuiz}>
        Generate Quiz for {topicName}
      </button>
    </div>
  );
  
  if (!quiz) return (
    <div className="quiz-not-found">
      <p>No quiz available for this topic yet.</p>
      <button className="generate-quiz-btn" onClick={handleGenerateQuiz}>
        Generate Quiz for {topicName}
      </button>
    </div>
  );

  return (
    <div className="quiz-container">
      <h2>{quiz.title}</h2>
      
      {!showResult ? (
        <div className="quiz-active">
          <div className="quiz-header">
            <div className="quiz-progress">
              Question {currentQuestion + 1}/{quiz.questions.length}
            </div>
            <div className="quiz-timer">
              Time left: {formatTime(timeLeft)}
            </div>
          </div>
          
          <div className="question-container">
            <h3>{quiz.questions[currentQuestion].text}</h3>
            <div className="options-container">
              {quiz.questions[currentQuestion].options.map((option, index) => (
                <div 
                  key={index} 
                  className={`option ${selectedOption === index ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </div>
              ))}
            </div>
            
            <div className="question-actions">
              <button 
                className="show-explanation-btn"
                onClick={() => setShowExplanation(!showExplanation)}
              >
                {showExplanation ? "Hide Explanation" : "Show Explanation"}
              </button>
              
              <button 
                className="next-btn"
                disabled={selectedOption === null}
                onClick={handleNextQuestion}
              >
                {currentQuestion < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
              </button>
            </div>
            
            {showExplanation && (
              <div className="explanation">
                <h4>Explanation:</h4>
                <p>{quiz.questions[currentQuestion].explanation}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-results">
          <h3>Quiz Results</h3>
          <div className="score-display">
            <p>Your score: {score}/{quiz.questions.length} ({Math.round((score/quiz.questions.length)*100)}%)</p>
            <p className={score >= quiz.passingScore/100 * quiz.questions.length ? "pass" : "fail"}>
              {score >= quiz.passingScore/100 * quiz.questions.length ? "PASS" : "FAIL"}
            </p>
          </div>
          
          <div className="answers-review">
            <h4>Review Answers:</h4>
            {answers.map((answer, index) => (
              <div key={index} className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                <p>Q{index + 1}: {answer.isCorrect ? "Correct" : "Incorrect"}</p>
                <p>Your answer: {quiz.questions[answer.questionIndex].options[answer.selectedOption]}</p>
                {!answer.isCorrect && (
                  <p>Correct answer: {quiz.questions[answer.questionIndex].options[quiz.questions[answer.questionIndex].correctAnswer]}</p>
                )}
                <p className="question-explanation">{quiz.questions[answer.questionIndex].explanation}</p>
              </div>
            ))}
          </div>
          
          <button className="retake-btn" onClick={handleRetakeQuiz}>
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;