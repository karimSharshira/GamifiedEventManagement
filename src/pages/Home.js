import React, { useEffect, useState } from "react";
import { getDocs,setDoc,getDoc, collection, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import {query, where } from "firebase/firestore";

function Home({ isAuth }) {
  const [postLists, setPostLists] = useState([]);
  const [postComments, setPostComments] = useState({});
  const postsCollectionRef = collection(db, "posts");
  async function findUserById(userId) {
    // Assuming you have a users collection in your database, and each user document has a unique userId field
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
  
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log(`No user found with id ${userId}`);
      return null;
    }
  }
  
  async function saveUser(user) {
    const userRef = doc(db, 'users', user.userId);
    await setDoc(userRef, user);
  }
  

  function setUserPosts(userId, posts) {
    // find the user with the given userId in your database or API
    const user = findUserById(userId);
  
    // set the posts for the user
    user.posts = posts;
  
    // save the updated user in your database or API
    saveUser(user);
  }
  const deletePost = async (id) => {
    try {
      // delete post from main collection
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
  
      // delete post from user's subcollection
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const userPostCollectionRef = collection(db, "User", uid, "post");
        const querySnapshot = await getDocs(
          query(userPostCollectionRef, where("postRef", "==", postDoc))
        );
        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0];
          const docRef = doc(db, "User", uid, "post", docSnapshot.id);
          await deleteDoc(docRef);
        }
      }
  
      // remove post from state
      setPostLists((prevPosts) =>
        prevPosts.filter((post) => post.id !== id)
      );
  
      // remove post from user's profile page state
      setUserPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  


  const handlePostVote = async (postId, change) => {
    const user = auth.currentUser;
    if (!user) {
      // User is not logged in, handle the error
      return;
    }
  
    const postRef = doc(db, "posts", postId);
    const post = postLists.find((post) => post.id === postId);
  
    // Check if the user has already voted on this post
    const voteRef = doc(db, "votes", `${user.uid}_${postId}`);
    const voteDoc = await getDoc(voteRef);
    if (voteDoc.exists()) {
      const voteData = voteDoc.data();
      if (voteData.vote === change) {
        // User has already voted with the same value, do nothing
        return;
      } else {
        // User has already voted, update the vote in the database
        await updateDoc(voteRef, { vote: change });
      }
    } else {
      // User has not voted yet, create a new vote in the database
      await setDoc(voteRef, { userId: user.uid, postId, vote: change });
    }
  
    // Update the post and the post list in the database
    await updateDoc(postRef, {
      upvotes: post.upvotes + change,
    });
  
    setPostLists((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, upvotes: post.upvotes + change } : post
      )
    );
  };



  const addComment = async (postId, commentData) => {
    const user = auth.currentUser;
    const newComment = {
      id: doc(collection(db, `posts/${postId}/comments`)).id,
      author: user.uid,
      name: user.displayName,
      text: commentData,
      createdAt: new Date(),
    };
    await addDoc(collection(db, `posts/${postId}/comments`), newComment);
    setPostComments((prevComments) => ({
      ...prevComments,
      [postId]: [...prevComments[postId], newComment],
    }));
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, upvotes: doc.data().upvotes || 0 })); // add upvotes property and set default value to 0
      const postComments = {};
      await Promise.all(
        posts.map(async (post) => {
          const commentsSnapshot = await getDocs(
            collection(db, `posts/${post.id}/comments`)
          );
          postComments[post.id] = commentsSnapshot.docs.map((doc) => ({
            ...doc.data(),
            name: doc.data().name,
          }));
        })
      );

      setPostLists(posts);
      setPostComments(postComments);
    };

    getPosts();
  }, []);

  return (

    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title" style={{ fontWeight: "bold" }}>
                <button
                  class="upvoteButton"
                  onClick={() => handlePostVote(post.id, 1)}
                >
                  <BiUpvote fontSize="large" />
                </button>
                <span>{post.upvotes}</span>
                <button
                  class="downvoteButton"
                  onClick={() => handlePostVote(post.id, -1)}
                >
                  <BiDownvote fontSize="large" />
                </button>
                <h3 style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
      <span style={{ color: '#333' }}>@{post.author.name}</span>
    </h3>
                {new Date(post.createdAt.seconds * 1000).toLocaleString()}
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button onClick={() => deletePost(post.id)}>
                    {" "}
                    <RiDeleteBinFill fontSize="large" />{" "}
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer" style={{ fontSize: "18px" }}>
              {" "}
              {post.postText}{" "}
            </div>

            <div>
              {postComments[post.id] &&
                postComments[post.id].map((comment) => (
                  <div key={comment.id}>
                    <p
                      style={{
                        fontWeight: "bold",
                        marginBottom: "5px",
                        color: "#e94e24",
                      }}
                    >
                      {comment.name}: {comment.text}
                    </p>
                    <h5
                      style={{
                        fontSize: "13px",
                        color: "#777",
                        marginTop: "5px",
                      }}
                    >
                      {new Date(comment.createdAt.seconds * 1000).toLocaleString()}
                    </h5>
                  </div>
                ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const commentData = e.target.comment.value;
                addComment(post.id, commentData);
                e.target.reset();
                
              }}
            >
              <input
              required
                type="text"
                name="comment"
                placeholder="Add a comment"
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginRight: "10px",
                  width: "70%",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
