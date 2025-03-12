import React from "react";
import "./ContentSidebar.css";

function ContentSidebar({ selectedType, onTypeChange }) {
  const contentTypes = [
    { id: "video", label: "Video Lesson" },
    { id: "pdf", label: "PDF Notes" },
    { id: "quiz", label: "Quiz" },
    { id: "audiobook", label: "AudioBook" }, // Added AudioBook option
  ];

  return (
    <div className="content-sidebar">
      <h2>Content</h2>
      <ul>
        {contentTypes.map((type) => (
          <li
            key={type.id}
            className={type.id === selectedType ? "selected" : ""}
            onClick={() => onTypeChange(type.id)}
          >
            {type.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContentSidebar;
