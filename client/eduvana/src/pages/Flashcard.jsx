import React, { useState, useRef, useEffect } from "react";
import "./Flashcard.css";

function Flashcard({ question, answer }) {
  const [flipped, setFlipped] = useState(false);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const [height, setHeight] = useState("120px");

  useEffect(() => {
    const frontHeight = frontRef.current?.scrollHeight || 120;
    const backHeight = backRef.current?.scrollHeight || 120;
    setHeight(`${Math.max(frontHeight, backHeight)}px`);
  }, [flipped, answer]);

  return (
    <div
      className={`flashcard ${flipped ? "flipped" : ""}`}
      style={{ height }}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flashcard-inner">
        <div className="flashcard-front" ref={frontRef}>
          {question}
        </div>
        <div className="flashcard-back" ref={backRef}>
          {answer}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
