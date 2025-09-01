import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getProActiveRecommendation } from "./recommendations.service";
import { defineSecret } from "firebase-functions/params";
import OpenAI from "openai";

const openaiApiKey = defineSecret("OPENAI_API_KEY");

let client: OpenAI | null = null;

export const getRecommendations = onCall(
  { secrets: [openaiApiKey] },
  async (request) => {
    const uid = request.auth?.uid;
    if (!uid) {
      throw new HttpsError("unauthenticated", "You must be logged in.");
    }

    const { userData } = request.data;
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
