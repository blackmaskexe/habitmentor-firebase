import chatResponseSchema from "./chat.model";
import { AiResponseType, UserMessageType } from "./types";
import { OpenAI } from "openai";

export async function getAiChatResponse(
  userData: UserMessageType,
  aiClient: OpenAI
) {
  const response = await aiClient.responses.create({
    model: "gpt-4.1-nano-2025-04-14",
    input: [{ role: "user", content: JSON.stringify(userData) }],
    tools: chatResponseSchema.map((tool: any) => ({
      ...tool,
      type: "function",
    })),
  });

  let args: AiResponseType;
  console.log(response);

  if ("arguments" in response.output[0]) {
    // the function calling is showing correct behavior
    args = JSON.parse(response.output[0].arguments);
  } else {
    // in cases where the function calling fails, returns an unusual output (but it is the same kind of format each time it fails so can catch that exception)
    args = {
      response: response.output_text,
      importantMessage: false,
      actionableSteps: [],
    };
  }

  return args;
}
