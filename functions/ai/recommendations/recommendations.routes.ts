import { Router } from "express";
import { postProActiveRecommendation } from "./recommendations.controller";
import OpenAI from "openai";

export function createRecommendationsRouter(client: OpenAI) {
  const router = Router();
  router.post("/pro-active", (req, res, next) =>
    postProActiveRecommendation(req, res, next, client)
  );
  return router;
}
