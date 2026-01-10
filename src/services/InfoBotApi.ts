const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export async function sendChatMessage(question: string) {
  const response = await fetch(`${API_BASE_URL}/api/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }), 
  });

  if (!response.ok) {
    throw new Error(`Erro ao enviar mensagem: ${response.statusText}`);
  }

  const data = await response.json();
  return data as { answer: string; sources?: string[] };
}

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Erro ao enviar documento: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
