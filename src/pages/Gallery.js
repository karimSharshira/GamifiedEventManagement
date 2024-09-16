import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage, db } from "../firebase-config";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [captionInput, setCaptionInput] = useState('');

  const imagesListRef = ref(storage, "images/");

  const uploadFile = async () => {
    if (imageUpload === null) return;

    if (!captionInput) {
      alert('Please add a caption');
      return;
    }

    const imageName = `${imageUpload.name + uuidv4()}`
    const imageRef = ref(
      storage,
      `images/${imageName}`
    );
    uploadBytes(imageRef, imageUpload)
      .then(async (snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(async (url) => {
            const obj = { url, caption: captionInput };
            setImageUrls((prev) => [...prev, obj]);

            // STORE IMAGE URL AND CAPTION IN FIRESTORE DOCUMENT
            try {
              const docRef = await addDoc(collection(db, "images"), obj);
              console.log("Document written with ID: ", docRef.id);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setImageUpload(null); // Reset imageUpload state
        setCaptionInput('');
      }); 
  };

  useEffect(() => {
    listAll(imagesListRef)
      .then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item)
            .then(async (url) => {
              const docRef = collection(db, "images");
              const querySnapshot = await getDocs(query(docRef, where("url", "==", url)));
              const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              const obj = { url, caption: data[0].caption }; // RETRIEVE CAPTION FROM FIRESTORE
              setImageUrls((prev) => [...prev, obj]); // STORE THE OBJECT IN STATE ARRAY
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 30%))",
    gap: "10px",
  };
  const imgStyle = {
    objectFit: "cover",
    width: "95%",
    height: "450px", // Add a fixed height for all images
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    transition: "transform 0.2s ease-in-out",
  };
  const buttonStyle = {
    backgroundColor: "#127a826b",
    color: "#000000",
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    margin: "10px 0",
    

  };

  


  const openModal = (url) => {
    setSelectedImage(url);
    setModalIsOpen(true);
  };
  

  return (
    <div>
    <div className="App">
      <div className="header">
        <header>
          <h2>Gallery</h2>
        </header>
      </div>
      <div className="center-container">
        <label htmlFor="fileInput" className="fileInputContainer">
          <input
            type="file"
            id="fileInput"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
            style={{ display: "none" }} // hide the default file input
          />
          <div className="customButton">+</div> {/* add your custom button */}
        </label>

        {/* ADD DIV TO DISPLAY CAPTION INPUT */}
        {imageUpload && (
          <div>
            <input
              type="text"
              aria-label="Add caption"
              onChange={(e) => setCaptionInput(e.target.value)}
              placeholder="Add a Caption"
              value={captionInput}
            />
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button style={buttonStyle} onClick={uploadFile}>
          {" "}
          Upload Image
        </button>
      </div>

      <div style={gridStyles}>
        {imageUrls.map((obj, i) => {
          const { url, caption } = obj; // DESTRUCTURE URL AND CAPTION FROM OBJECT
          return (
            <div key={i}>
              <img
                src={url}
                style={imgStyle} // use the imgStyle object
                onClick={() => openModal(url)}
              />

              {/* DISPLAY THE CAPTION */}
              <div class="caption">{caption}</div>

            </div>
          );
        })}
      </div>
      {modalIsOpen && (
        <div
          className={`modal-container ${modalIsOpen ? "open" : ""}`}
          onClick={() => setModalIsOpen(false)}
        >
          <img src={selectedImage} className="modal-image" />
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
