import OpenAI from "openai";
import {
  emotionAwareRecommendationPrompt,
  proActiveRecommendationPrompt,
} from "./recommendations.prompt";
import {
  EmotionAwareSuggestionRequestPayload,
  ProActiveRequestPayload,
} from "../../utils/types";

export async function getProActiveRecommendation(
  userData: ProActiveRequestPayload,
  client: OpenAI
) {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-nano-2025-04-14",
      input: [
        {
          role: "user",
          content: proActiveRecommendationPrompt(userData),
        },
      ],
    });
    return (
      response.output_text ||
      "There was some error generating the response it seems. Try again later."
    );
  } catch (err) {
    console.log(err);
    return "There was some error generating the response it seems. Try again later.";
  }
}

export async function getEmotionAwareSuggestion(
  userData: EmotionAwareSuggestionRequestPayload,
  client: OpenAI
) {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-nano-2025-04-14", // might switch to better thinker model because of the nature of this call
      // but would have to restrict it to be less times executed a week then
      input: [
        {
          role: "user",
          content: emotionAwareRecommendationPrompt(userData),
        },
      ],
    });
    return (
      response.output_text ||
      "There was some error generating the response it seems. Try again later."
    );
  } catch (err) {
    console.log(err);
    return "There was some error generating the response it seems. Try again later.";
  }
}
