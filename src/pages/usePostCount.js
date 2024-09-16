import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase-config";

function usePostCount() {
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;
        const userPostsQuery = query(collection(db, "posts"), where("author.id", "==", uid));
        const userPostsSnapshot = await getDocs(userPostsQuery);
        const userPostCount = userPostsSnapshot.size;
        setPostCount(userPostCount);
      }
    });
    return unsubscribe;
  }, []);

  return postCount;
}

export default usePostCount;
