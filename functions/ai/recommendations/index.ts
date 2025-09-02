import { onCall, HttpsError } from "firebase-functions/v2/https";
import {
  getEmotionAwareSuggestion,
  getProActiveRecommendation,
} from "./recommendations.service";
import { defineSecret } from "firebase-functions/params";
import OpenAI from "openai";

const openaiApiKey = defineSecret("OPENAI_API_KEY");

let client: OpenAI | null = null;

export const getProActiveRecommendationResponse = onCall(
  { secrets: [openaiApiKey] },
  async (request) => {
    const { userData } = request.data;
    console.log("This is what the user data being received is:", userData);
    if (!userData) {
      throw new HttpsError(
        "invalid-argument",
        "The function must be called with 'userData'."
      );
    }

    if (!client) {
      client = new OpenAI({ apiKey: openaiApiKey.value() });
    }

    try {
      const recommendations = await getProActiveRecommendation(
        userData,
        client
      );
      return recommendations;
    } catch (err) {
      console.error("Error getting recommendations:", err);
      throw new HttpsError("internal", "Failed to get recommendations.");
    }
  }
);

export const getEmotionAwareSuggestionResponse = onCall(
  { secrets: [openaiApiKey] },
  async (request) => {
    const { userData } = request.data;
    console.log("This is what the user data being received is:", userData);
    if (!userData) {
      throw new HttpsError(
        "invalid-argument",
        "The function must be called with 'userData'."
      );
    }

    if (!client) {
      client = new OpenAI({ apiKey: openaiApiKey.value() });
    }

    try {
      const recommendations = await getEmotionAwareSuggestion(userData, client);
      return recommendations;
    } catch (err) {
      console.error("Error getting recommendations:", err);
      throw new HttpsError("internal", "Failed to get recommendations.");
    }
  }
);
