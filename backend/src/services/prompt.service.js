import personas from "../personas/index.js";

export const buildPrompt = (personaName, userMessage) => {
  const systemPrompt =
    personas[personaName] || "You are a helpful AI assistant.";

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
