import { proActiveRecommendationPrompt } from "./recommendations.prompt";

export async function getProActiveRecommendation(userData, client) {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-nano-2025-04-14", // replace fine tuned model with regular 4.1 nano
      input: [
        {
          role: "user",
          content: proActiveRecommendationPrompt + userData,
        },
      ],
    });

    const aiResponse =
      response.output_text ||
      "There was some error generating the response it seems. Try again later.";
    return aiResponse;
  } catch (err) {
    console.log(err);

    const errorMessage =
      "There was some error generating the response it seems. Try again later.";
    return errorMessage;
  }
}
