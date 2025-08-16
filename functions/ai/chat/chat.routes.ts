import { Router } from "express";
import { postChat } from "./chat.controller";

// Accepts the OpenAI client as a parameter for dependency injection
export function createChatRouter(client) {
  const router = Router();

  router.post("/chat", (req, res, next) => postChat(req, res, next, client));

  return router;
}
