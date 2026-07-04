import { generateResponse } from "../services/ai.service.js";
import { buildPrompt } from "../services/prompt.service.js";

export const chat = async (req, res) => {
  try {
    const { persona, message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const messages = buildPrompt(persona, message);

    const response = await generateResponse(messages);

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
