import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db, auth } from "../../firebaseAdmin";

export const deleteUserDataAndAccount = onCall(async (request) => {
  try {
    const userId = request.auth?.uid;

    if (!userId) {
      throw new HttpsError(
        "unauthenticated",
        "You must be logged in to delete your account."
      );
    }

    // 1. Get user's friends list first (before deleting user doc)
    const userDoc = await db.collection("users").doc(userId).get();
    const friendIds = userDoc.data()?.friends || [];

    // 2. Clean up friend references efficiently
    await cleanupFriendsReferences(userId, friendIds);

    // 3. Delete user's Firestore data
    await db.collection("users").doc(userId).delete();

    // 4. Delete Firebase Auth account as a last step
    await auth.deleteUser(userId);

    return { success: true, message: "Account deleted successfully" };
  } catch (err) {
    console.error("Account deletion failed:", err);
    throw new HttpsError("internal", "Failed to delete account");
  }
});

async function cleanupFriendsReferences(userId: string, friendIds: string[]) {
  if (friendIds.length === 0) return; // no need to cleaup friends if the user
  // doesn't have friends (alone nugget)

  const batch = db.batch();

  // Only update friends who actually have this user as a friend
  for (const friendId of friendIds) {
    const friendDocRef = db
      .collection("users")
      .doc(friendId)
      .collection("friends")
      .doc(userId);
    batch.delete(friendDocRef);
  }

  await batch.commit();
}
