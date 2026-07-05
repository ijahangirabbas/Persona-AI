function getAllowedOrigins() {
  const fromEnv = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
    : [];

  if (process.env.VERCEL_URL) {
    fromEnv.push(`https://${process.env.VERCEL_URL}`);
  }

  fromEnv.push("http://localhost:5173", "http://127.0.0.1:5173");

  return [...new Set(fromEnv)];
}

export function applyCors(req, res) {
  const origin = req.headers.origin;
  const allowed = getAllowedOrigins();

  if (!origin || allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export function handlePreflight(req, res) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  return false;
}
