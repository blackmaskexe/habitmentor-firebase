import { Router } from "express";
import { postChat } from "./chat.controller";
import OpenAI from "openai";

// Accepts the OpenAI client as a parameter for dependency injection
export function createChatRouter(client: OpenAI) {
  const router = Router();

  router.post("/chat", (req, res, next) => postChat(req, res, next, client));

  return router;
}
