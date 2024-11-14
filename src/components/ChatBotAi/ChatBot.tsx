"use client";
import { useState } from "react";
import "./ChatBot.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input) return;

    // Append user's message to the chat
    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const botMessage = { role: "assistant", content: data.reply };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-bot">
      <div className="tooltip">
        <button onClick={toggleChat} className="chat-button">
        <b>
          <i className="bi bi-chat-left-dots-fill "></i>
        </b>
        </button>
        <span className="tooltip-text">Talk to me</span>
      </div>

      
      {isOpen && (
        <div className="chat-modal">
          <div className="chat-header">
            <h2>ChatGPT</h2>
            <button onClick={toggleChat}>&times;</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && <p>Loading...</p>}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
