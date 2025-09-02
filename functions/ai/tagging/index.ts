import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getTagsForHabits } from "./tagging.service";
import { defineSecret } from "firebase-functions/params";
import OpenAI from "openai";

const openaiApiKey = defineSecret("OPENAI_API_KEY");

let client: OpenAI | null = null;

export const getTaggingSuggestions = onCall(
  { secrets: [openaiApiKey] },
  async (request) => {
    const { habits } = request.data;
    if (!habits) {
      throw new HttpsError(
        "invalid-argument",
        "The function must be called with 'habits'."
      );
    }

    if (!client) {
      client = new OpenAI({ apiKey: openaiApiKey.value() });
    }

    try {
      const taggedHabits = await getTagsForHabits(habits, client);
      return taggedHabits;
    } catch (err) {
      console.error("Error getting tagging suggestions:", err);
      throw new HttpsError("internal", "Failed to get tagging suggestions.");
    }
  }
);
