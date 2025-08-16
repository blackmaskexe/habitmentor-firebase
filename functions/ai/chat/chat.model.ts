const chatResponseSchema = [
  {
    type: "function",
    name: "generate_habit_response",
    description: `Generate a response to the user based on their habit history and conversation context.
      You will serve as a chatbot in a habit tracking app to the user, giving the user actions that can help them become more
      consistent towards their habits. Make sure to use as many connections between the user's recentMessageHistory (last 20 or so messages), important messages (messages that help you be more closer to the user), and other metadata`,
    parameters: {
      type: "object",
      properties: {
        response: {
          type: "string",
          description: `The main message from the AI to the user.
          Please do not include the things that you mention in the actionable steps in this response.
          Also, keep your response short: about 1-2 sentences only.`,
        },
        importantMessage: {
          type: "boolean",
          description: `Give importance to the user's message.
            Mark those messages important which contain information that can help you know the user better,
            therefore, things such as user's personal thoughts, past context, things that will help you better serve the user in the future.
            Do not mark those messages important which involve general advice about improving habits, consistency tips, queries about the app, etc.
            I repeat. Do not mark those messages as important which involve asking for "consistency tips", "Help improve habit xyz", or thins along these lines `,
        },
        actionableSteps: {
          type: "array",
          description:
            "A list of suggested actions the user can take related to their habits. However, do not overwhelm the user with LOTS of steps, just 2-4 crucial ones",
          items: {
            type: "string",
          },
        },
      },
      required: ["response", "importantMessage", "actionableSteps"],
      additionalProperties: false,
    },
  },
];

export default chatResponseSchema;
