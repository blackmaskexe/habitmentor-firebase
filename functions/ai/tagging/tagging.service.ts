import OpenAI from "openai";
import { HabitObject } from "../../utils/types";
import { taggingPrompt } from "./tagging.prompt";
import { tagResponseSchema } from "./tagging.model";
import { TagResponse } from "../../utils/types";
export async function getTagsForHabits(
  habitsData: HabitObject[],
  client: OpenAI
) {
  const response = await client.responses.create({
    model: "gpt-4o-mini", // cheaper model for tagging task
    input: [
      {
        role: "user",
        content: taggingPrompt(habitsData),
      },
    ],
    tools: tagResponseSchema.map((tool: any) => ({
      ...tool,
      type: "function",
    })), // schema for structured habit tagging
  });

  if ("arguments" in response.output[0]) {
    // the function calling is working correctly
    const result: TagResponse = JSON.parse(response.output[0].arguments);
    // Return the habitTags array directly
    return result.habitTags;
  } else {
    // fallback if function calling fails
    console.log("Function calling failed for tagging");
    return null;
  }
}
