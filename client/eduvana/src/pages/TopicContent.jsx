import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ContentSidebar from "../components/ContentSidebar";
import VideoPlayer from "../components/VideoPlayer";
import PdfViewer from "../components/PdfViewer";
import Quiz from "../components/Quiz";
import "./TopicContent.css";

function TopicContent() {
  const { topicId } = useParams();
  
  const [topic, setTopic] = useState(null);
  const [contentType, setContentType] = useState("video");
  const [content, setContent] = useState(null);
  
  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        // In a real implementation, fetch the topic data from your API
        const mockTopic = {
          id: topicId,
          title: `Topic ${topicId}`,
          contents: {
            video: { url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8" },
            pdf: { url: "https://www.tutorialspoint.com/html/html_tutorial.pdf" },
            // We're no longer including quiz data here as it will be fetched by the Quiz component
          }
        };
        
        setTopic(mockTopic);
        setContent(mockTopic.contents[contentType]);
      } catch (error) {
        console.error("Error fetching topic data:", error);
      }
    };
    
    if (topicId) fetchTopicData();
  }, [topicId, contentType]);
  
  const handleContentTypeChange = (type) => {
    setContentType(type);
    if (topic?.contents && topic.contents[type]) {
      setContent(topic.contents[type]);
    }
  };
  
  if (!topic) return <div>Loading...</div>;
  
  return (
    <div className="topic-content-page">
      <h1>{topic.title}</h1>
      <div className="content-layout">
        <ContentSidebar
          selectedType={contentType}
          onTypeChange={handleContentTypeChange}
        />
        <div className="content-display">
          {contentType === "video" && <VideoPlayer videoUrl={content?.url} />}
          {contentType === "pdf" && <PdfViewer pdfUrl={content?.url} />}
          {contentType === "quiz" && <Quiz topicaName={'React'} />}
        </div>
      </div>
    </div>
  );
}

export default TopicContent;