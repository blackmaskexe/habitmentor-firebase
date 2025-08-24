import { Ionicons } from "@expo/vector-icons";

// note: this is copied from habitmentor-ai
// https://github.com/blackmaskexe/habitmentor-ai/blob/main/utils/types.ts
export interface HabitObject {
  frequency: boolean[];
  habitDescription: string;
  habitName: string;
  iconName: keyof typeof Ionicons.glyphMap | string; // Type for Ionicons, complicated but that's what is used
  id: string;
  points: number;
  notificationIds?: string[];
  notificationTime?: string; // formattedTime (see date.ts)
  isNotificationOn: boolean;
  startDate?: string; // formattedDate (see date.ts)
  tags?: string[];
}

export type UserMessageType = {
  id: string;
  sender: string;
  content: string;
  $createdAt: Date;
  loading: boolean;
  additionalData?: {
    actionableSteps?: string[];
  };
};

export type AiResponseType = {
  actionableSteps: string[];
  importantMessage: boolean;
  response: string;
};

export type ProActiveRequestPayload = {
  habitCompletionCollection: any[];
  importantMessages: string[];
};

export type EmotionAwareSuggestionRequestPayload = {
  dailyMetadataRecords: {
    moodRating?: number;
    habitCompletionRate?: number;
    missedHabits?: string[]; // array of habitId
  };
};

export type tagItem = {
  habitId: string;
  tags: string[];
};
export type TagResponse = {
  habitTags: tagItem[];
};
