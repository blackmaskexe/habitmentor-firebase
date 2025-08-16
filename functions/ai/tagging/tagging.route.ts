import { Router } from "express";
import { postTagHabits } from "./tagging.controller";

export function createTaggingRouter(client) {
  const router = Router();

  router.post("/tag-habits", (req, res, next) =>
    postTagHabits(req, res, next, client)
  );

  return router;
}
