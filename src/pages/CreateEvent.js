import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CreateEvent({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postDate, setPostDate] = useState("");
  const [postVenue, setPostVenue] = useState("");

  const eventCollectionRef = collection(db, "myEvents");
  let navigate = useNavigate();

  const createPost = async () => {
    if (title.trim() === "" || postText.trim() === "" || postDate.trim() === "" || postVenue.trim() === "") {
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
     });
      return;
    }

    await addDoc(eventCollectionRef, {
      title,
      postText,
      postDate,
      postVenue,
      createdAt: new Date(),
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/Event");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
    <ToastContainer />
    <div className="containerE">
      <div className="form-containerE">
        <h1>Add a new Event</h1>
        <label>Title:</label>
        <input
          className="input-field"
          placeholder="Title..."
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          required
        />

        <label>Event Description:</label>
        <textarea
          className="input-field"
          placeholder="event..."
          value={postText}
          onChange={(event) => {
            setPostText(event.target.value);
          }}
          required
        />

        <label>Event Date:</label>
        <input
          className="input-field"
          placeholder="eg: April 1st 2024..."
          value={postDate}
          onChange={(event) => {
            setPostDate(event.target.value);
          }}
          required
        />

        <label>Event venue:</label>
        <input
          className="input-field"
          placeholder="eg: El Farsi Hall..."
          value={postVenue}
          onChange={(event) => {
            setPostVenue(event.target.value);
          }}
          required
        />

        <button className="submitE-btn" onClick={createPost}>
          Create Event
        </button>
      </div>
    </div>
    </div>
  );
}

export default CreateEvent;
