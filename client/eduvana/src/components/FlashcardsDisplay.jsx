import React, { useState, useEffect } from 'react';
import './FlashcardsDisplay.css';

const FlashcardsDisplay = ({ topicId }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (topicId) {
      fetchFlashcards(topicId);
    }
  }, [topicId]);

  const fetchFlashcards = async (topicId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/topics/${topicId}/flashcards`);
      if (!response.ok) {
        throw new Error('Failed to fetch flashcards');
      }
      
      const data = await response.json();
      setFlashcards(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleNextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false); // Reset flip state when changing cards
    }
  };

  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false); // Reset flip state when changing cards
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      handleNextCard();
    } else if (e.key === 'ArrowLeft') {
      handlePrevCard();
    } else if (e.key === ' ' || e.key === 'Enter') {
      flipCard();
    }
  };

  // Shuffle flashcards
  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Reset to first card
  const resetCards = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (isLoading) {
    return (
      <div className="flashcards-loading">
        <div className="loading-spinner"></div>
        <p>Loading flashcards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flashcards-error">
        <p>Error: {error}</p>
        <button onClick={() => fetchFlashcards(topicId)}>Retry</button>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="flashcards-empty">
        <p>No flashcards available for this topic.</p>
      </div>
    );
  }

  return (
    <div className="flashcards-container" tabIndex="0" onKeyDown={handleKeyDown}>
      <div className="flashcards-header">
        <h3>Flashcards</h3>
        <div className="flashcards-actions">
          <button className="shuffle-button" onClick={shuffleCards}>
            Shuffle
          </button>
          <button className="reset-button" onClick={resetCards}>
            Reset
          </button>
        </div>
      </div>

      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
        onClick={flipCard}
      >
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <p>{flashcards[currentIndex]?.question || 'No question available'}</p>
            <span className="flip-hint">Click to reveal answer</span>
          </div>
          <div className="flashcard-back">
            <p>{flashcards[currentIndex]?.answer || 'No answer available'}</p>
            <span className="flip-hint">Click to see question</span>
          </div>
        </div>
      </div>
      
      <div className="flashcard-navigation">
        <button 
          className="nav-button prev" 
          onClick={handlePrevCard}
          disabled={currentIndex === 0}
        >
          &larr; Previous
        </button>
        <div className="card-progress">
          <span>{currentIndex + 1} of {flashcards.length}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <button 
          className="nav-button next" 
          onClick={handleNextCard}
          disabled={currentIndex === flashcards.length - 1}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default FlashcardsDisplay;