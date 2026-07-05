function parseJson(value) {
  if (!value) return {};
  if (typeof value === "object") return value;

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function readStreamBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      resolve(parseJson(data));
    });

    req.on("error", reject);
  });
}

export async function parseBody(req) {
  if (req.body !== undefined && req.body !== null) {
    return parseJson(req.body);
  }

  if (req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS") {
    return {};
  }

  if (typeof req.on === "function") {
    return readStreamBody(req);
  }

  return {};
}
