export const tagResponseSchema = [
  {
    type: "function",
    name: "generate_habit_tags",
    description: `You will receive an array of habit objects, each with habitId, habitName, and habitDescription. 
    Assign 1-5 tags to each habit from the master tag list. Return an array of objects where each object contains 
    habitId and tags properties.`,
    parameters: {
      type: "object",
      properties: {
        habitTags: {
          type: "array",
          description:
            "An array of objects containing habitId and assigned tags for each habit",
          items: {
            type: "object",
            properties: {
              habitId: {
                type: "string",
                description: "The unique identifier for the habit",
              },
              tags: {
                type: "array",
                description:
                  "An array of 1-5 tags assigned to this habit from the master tag list",
                items: {
                  type: "string",
                },
                minItems: 1,
                maxItems: 5,
              },
            },
            required: ["habitId", "tags"],
            additionalProperties: false,
          },
        },
      },
      required: ["habitTags"],
      additionalProperties: false,
    },
  },
];

// Expected input format:
// [
//   {
//     habitId: '123',
//     habitName: 'workout in gym',
//     habitDescription: 'be consistent with working out'
//   },
//   {
//     habitId: '456',
//     habitName: 'journal entry',
//     habitDescription: 'journal in my notebook'
//   }
// ]

// Expected response format:
// [
//   {
//     habitId: '123',
//     tags: ['exercise', 'strength', 'health', 'fitness']
//   },
//   {
//     habitId: '456',
//     tags: ['mindfulness', 'journaling', 'therapy', 'focus']
//   }
// ]

export const MASTER_TAG_LIST = [
  // === BROAD CATEGORIES ===
  "health",
  "fitness",
  "productivity",
  "learning",
  "mindfulness",
  "social",
  "creativity",
  "finance",
  "self-care",

  // === LOCATION-BASED ===
  "outdoor",
  "indoor",
  "home",
  "work",

  // === PHYSICAL HEALTH & FITNESS ===
  "exercise",
  "cardio",
  "strength",
  "flexibility",
  "nutrition",
  "hydration",
  "sleep",
  "recovery",

  // === MENTAL HEALTH & WELLNESS ===
  "meditation",
  "journaling",
  "therapy",
  "stress-relief",
  "gratitude",
  "breathing",

  // === LEARNING & DEVELOPMENT ===
  "reading",
  "skill-building",
  "language",
  "professional-development",
  "education",
  "practice",

  // === PRODUCTIVITY & ORGANIZATION ===
  "planning",
  "time-management",
  "organization",
  "focus",
  "goal-setting",
  "habit-tracking",

  // === SOCIAL & RELATIONSHIPS ===
  "communication",
  "family",
  "friends",
  "networking",
  "community",

  // === CREATIVE & HOBBIES ===
  "art",
  "music",
  "writing",
  "photography",
  "cooking",

  // === FINANCIAL ===
  "budgeting",
  "saving",
  "investing",
  "spending-control",
];
