import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getAiChatResponse } from "./chat.service";
import { defineSecret } from "firebase-functions/params";
import OpenAI from "openai";

const openaiApiKey = defineSecret("OPENAI_API_KEY");

let client: OpenAI | null = null;

export const getChatResponse = onCall(
  { secrets: [openaiApiKey] },
  async (request) => {
    const uid = request.auth?.uid;
    if (!uid) {
      throw new HttpsError("unauthenticated", "You must be logged in.");
    }

    const { messages } = request.data;
    if (!messages) {
      throw new HttpsError(
        "invalid-argument",
        "The function must be called with 'messages'."
      );
    }

    if (!client) {
      client = new OpenAI({ apiKey: openaiApiKey.value() });
    }

    try {
      const aiResponse = await getAiChatResponse(messages, client);
      return aiResponse;
    } catch (err) {
      console.error("Error getting AI chat response:", err);
      throw new HttpsError("internal", "Failed to get AI response.");
    }
  }
);
