import {
  getEmotionAwareSuggestion,
  getProActiveRecommendation,
} from "./recommendations.service";
import { Request, Response, NextFunction } from "express";
import OpenAI from "openai";

// Controller for POST /pro-active
export async function postProActiveRecommendation(
  req: Request,
  res: Response,
  _: NextFunction,
  client: OpenAI
) {
  try {
    const userData = req.body;
    console.log("Sneaky text message siphon", userData);
    const aiResponse = await getProActiveRecommendation(userData, client);
    res.json({
      response: aiResponse,
      success: !!aiResponse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: null,
      success: false,
      error: "Internal server error",
    });
  }
}

export async function postEmotionAwareRecommendation(
  req: Request,
  res: Response,
  _: NextFunction,
  client: OpenAI
) {
  try {
    const userData = req.body;
    console.log("I like my cheese drippy brah", userData);

    const aiResponse = await getEmotionAwareSuggestion(userData, client);
    res.json({
      response: aiResponse,
      success: !!aiResponse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: null,
      success: false,
      error: "Internal server error",
    });
  }
}
