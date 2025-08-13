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
