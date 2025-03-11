import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ Import useParams
import ContentSidebar from "../components/ContentSidebar";
import VideoPlayer from "../components/VideoPlayer";
import PdfViewer from "../components/PdfViewer";
import Quiz from "../components/Quiz";
import "./TopicContent.css";

function TopicContent() {
  const { topicId } = useParams(); // ✅ Extract topicId

  const [topic, setTopic] = useState(null);
  const [contentType, setContentType] = useState("video");
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        const mockTopic = { 
          id: topicId, 
          title: `Topic ${topicId}`,
          contents: {
            video: { url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8" },
            pdf: { url: "https://example.com/notes.pdf" },
            quiz: { 
              questions: [
                { id: 1, question: "Sample question 1?", options: ["A", "B", "C", "D"], answer: "B" },
                { id: 2, question: "Sample question 2?", options: ["A", "B", "C", "D"], answer: "A" }
              ]
            }
          }
        };
        
        setTopic(mockTopic);
        setContent(mockTopic.contents[contentType]);
      } catch (error) {
        console.error("Error fetching topic data:", error);
      }
    };

    if (topicId) fetchTopicData(); // ✅ Only fetch if topicId exists
  }, [topicId, contentType]);

  const handleContentTypeChange = (type) => {
    setContentType(type);
    if (topic?.contents) {
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
          {contentType === "quiz" && <Quiz questions={content?.questions} />}
        </div>
      </div>
    </div>
  );
}

export default TopicContent;
