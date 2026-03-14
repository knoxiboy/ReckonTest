// webhook-server.js — GitHub webhook server (corrected)

const express = require("express");
const crypto = require("crypto");

const app = express();

const SECRET = process.env.WEBHOOK_SECRET || "mysecretkey";

// ✅ Fix 8: Centralized logging (replace with DB write in production)
function logEvent(entry) {
  console.log("[webhook log]", entry);
  // e.g. await db.webhookLogs.insert(entry);
}

// ✅ Fix 1: Only for /webhook — capture raw body (no express.json() first)
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const rawBody = req.body instanceof Buffer ? req.body : Buffer.from(String(req.body || ""));

    // ✅ Fix 2: GitHub sends signature in x-hub-signature-256 for SHA-256
    const signature = req.headers["x-hub-signature-256"];
    if (!signature) {
      console.warn("Missing x-hub-signature-256");
      return res.status(401).send("Unauthorized");
    }

    // ✅ Fix 3: GitHub uses HMAC-SHA256
    const hmac = crypto.createHmac("sha256", SECRET);
    // ✅ Fix 4: Digest must be computed over the raw body (Buffer), not parsed JSON
    const digest = "sha256=" + hmac.update(rawBody).digest("hex");

    // ✅ Fix 5: Use timing-safe comparison to prevent timing attacks
    const sigBuf = Buffer.from(signature, "utf8");
    const digBuf = Buffer.from(digest, "utf8");
    if (sigBuf.length !== digBuf.length || !crypto.timingSafeEqual(sigBuf, digBuf)) {
      console.warn("Invalid webhook signature");
      return res.status(401).send("Unauthorized");
    }

    // Parse JSON only after signature is verified
    let payload = {};
    try {
      payload = JSON.parse(rawBody.toString("utf8"));
    } catch (e) {
      return res.status(400).send("Invalid JSON body");
    }

    // ✅ Fix 6: Check event type and handle only what you need
    const event = req.headers["x-github-event"];
    if (!event) {
      return res.status(400).send("Missing x-github-event");
    }
    console.log("Webhook event:", event);

    console.log("Webhook received:", event, payload.action || "");

    // ✅ Fix 7: Safe access with error handling for undefined fields
    if (event === "push" && payload.ref) {
      const parts = String(payload.ref).split("/");
      const branch = parts[2];
      console.log("Pushed to branch:", branch);
      // ✅ Fix 8: Log (replace with real DB call when you have one)
      logEvent({ event, branch, repo: payload.repository?.full_name, at: new Date().toISOString() });
    } else {
      logEvent({ event, payload: JSON.stringify(payload).slice(0, 200), at: new Date().toISOString() });
    }

    res.status(200).send("Webhook processed");
  }
);

// ✅ Fix 9: In production use HTTPS (e.g. behind a reverse proxy or with https module)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (process.env.NODE_ENV !== "production") {
    console.log("For production, run behind HTTPS (e.g. reverse proxy or use https module).");
  }
});
