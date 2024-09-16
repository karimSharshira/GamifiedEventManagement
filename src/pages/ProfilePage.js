
import React, { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './ProfilePage.css';
import CircularProgressBar from "./CircularProgressBar";
import { Link,   } from 'react-router-dom';



// import ParentComponent from './ParentComponent';
// import { query, where } from "firebase/firestore";
// import { RiDeleteBinFill } from 'react-icons/ri';
import { ref, uploadBytes } from 'firebase/storage';
import  {getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
// import usePostCount from "./usePostCount";
// import { CircularProgress } from './CircularProgressBar';

// import firebase from "firebase/compat/app";
import "firebase/firestore";
// import aboutImage from '../Assets/about.png';
// import aboutBadge from "../Assets/about.png";
// import Card from 'react-bootstrap/Card';



function ProfilePage() {
  // const [points, setPoints] = useState(0);
  // const strokeColor = 'blue'; 

  // const [postCount, setPostCount] = useState(0);
  const [userPosts, setUserPosts] = useState([]);
  // const [postLists, setPostLists] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const isAuth = getAuth();
  const [fileInput, setFileInput] = useState(null);

  const handleUpdateProfilePic = async (event, uid) => {
    console.log("handleUpdateProfilePic called");
  
    // Get the file that the user uploaded
    const file = event.target.files[0];
  
    try {
      // Upload the file to Firebase Storage
      const storageRef = ref(storage, `users/${uid}/profile-pic`);
      await uploadBytes(storageRef, file);
  
      // Get the download URL for the uploaded file
      const downloadURL = await getDownloadURL(storageRef);
  
      // Update the user's profile picture
      await updateProfile(auth.currentUser, { photoURL: downloadURL });
  
      // Reload the page to show the updated profile picture
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  

  // const fetchUserPosts = async (uid) => {
  //   try {
  //     const dbs = collection(db, "User", uid, "post");
  //     const storageData = await getDocs(dbs);
  //     setUserPosts(
  //       storageData.docs.map((e) => ({ ...e.data(), id: e.id }))
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // const handleDeletePost = async (postId) => {
  //   const postRef = doc(db, "posts", postId);
  //   await deleteDoc(postRef);
  // };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const authObserver = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserInfo({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });

        const unsubscribe = onSnapshot(collection(db, "User", uid, "post"), (snapshot) => {
          setUserPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });

        return unsubscribe;
      } else {
        setUserInfo(null);
        navigate("/login");
      }
    });

    return () => {
      authObserver();
    };
  }, [auth, navigate]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  // const handleFileInputChange = (event) => {
  //   setFileInput(event.target.files[0]);
  // };

  const handleProfilePictureUpload = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`${userInfo.uid}/profile-picture/${fileInput.name}`);
      await fileRef.put(fileInput);
      const fileUrl = await fileRef.getDownloadURL();
      const userRef = doc(db, "User", userInfo.uid);
      await updateDoc(userRef, { photoURL: fileUrl });
      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, photoURL: fileUrl }));
      setFileInput(null);
    } catch (error) {
      console.log(error);
    }
  };
  // const numPosts = userPosts.length;



  return (
    <div style={{ backgroundColor: '#a2d5c6', padding: '30px', margin: ' auto', maxWidth: '600px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>My Profile</h1>
      {userInfo && (
        <section className="basic-info" style={{ backgroundColor: '#E8F0FE', padding: '10px', borderTop: '2px solid black' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={userInfo.photoURL} alt="Profile" style={{ width: '140px', borderRadius: '100%' }} />
            <label htmlFor="profile-pic" style={{
              display: 'inline-block',
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              textAlign: 'center',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>
              Update Profile Picture
            </label>
            <input type="file" id="profile-pic" accept="image/*" onChange={(event) => handleUpdateProfilePic(event, auth.currentUser.uid)} style={{ display: 'none' }} />
          </div>
  
          <h2 style={{ textAlign: 'center', marginTop: '10px' }}>User Name: {userInfo.displayName}</h2>
          <p><b>Mail: </b>{userInfo.email}</p>
        </section>
      )}
  
      <h2 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>My Posts</h2>
      <section className="my-posts">
        {userPosts.map((post) => (
          <div key={post.id} className="post-container" style={{ backgroundColor: '#E8F0FE', padding: '10px', borderTop: '2px solid black' }}>
            <div className="post">
              <h3>{post.title}</h3>
              <p>{post.postText}</p>
            </div>
          </div>
        ))}
      </section>
  
      <button
        style={{
          width: '100%',
          textAlign: 'center',
          marginTop: '20px',
          display: 'inline-block',
          backgroundColor: '#0000FF',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          border: 'none',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        <Link to="/CircularProgressBar" style={{ color: 'white', textDecoration: 'none' }}>
          Head to your points and badges
        </Link>
      </button>
  
     
    </div>
  );
  
        }
      export default ProfilePage;