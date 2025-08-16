import { HabitObject } from "../../utils/types";
import { MASTER_TAG_LIST } from "./tagging.model";

export function taggingPrompt(habitsData: HabitObject[]) {
  return `Please assign 1-5 relevant tags to each of the following habits using
  ONLY tags from this master list: ${MASTER_TAG_LIST.join(", ")}
  Habits to tag: ${JSON.stringify(habitsData)}
  Return the result as an array of objects, each with habitId and tags properties.`;
}
