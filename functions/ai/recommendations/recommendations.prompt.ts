export const proActiveRecommendationPrompt = ` If the following content has no mention of any habitName, habitId, or something like that, then tell the user to come back again after doing some habits so that the AI can tailor make recommendations for them.
If the user does have some habit data, give them some recommendations on how they can improve those habits. Try to analyze the patterns of the user's habits and give them tailored recommendations. Try to limit the your response to around 40 words (some plus or minus is fine).
Also, make sure to just give recommendation, and avoid saying things like "You're doing well", "good going", etc etc. 
These are the user's habit data:`;
