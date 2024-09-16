import { db } from "../firebase-config";

export const updateUserPoints = async (userId) => {
  const userPostsCollectionRef = db.collection("posts").where("author.id", "==", userId);
  const userPostsSnapshot = await userPostsCollectionRef.get();

  let points = 0;
  userPostsSnapshot.forEach((doc) => {
    points += 2;
  });

  const userPointsDocRef = db.collection("points").doc(userId);
  await userPointsDocRef.set({ points }, { merge: true });
};
