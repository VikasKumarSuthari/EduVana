import React from "react";
import "./TopicsList.css";

function TopicsList({ topics, onTopicClick }) {
  return (
    <div className="topics-list">
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li 
            key={topic.id}
            onClick={() => onTopicClick(topic.id)}
          >
            {topic.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicsList;