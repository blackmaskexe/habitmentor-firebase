import { Router } from "express";
import {
  postEmotionAwareRecommendation,
  postProActiveRecommendation,
} from "./recommendations.controller";
import OpenAI from "openai";

export function createRecommendationsRouter(client: OpenAI) {
  const router = Router();
  router.post("/pro-active", (req, res, next) =>
    postProActiveRecommendation(req, res, next, client)
  );

  router.post("/emotion-aware-suggestion", (req, res, next) => {
    postEmotionAwareRecommendation(req, res, next, client);
  });

  return router;
}
