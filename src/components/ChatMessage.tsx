import React, { useEffect, useState } from "react";
import type { ChatMessage } from "../types/Chat";

interface Props {
  message: ChatMessage;
}

const ChatMessageComponent: React.FC<Props> = ({ message }) => {
  const isUser = message.role === "user";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isUser) {
      setDisplayedText(message.content);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(message.content.slice(0, index + 1));
      index++;

      if (index >= message.content.length) {
        clearInterval(interval);
      }
    }, 15); // velocidade (menor = mais rápido)

    return () => clearInterval(interval);
  }, [message, isUser]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "0.5rem",
      }}
    >
      <div
        style={{
          width: '70%',
          maxWidth: '700px',
          minWidth: '200px',
          padding: '0.6rem 0.9rem',
          borderRadius: '0.7rem',
          backgroundColor: isUser ? '#2563eb' : '#e5e7eb',
          color: isUser ? '#ffffff' : '#111827',
          fontSize: '0.9rem',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {displayedText}
      </div>
    </div>
  );
};

export default ChatMessageComponent;
