import { getTagsForHabits } from "./tagging.service";
import { HabitObject, tagItem } from "../../utils/types";
import { Request, Response, NextFunction } from "express";
import OpenAI from "openai";

// Controller function for POST /tag-habits
export async function postTagHabits(
  req: Request,
  res: Response,
  _: NextFunction,
  client: OpenAI
) {
  const habitsData: HabitObject[] = req.body;
  console.log("Tagging habits data:", habitsData);

  try {
    // Use the service to get tags for habits
    const result: tagItem[] =
      (await getTagsForHabits(habitsData, client)) || [];

    if (result && result.length > 0) {
      // Return the habitTags array directly
      res.json(result);
    } else {
      // fallback if function calling fails
      console.log("Function calling failed for tagging");

      // empty array for no tags at all
      res.json([]);
    }
  } catch (err) {
    console.log("Error in tag-habits:", err);

    // empty array for no tags at all
    res.json([]);
  }
}
