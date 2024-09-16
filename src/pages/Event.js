import React, { useEffect, useState } from "react";
import { getDocs,setDoc,getDoc, collection, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
function Home({ isAuth }) {
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
      }, []);
    
      const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
      }, []);


  const [postLists, setPostLists] = useState([]);
  const [postComments, setPostComments] = useState({});
  const postsCollectionRef = collection(db, "myEvents");
  const deletePost = async (id) => {
    const postDoc = doc(db, "myEvents", id);
    await deleteDoc(postDoc);
    setPostLists((prevPosts) =>
      prevPosts.filter((post) => post.id !== id)
    );
  };

  const handlePostVote = async (postId, change) => {
    const user = auth.currentUser;
    if (!user) {
      // User is not logged in, handle the error
      return;
    }
  
    const postRef = doc(db, "myEvents", postId);
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



  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, upvotes: doc.data().upvotes || 0 })); // add upvotes property and set default value to 0
      const postComments = {};
      await Promise.all(
        posts.map(async (post) => {
          const commentsSnapshot = await getDocs(
            collection(db, `myEvents/${post.id}/comments`)
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
    <div>
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
      <span style={{ color: '#333' }}>By:{post.author.name}</span>
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
            <h4>Event Date: {post.postDate}</h4> 
            <h4 style={{color: "#9a3636"}}>Location: {post.postVenue} </h4>
            <div className="postTextContainer" style={{backgroundColor:"#E5E8E8",fontSize: "18px", padding: "10px", borderRadius: "5px", boxShadow: "0px 3px 5px rgba(0,0,0,0.2)", color: "#582626", lineHeight: "1.5"}}>{post.postText}</div>

            
            
             
              
              
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default Home;