import "./firebaseAdmin";

// Import and export the friend-related functions
export {
  sendFriendRequest,
  respondToFriendRequest,
} from "./leaderboard/friends";

// Import and export AI functions
export { getChatResponse } from "./ai/chat";
export { getTaggingSuggestions } from "./ai/tagging";
export { getRecommendations } from "./ai/recommendations";
