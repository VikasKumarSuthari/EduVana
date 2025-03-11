import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import OpenAI from "openai";
import "./AIAssistant.css";

const openai = new OpenAI({
  apiKey: import.meta.env.REACT_APP_OPENAI_API_KEY,
});


function AIAssistant() {
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your learning assistant. How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // API call to OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          { role: "system", content: "You are a helpful learning assistant. Provide concise, accurate information to help students learn." },
          ...messages.map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text
          })),
          { role: "user", content: input }
        ],
      });

      const botResponse = {
        text: completion.choices[0].message.content.trim(),
        sender: "bot"
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);

    } catch (error) {
      console.error("Error calling AI API:", error);
      setMessages(prev => [
        ...prev,
        { text: "Sorry, I encountered an error. Please try again later. " + (error.message || ""), sender: "bot" }
      ]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <Link to="/" className="back-button">
          &larr; Back to Dashboard
        </Link>
        <h1>Learning Assistant</h1>
      </div>

      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}
          >
            {message.sender === "bot" && (
              <div className="bot-avatar">
                <img src="/images/robot.png" alt="AI" />
              </div>
            )}
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message bot-message">
            <div className="bot-avatar">
              <img src="/images/robot.png" alt="AI" />
            </div>
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about your studies..."
          className="chat-input"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || input.trim() === ""}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AIAssistant;