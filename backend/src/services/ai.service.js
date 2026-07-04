import groq from "../config/groq.js";

export const generateResponse = async (messages) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate AI response.");
  }
};
