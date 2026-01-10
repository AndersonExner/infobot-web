export interface ChatMessage {
    id: string,
    role: 'user' | 'assistant' | 'system';
    content: string;
    createdAt: string;
    sources?: string[];
}

export interface ChatRequest {
    messagem: string;
}

export interface ChatResponse {
    message: string;
    sources?: string[];
}