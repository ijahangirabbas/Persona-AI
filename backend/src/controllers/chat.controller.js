import { processChat } from "../handlers/chat.js";
import { parseBody } from "../lib/parse-body.js";
import { HttpError } from "../lib/http-error.js";

export const chat = async (req, res) => {
  try {
    const response = await processChat(await parseBody(req));
    res.json({ success: true, response });
  } catch (error) {
    console.error("[chat]", error);

    const status = error instanceof HttpError ? error.status : 500;
    const message =
      error instanceof HttpError
        ? error.message
        : error.message || "Failed to generate response.";

    res.status(status).json({ success: false, message });
  }
};
