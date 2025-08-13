import OpenAI from "openai";
import { HabitObject } from "../../utils/types";
import { taggingPrompt } from "./tagging.prompt";
import { tagResponseSchema } from "./tagging.model";

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
}
