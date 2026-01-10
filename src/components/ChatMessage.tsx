import React from "react";
import type { ChatMessage } from "../types/Chat";

interface Props {
    message : ChatMessage
}

const ChatMessageComponent: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '0.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '70%',
          padding: '0.6rem 0.9rem',
          borderRadius: '0.7rem',
          backgroundColor: isUser ? '#2563eb' : '#e5e7eb',
          color: isUser ? '#ffffff' : '#111827',
          fontSize: '0.9rem',
          whiteSpace: 'pre-wrap',
        }}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessageComponent;