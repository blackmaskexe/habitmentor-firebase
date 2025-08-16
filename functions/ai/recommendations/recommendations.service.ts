import OpenAI from "openai";
import { proActiveRecommendationPrompt } from "./recommendations.prompt";
import { ProActiveRequestPayload } from "../../utils/types";

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
