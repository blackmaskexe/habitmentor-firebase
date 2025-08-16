import { Router } from "express";
import { createChatRouter } from "../ai/chat/chat.routes";
import { createTaggingRouter } from "../ai/tagging/tagging.routes";
import { createRecommendationsRouter } from "../ai/recommendations/recommendations.routes";

// Accepts the OpenAI client and returns a router with all feature routers mounted
export function createMainRouter(client) {
  const router = Router();
  router.use("/", createChatRouter(client));
  router.use("/", createTaggingRouter(client));
  router.use("/", createRecommendationsRouter(client));
  return router;
}
