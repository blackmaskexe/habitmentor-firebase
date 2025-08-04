// Master list of habit tags - from broad to specific categories
// This list covers physical, mental, social, professional, and lifestyle habits

const MASTER_TAG_LIST = [
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

module.exports = {
  MASTER_TAG_LIST,

  // Helper function to get random tags for testing
  getRandomTags: (count = 3) => {
    const shuffled = MASTER_TAG_LIST.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  // Helper function to validate if a tag exists in the master list
  isValidTag: (tag) => {
    return MASTER_TAG_LIST.includes(tag.toLowerCase());
  },

  // Helper function to get tags by category
  getTagsByCategory: () => {
    return {
      broad: [
        "health",
        "fitness",
        "productivity",
        "learning",
        "mindfulness",
        "social",
        "creativity",
        "finance",
        "self-care",
      ],
      locationBased: ["outdoor", "indoor", "home", "work"],
      physical: [
        "exercise",
        "cardio",
        "strength",
        "flexibility",
        "nutrition",
        "hydration",
        "sleep",
        "recovery",
      ],
      mental: [
        "meditation",
        "journaling",
        "therapy",
        "stress-relief",
        "gratitude",
        "breathing",
      ],
      learning: [
        "reading",
        "skill-building",
        "language",
        "professional-development",
        "education",
        "practice",
      ],
      productivity: [
        "planning",
        "time-management",
        "organization",
        "focus",
        "goal-setting",
        "habit-tracking",
      ],
      social: ["communication", "family", "friends", "networking", "community"],
      creative: ["art", "music", "writing", "photography", "cooking"],
      financial: ["budgeting", "saving", "investing", "spending-control"],
    };
  },
};
