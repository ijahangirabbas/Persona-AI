import { getGroqClient } from "../config/groq.js";

export const generateResponse = async (messages) => {
  try {
    const groq = getGroqClient();
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.65,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("[generateResponse]", error);

    if (error.message === "GROQ_API_KEY is not configured.") {
      throw error;
    }

    throw new Error("Failed to generate AI response.");
  }
};
