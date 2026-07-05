import { applyCors, handlePreflight } from "../backend/src/lib/cors.js";

export default function handler(req, res) {
  applyCors(req, res);
  if (handlePreflight(req, res)) return;

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  return res.status(200).json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
