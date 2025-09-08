import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db } from "../../firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * Sends a friend request from the calling user to the recipient.
 */
export const sendFriendRequest = onCall(async (request) => {
  const senderId = request.auth?.uid;
  const { recipientId } = request.data;

  // check for auth:
  if (!senderId) {
    throw new HttpsError(
      "unauthenticated",
      "You must be logged in to send a friend request."
    );
  }

  // edge cases, if recipient doesn't exist or user is sending a friend req to themselves somehow
  if (!recipientId || senderId === recipientId) {
    throw new HttpsError("invalid-argument", "Invalid recipient ID.");
  }

  // Early check: has the recipient already blocked the sender?
  const recipientFriendDoc = await db
    .collection("users")
    .doc(recipientId)
    .collection("friends")
    .doc(senderId)
    .get();
  if (
    recipientFriendDoc.exists &&
    recipientFriendDoc.data()?.status === "blocked"
  ) {
    throw new HttpsError(
      "permission-denied",
      "You cannot send a friend request to this user."
    );
  }

  // Fetch profiles to get nickname/avatar for denormalization
  // running the fetches asynchronously for faster fetching
  const [senderDoc, recipientDoc] = await Promise.all([
    db.collection("users").doc(senderId).get(),
    db.collection("users").doc(recipientId).get(),
  ]);

  if (!senderDoc.exists || !recipientDoc.exists) {
    throw new HttpsError("not-found", "One of the users was not found.");
  }
  const senderData = senderDoc.data()!;
  const recipientData = recipientDoc.data()!;

  const batch = db.batch();

  // Create "pending_sent" doc in the sender's subcollection
  const senderRef = db
    .collection("users")
    .doc(senderId)
    .collection("friends")
    .doc(recipientId);
  batch.set(senderRef, {
    status: "pending_sent",
    nickname: recipientData.nickname,
    avatarIcon: recipientData.avatarIcon,
    createdAt: FieldValue.serverTimestamp(),
  });

  // Create "pending_received" doc in the recipient's subcollection
  const recipientRef = db
    .collection("users")
    .doc(recipientId)
    .collection("friends")
    .doc(senderId);
  batch.set(recipientRef, {
    status: "pending_received",
    nickname: senderData.nickname,
    avatarIcon: senderData.avatarIcon,
    createdAt: FieldValue.serverTimestamp(),
  });

  await batch.commit();
  return { success: true, message: "Friend request sent successfully." };
});

/**
 * Responds to a friend request (accept or decline).
 */
export const respondToFriendRequest = onCall(async (request) => {
  const recipientId = request.auth?.uid; // The person accepting/declining
  const { senderId, response } = request.data; // The person who sent the request

  if (!recipientId) {
    throw new HttpsError("unauthenticated", "You must be logged in.");
  }
  if (!senderId || !response) {
    throw new HttpsError("invalid-argument", "Missing senderId or response.");
  }

  const recipientRef = db
    .collection("users")
    .doc(recipientId)
    .collection("friends")
    .doc(senderId);
  const senderRef = db
    .collection("users")
    .doc(senderId)
    .collection("friends")
    .doc(recipientId);
  const batch = db.batch();

  if (response === "accept") {
    batch.update(recipientRef, { status: "accepted" });
    batch.update(senderRef, { status: "accepted" });
    await batch.commit();
    return { success: true, message: "Friend request accepted." };
  } else if (response === "decline") {
    batch.delete(recipientRef);
    batch.delete(senderRef);
    await batch.commit();
    return { success: true, message: "Friend request declined." };
  } else {
    throw new HttpsError(
      "invalid-argument",
      "Response must be 'accept' or 'decline'."
    );
  }
});
