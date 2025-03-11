import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Quiz.css";

function Quiz({ topicName }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get(`http://localhost:5000/api/quiz/by-topic/${topicName}`, {
          headers: { "x-auth-token": token },
        });

        if (response.data.success && response.data.quiz) {
          setQuestions(response.data.quiz.questions);
        } else {
          const generateResponse = await axios.post(
            "http://localhost:5000/api/quiz/generate",
            { topic: `Topic ${topicId}` },
            { headers: { "x-auth-token": token } }
          );

          if (generateResponse.data.success) {
            setQuestions(generateResponse.data.quiz.questions);
          } else {
            throw new Error("Failed to generate quiz");
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setError("Failed to load quiz. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [topicId]);

  const handleOptionSelect = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (loading) return <div className="quiz-loading">Loading quiz questions...</div>;
  if (error) return <div className="quiz-error">{error}</div>;
  if (!questions.length) return <div className="quiz-empty">No quiz questions available for this topic.</div>;

  return (
    <div className="quiz-container">
      <h3>Quiz</h3>
      <div className="questions">
        {questions.map((question, index) => (
          <div key={question.id} className="question">
            <h4>Question {index + 1}: {question.question}</h4>
            <div className="options">
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`option ${answers[question.id] === optionIndex ? "selected" : ""}
                    ${submitted && optionIndex === question.correctAnswer ? "correct" : ""}
                    ${submitted && answers[question.id] === optionIndex && optionIndex !== question.correctAnswer ? "wrong" : ""}`}
                  onClick={() => !submitted && handleOptionSelect(question.id, optionIndex)}
                >
                  {option}
                </div>
              ))}
            </div>
            {submitted && <div className="explanation"><p><strong>Explanation:</strong> {question.explanation}</p></div>}
          </div>
        ))}
      </div>
      {!submitted && <button className="submit-btn" onClick={handleSubmit}>Submit Answers</button>}
      {submitted && <div className="results"><p>You got {questions.filter(q => answers[q.id] === q.correctAnswer).length} out of {questions.length} correct!</p></div>}
    </div>
  );
}

export default Quiz;
