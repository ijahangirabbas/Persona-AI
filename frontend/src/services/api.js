const API_BASE = import.meta.env.VITE_API_URL ?? "";

export async function sendChatMessage(persona, message) {
  const response = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ persona, message }),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Unexpected server response.");
  }

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to get a response.");
  }

  return data.response;
}
