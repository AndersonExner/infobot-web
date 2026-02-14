import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./components/ChatMessage";
import type { ChatMessage as ChatMessageType } from "./types/Chat";
import { sendChatMessage, uploadDocument } from "./services/InfoBotApi";
import TypingIndicator from "./components/TypingIndicator";

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, [messages, isSending]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const resp = await sendChatMessage(trimmed);

      const botMessage: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: resp.answer ?? "(sem resposta)",
        createdAt: new Date().toISOString(),
        sources: resp.sources,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Erro ao consultar InfoBot: ${err?.message ?? "erro desconhecido"}`,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadDocument(file);
      alert("Documento enviado e será processado pelo InfoBot.");
    } catch (err: any) {
      alert(`Erro ao enviar documento: ${err?.message ?? "erro desconhecido"}`);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "#020617",
          borderRadius: "0.75rem",
          padding: "1rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          height: "90vh",
        }}
      >
        {/* Header */}
        <header
          style={{
            paddingBottom: "0.75rem",
            borderBottom: "1px solid #1f2937",
            marginBottom: "0.75rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "1.2rem",
                color: "#e5e7eb",
              }}
            >
              InfoBot
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                color: "#9ca3af",
              }}
            >
              Pergunte com base nos documentos indexados.
            </p>
          </div>

          {/* <div>
            <label
              style={{
                fontSize: '0.75rem',
                color: '#9ca3af',
                border: '1px solid #374151',
                borderRadius: '999px',
                padding: '0.25rem 0.75rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>{isUploading ? 'Enviando...' : 'Enviar documento'}</span>
              <input
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div> */}
        </header>

        {/* Chat area */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            padding: "0.5rem",
            backgroundColor: "#020617",
            borderRadius: "0.5rem",
            border: "1px solid #111827",
          }}
        >
          {messages.length === 0 && (
            <div
              style={{
                textAlign: "center",
                marginTop: "2rem",
                color: "#6b7280",
                fontSize: "0.9rem",
              }}
            >
              Comece enviando uma pergunta sobre seus documentos. ✨
            </div>
          )}

          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}

          {isSending && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          style={{
            marginTop: "0.75rem",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <input
            type="text"
            placeholder="Digite sua pergunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSending}
            style={{
              flex: 1,
              padding: "0.6rem 0.8rem",
              borderRadius: "999px",
              border: "1px solid #374151",
              backgroundColor: "#020617",
              color: "#e5e7eb",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={isSending || !input.trim()}
            style={{
              padding: "0.6rem 1.2rem",
              borderRadius: "999px",
              border: "none",
              backgroundColor: isSending ? "#1f2937" : "#2563eb",
              color: "#ffffff",
              fontSize: "0.9rem",
              cursor: isSending ? "default" : "pointer",
              opacity: isSending ? 0.7 : 1,
              whiteSpace: "nowrap",
            }}
          >
            {isSending ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
