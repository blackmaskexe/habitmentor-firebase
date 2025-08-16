import { Router } from "express";
import { postTagHabits } from "./tagging.controller";
import OpenAI from "openai";

export function createTaggingRouter(client: OpenAI) {
  const router = Router();

  router.post("/tag-habits", (req, res, next) =>
    postTagHabits(req, res, next, client)
  );

  return router;
}
