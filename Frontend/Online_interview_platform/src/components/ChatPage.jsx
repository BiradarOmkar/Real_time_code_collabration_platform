import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

function ChatPage({ sessionId, userName }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    // Join the session room
    socketRef.current.emit("joinSession", { sessionId, userName });

    // Listen for incoming messages
    socketRef.current.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [sessionId, userName]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;
    socketRef.current.emit("sendMessage", {
      sessionId,
      user: userName,
      text: text.trim(),
    });
    setText("");
  };

  return (
    <div className="flex flex-col h-full rounded border border-gray-700">
      {/* Messages Container */}
      <div className="flex-1 flex flex-col overflow-y-auto p-2 gap-2">
        {messages.map((msg, i) => {
          const isCurrentUser = msg.user === userName;
          return (
            <div
              key={i}
              className={`max-w-[70%]  p-2 rounded ${
                isCurrentUser
                  ? "self-end bg-blue-500 text-white"
                  : "self-start bg-gray-300 text-black"
              }`}
            >
              <b className="text-green-500">{isCurrentUser ? "You" : msg.user}</b>
              <p>{msg.text}</p>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Area */}
      <div className="flex mt-2 p-1 border-t border-gray-700">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded bg-gray-100 text-black focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 transition text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;