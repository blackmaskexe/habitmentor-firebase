import { Router } from "express";
import { postProActiveRecommendation } from "./recommendations.controller";

export function createRecommendationsRouter(client) {
  const router = Router();
  router.post("/pro-active", (req, res, next) =>
    postProActiveRecommendation(req, res, next, client)
  );
  return router;
}
