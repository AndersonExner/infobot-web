import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: "0.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          padding: "0.6rem 0.9rem",
          borderRadius: "0.7rem",
          backgroundColor: "#e5e7eb",
          color: "#111827",
          fontSize: "0.9rem",
        }}
      >
        <span className="typing-dot">.</span>
        <span className="typing-dot">.</span>
        <span className="typing-dot">.</span>
      </div>

      <style>
        {`
          .typing-dot {
            animation: blink 1.4s infinite both;
            font-size: 1.2rem;
          }

          .typing-dot:nth-child(1) {
            animation-delay: 0s;
          }
          .typing-dot:nth-child(2) {
            animation-delay: 0.2s;
          }
          .typing-dot:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes blink {
            0% { opacity: 0.2; }
            20% { opacity: 1; }
            100% { opacity: 0.2; }
          }
        `}
      </style>
    </div>
  );
};

export default TypingIndicator;
