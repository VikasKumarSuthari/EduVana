import React, { useState } from "react";
import "./Quiz.css";

function Quiz({ questions }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleOptionSelect = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    });
  };
  
  const handleSubmit = () => {
    setSubmitted(true);
  };
  
  return (
    <div className="quiz-container">
      <h3>Quiz</h3>
      <div className="questions">
        {questions?.map((question, index) => (
          <div key={question.id} className="question">
            <h4>Question {index + 1}: {question.question}</h4>
            <div className="options">
              {question.options.map((option) => (
                <div 
                  key={option} 
                  className={`
                    option 
                    ${answers[question.id] === option ? 'selected' : ''} 
                    ${submitted && option === question.answer ? 'correct' : ''} 
                    ${submitted && answers[question.id] === option && option !== question.answer ? 'wrong' : ''}
                  `}
                  onClick={() => !submitted && handleOptionSelect(question.id, option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {!submitted && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Answers
        </button>
      )}
      {submitted && (
        <div className="results">
          <p>You got {questions?.filter(q => answers[q.id] === q.answer).length} out of {questions?.length} correct!</p>
        </div>
      )}
    </div>
  );
}

export default Quiz;