import { generateResponse } from "../services/ai.service.js";
import { buildPrompt } from "../services/prompt.service.js";
import personas from "../personas/index.js";
import { HttpError } from "../lib/http-error.js";

export async function processChat(body) {
  const { persona, message } = body ?? {};

  if (!persona || !personas[persona]) {
    throw new HttpError(400, "A valid persona is required.");
  }

  if (!message || typeof message !== "string" || !message.trim()) {
    throw new HttpError(400, "Message is required.");
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length > 4000) {
    throw new HttpError(400, "Message is too long (max 4000 characters).");
  }

  const messages = buildPrompt(persona, trimmedMessage);
  return generateResponse(messages);
}
