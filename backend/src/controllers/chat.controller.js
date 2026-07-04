import { generateResponse } from "../services/ai.service.js";
import { buildPrompt } from "../services/prompt.service.js";
import personas from "../personas/index.js";

export const chat = async (req, res) => {
  try {
    const { persona, message } = req.body;

    if (!persona || !personas[persona]) {
      return res.status(400).json({
        success: false,
        message: "A valid persona is required.",
      });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length > 4000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long (max 4000 characters).",
      });
    }

    const messages = buildPrompt(persona, trimmedMessage);
    const response = await generateResponse(messages);

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error("[chat]", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate response.",
    });
  }
};
