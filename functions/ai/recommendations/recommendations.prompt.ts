import {
  EmotionAwareSuggestionRequestPayload,
  ProActiveRequestPayload,
} from "../../utils/types";

export function proActiveRecommendationPrompt(
  userData: ProActiveRequestPayload
): string {
  return `If the following content has no mention of any habitName, habitId, or something like that, then tell the user to come back again after doing some habits so that the AI can tailor make recommendations for them.
If the user does have some habit data, give them some recommendations on how they can improve those habits. Try to analyze the patterns of the user's habits and give them tailored recommendations. Try to limit your response to around 40 words (some plus or minus is fine).
Also, make sure to just give recommendation, and avoid saying things like "You're doing well", "good going", etc etc.
These are the user's habit data: ${JSON.stringify(userData)}.`;
}

export function emotionAwareRecommendationPrompt(
  userData: EmotionAwareSuggestionRequestPayload
) {
  return `If the userHabitMetadata contains no relevant information, tell them to do more habits before getting valid advice.
  This is the user's habit metadata information for the past few days: ${JSON.stringify(
    userData
  )}
  The user's mood is based on numbers between 0 and 1. Look for patterns in the user's habits and their mood, and give
  them emotion-aware recommendations on what they can do in order to improve at their habits. Note: Try and keep the response below 50-70 words, but going a litlte bit over is fine too
  For example, try connecting the user's poor mood with their lack of doing certain habits, happy mood with completing certain habits, and so on.
  The userHabitMetadata that you will receive will contain of key-value pairs, where each key is the date associated, and the value will contain things like user's mood from 0 to 1, the habits they've missed, and the habit completion rate.
  Use these information in order to give them tailored recommendations to improve their well-being as well as habit consistency.`;
}
