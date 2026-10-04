import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { publicPlatformScript } from "./publicConfig";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { authenticateLocalAccount, clearLocalSession, createLocalAccount, getLocalUser, setLocalSession } from "./localAuth";
import { createWorker } from "tesseract.js";

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/mobile/auth/me", async (req, res) => res.json(await getLocalUser(req)));
  app.post("/api/mobile/auth/register", async (req, res) => {
    try { const user = await createLocalAccount(req.body); if (!user) throw new Error("Le compte n’a pas pu être créé."); await setLocalSession(res, user); res.json(user); }
    catch (error) { res.status(400).json({ message: error instanceof Error ? error.message : "Inscription impossible." }); }
  });
  app.post("/api/mobile/auth/login", async (req, res) => {
    const user = await authenticateLocalAccount(req.body?.email || "", req.body?.password || "");
    if (!user) return res.status(401).json({ message: "Adresse email ou mot de passe incorrect." });
    await setLocalSession(res, user); res.json(user);
  });
  app.post("/api/mobile/auth/logout", (req, res) => { clearLocalSession(res); res.json({ success: true }); });
  app.post("/api/mobile/ocr", async (req, res) => {
    try { const raw = String(req.body?.imageBase64 || "").replace(/^data:image\/[^;]+;base64,/, ""); if (!raw) return res.status(400).json({ message: "Image manquante." }); const worker = await createWorker("fra+eng"); const result = await worker.recognize(Buffer.from(raw, "base64")); await worker.terminate(); res.json({ text: result.data.text.trim() }); }
    catch (error) { res.status(500).json({ message: error instanceof Error ? error.message : "OCR indisponible." }); }
  });
  app.get("/api/platform/config.js", (_req, res) => {
    res.set("Cache-Control", "no-store").type("application/javascript").send(publicPlatformScript());
  });
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = Number(process.env.PORT || "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
  server.on("error", error => { console.error("Server failed:", error.message); process.exit(1); });
  server.listen(port, "0.0.0.0", () => console.log(`Server listening on port ${port}`));
}

startServer().catch(error => { console.error(error); process.exit(1); });
