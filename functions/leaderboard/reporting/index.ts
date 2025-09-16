import { onCall, HttpsError } from "firebase-functions/https";
import { db, auth } from "../../firebaseAdmin";

export const reportUser = onCall(async (request) => {
  try {
    const userId = request.auth?.uid; // reporter's id
    const { reportedId } = request.data; // reported person's id

    console.log("oh, the less I know the better", userId, reportedId);

    if (!userId) {
      throw new HttpsError(
        "unauthenticated",
        "You must be logged in to report a user"
      );
    }

    if (
      !reportedId ||
      typeof reportedId !== "string" ||
      reportedId.trim() === ""
    ) {
      throw new HttpsError(
        "invalid-argument",
        "A valid reportedId must be provided."
      );
    }

    // 1. getting the reference of the doc in which we will put reports:
    const reportedDocRef = db.collection("reports").doc(reportedId);
    reportedDocRef.set({
      reported: true,
    });
  } catch (err) {
    console.error("Reporting Failed:", err);
    throw new HttpsError("internal", "Failed to Report User");
  }
});

export const blockUser = onCall(async (request) => {
  try {
    const userId = request.auth?.uid; // blocker's id
    const { gettingBlockedUserId } = request.data; // id of the person getting blocked

    if (!userId) {
      throw new HttpsError(
        "unauthenticated",
        "You must be logged in to block a user"
      );
    }
    if (
      !gettingBlockedUserId ||
      typeof gettingBlockedUserId !== "string" ||
      gettingBlockedUserId.trim() === ""
    ) {
      throw new HttpsError(
        "invalid-argument",
        "A valid gettingBlockedUserId must be provided."
      );
    }

    // Check if the user to be blocked exists
    const blockedUserDoc = await db
      .collection("users")
      .doc(gettingBlockedUserId)
      .get();
    if (!blockedUserDoc.exists) {
      throw new HttpsError(
        "not-found",
        "The user you are trying to block does not exist."
      );
    }
    const blockedUserData = blockedUserDoc.data();

    // Prepare the friend entry data
    const friendEntry = {
      status: "blocked",
      avatarIcon: blockedUserData?.avatarIcon || null,
      nickname: blockedUserData?.nickname || null,
      createdAt: blockedUserData?.createdAt || null,
    };

    const batch = db.batch();

    // Set the friend entry in the blocker's friends subcollection
    const blockerFriendRef = db
      .collection("users")
      .doc(userId)
      .collection("friends")
      .doc(gettingBlockedUserId);
    batch.set(blockerFriendRef, friendEntry, { merge: true });

    // Remove the blocker from the blocked user's friends subcollection if present
    const blockedUserFriendRef = db
      .collection("users")
      .doc(gettingBlockedUserId)
      .collection("friends")
      .doc(userId);
    batch.delete(blockedUserFriendRef);

    await batch.commit();
    return { success: true, message: "User blocked successfully." };
  } catch (err) {
    console.log("failed to block user", err);
    throw new HttpsError("internal", "Faile to block the user");
  }
});

export const unblockUser = onCall(async (request) => {
  const userId = request.auth?.uid; // blocker's id
  const { gettingUnblockedUserId } = request.data; // id of the person getting blocked

  if (!userId) {
    throw new HttpsError(
      "unauthenticated",
      "You must be logged in to block a user"
    );
  }
  if (
    !gettingUnblockedUserId ||
    typeof gettingUnblockedUserId !== "string" ||
    gettingUnblockedUserId.trim() === ""
  ) {
    throw new HttpsError(
      "invalid-argument",
      "A valid gettingUnblockedUser must be provided."
    );
  }

  // what a block status means
  // is that the user sending this unblock request
  // has the user that is blocked in their friends with the status of 'blocked'
  // we want to check if this is true, and if it is,
  // we remove that friend's doc entirely, making the new
  // status as nothing (have to send a friend request again to do shi)

  const gettingUnblockedUserFriendDoc = await db
    .collection("users")
    .doc(userId)
    .collection("friends")
    .doc(gettingUnblockedUserId);

  const gettingUnblockedUserFriendSnapshot =
    await gettingUnblockedUserFriendDoc.get();

  if (
    gettingUnblockedUserFriendSnapshot &&
    gettingUnblockedUserFriendSnapshot.exists
  ) {
    const blockedUserData = gettingUnblockedUserFriendSnapshot.data();
    if (blockedUserData?.status == "blocked") {
      await gettingUnblockedUserFriendDoc.delete();
      return {
        success: true,
        message: "user unblocked successfully",
      };
    } else throw new HttpsError("invalid-argument", "user is not blocked.");
  } else
    throw new HttpsError("not-found", "blocked user relationship not found!");
});
