import personas from "../personas/index.js";
import { HINGLISH_POLICY } from "../personas/language-policy.js";

export const buildPrompt = (personaName, userMessage) => {
  const personaPrompt =
    personas[personaName] || "You are a helpful AI assistant.";

  const systemPrompt = `${HINGLISH_POLICY}\n\n${personaPrompt}\n\nREMINDER: ${HINGLISH_POLICY}`;

  return [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: userMessage,
    },
  ];
};
