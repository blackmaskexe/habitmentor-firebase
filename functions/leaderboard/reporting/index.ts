import { onCall, HttpsError } from "firebase-functions/https";
import { db, auth } from "../../firebaseAdmin";

export const reportUser = onCall(async (request) => {
  try {
    const userId = request.auth?.uid; // reporter's id
    const { reportedId } = request.data; // reported person's id

    if (!userId) {
      throw new HttpsError(
        "unauthenticated",
        "You must be logged in to report a user"
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
