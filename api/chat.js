import { processChat } from "../backend/src/handlers/chat.js";
import { applyCors, handlePreflight } from "../backend/src/lib/cors.js";
import { parseBody } from "../backend/src/lib/parse-body.js";
import { HttpError } from "../backend/src/lib/http-error.js";

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  applyCors(req, res);
  if (handlePreflight(req, res)) return;

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  try {
    const response = await processChat(await parseBody(req));
    return res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("[api/chat]", error);

    if (error.message === "GROQ_API_KEY is not configured.") {
      return res.status(503).json({
        success: false,
        message: "Server is missing GROQ_API_KEY. Add it in Vercel project settings.",
      });
    }

    const status = error instanceof HttpError ? error.status : 500;
    const message =
      error instanceof HttpError
        ? error.message
        : error.message || "Failed to generate response.";

    return res.status(status).json({ success: false, message });
  }
}
