import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, runTransaction } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import CircularProgressBar from "./CircularProgressBar";
import firebase from "firebase/compat/app";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postDate, setDate] = useState("");
  const [postText, setPostText] = useState("");
  const [uid, setUid] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);
  let navigate = useNavigate();
 
  const postsCollectionRef = collection(db, "posts");

  const createPost = async () => {
    // Get the user's ID from the currently authenticated user.
    const uid = auth.currentUser.uid;
    if (title.trim() === '' || postText.trim() === '') {
      toast.error("Post Title and post text are required", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
     });
      return;
    }
    // Get a reference to the user's post collection and the post count document.
    const userPostCollectionRef = collection(db, "User", uid, "post");
    const postCountDocRef = doc(userPostCollectionRef, "post_count");
  
    // Increment the post counter and retrieve the updated value.
    const { counter } = await runTransaction(db, async (transaction) => {
      const postCountDoc = await transaction.get(postCountDocRef);
      const currentCounter = postCountDoc.exists() ? postCountDoc.data().counter : 0;
      const updatedCounter = currentCounter + 1;
      transaction.set(postCountDocRef, { counter: updatedCounter });
      return { counter: updatedCounter };
    });
  
    // Create a new post document in the posts collection.
    const postDocRef = await addDoc(postsCollectionRef, {
      title,
      postText,
      postDate,
      createdAt: new Date(),
      author: { name: auth.currentUser.displayName, id: uid },
    });
  
    // Add a new post document to the user's post collection.
    await addDoc(userPostCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: uid },
      postRef: postDocRef,
      postNumber: counter,
    });
  
    // Navigate to the home page.
    navigate("/Home");
  };
  

  const updateProgressBar = async () => {
    const userDocRef = db.collection("users").doc(auth.currentUser.uid);
    await userDocRef.update({
      points: firebase.firestore.FieldValue.increment(2),
    });
    const userPostDocRef = userDocRef.collection("posts").doc("points");
    await userPostDocRef.set(
      { points: firebase.firestore.FieldValue.increment(2) },
      { merge: true }
    );
    setShowProgressBar(true);
    setTimeout(() => {
      setShowProgressBar(false);
    }, 2000);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        setUid(uid);
      } else {
        navigate("/login");
      }
    });
    return unsubscribe;
  }, [navigate]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div>
    <ToastContainer />
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            required
          />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              
              setPostText(event.target.value);
            }}
            required
          />
        </div>
        <button onClick={createPost}>Submit Post</button>
        {showProgressBar && <CircularProgressBar />}
      </div>
    </div>
    </div>
  );
  
}

export default CreatePost;
