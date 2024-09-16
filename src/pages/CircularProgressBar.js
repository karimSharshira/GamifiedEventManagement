import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import level1 from "../Assets/level1.png";
import level2 from "../Assets/level2.png";
import level3 from "../Assets/level3.png";
import level4 from "../Assets/level4.png";
import level5 from "../Assets/level5.png";


  const db = firebase.firestore();
  const auth = getAuth();

  const CircularProgressBar = () => {
    const [points, setPoints] = useState(5);

    useEffect(() => {
      // Set up listener for user's points in Firebase
      const unsubscribe = db
        .collection("users")
        .doc("userID") // replace "userID" with the actual user ID
        .onSnapshot((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setPoints(userData.points || 1);
          }
        });

      // Clean up listener on unmount
      return unsubscribe;
    }, []);

    useEffect(() => {
      // Update user's points in Firebase when points change
      db.collection("users")
        .doc("userID") // replace "userID" with the actual user ID
        .update({
          points: points,
        })
        .catch((error) => {
          console.error("Error updating points: ", error);
        });
    }, [points]);

    useEffect(() => {
      // Set up listener for user's posts in Firebase
      const unsubscribe = db
        .collection("User")
        .doc(auth.currentUser.uid)
        .collection("post")
        .onSnapshot((querySnapshot) => {
          const postCount = querySnapshot.size;
          const newPoints = points + postCount;
          if (newPoints <= 100) {
            setPoints(newPoints);
          }
        });
  
      // Clean up listener on unmount
      return unsubscribe;
    }, []);
  
    const getStrokeColor = (progress) => {
      if (progress < 20) {
        return "#f44336"; // red
      } else if (progress < 40) {
        return "#ff9800"; // orange
      } else if (progress < 60) {
        return "#ffc107"; // yellow
      } else if (progress < 80) {
        return "#2196f3"; // blue
      } else {
        return "#8bc34a"; // green
      }
    };
  
    const strokeColor = getStrokeColor((points / 100) * 100);

    return (
      <div style={{ width: "200px", margin: "0 auto", textAlign: "center" }}>
        <svg viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)", marginBottom: "10px" }}>
          <circle cx="50" cy="50" r="45" fill="none" stroke="#f2f2f2" strokeWidth="5" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="5"
            strokeDasharray="283"
            strokeDashoffset={(283 * (100 - points)) / 100}
            strokeLinecap="round"
            stroke={strokeColor}
            transform="rotate(-90,50,50)"
          />
        </svg>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ marginRight: "10px", fontSize: "25px", fontWeight: "bold" }}>
            <span>{points}</span>
          </div>
          <div>
            <span style={{ fontSize: "15px", textTransform: "uppercase", color: "#888" }}>points</span>
          </div>
        </div>
        <div>
          <div style={{ width: "200px", margin: "0 auto", textAlign: "center" }}>
            {/* Circular progress bar code here */}
          </div>
    
          <div className="container-fluid">
            <h1 style={{ textAlign: 'center', marginBottom: '30px', marginTop: '20px' }}>Badges</h1>
            {points >=0 &&(
              <Card style={{ width: '18rem', margin: 'auto' }}>
                <Card.Img variant="top" src={level1} alt="level1" />
                <Card.Body>
                  <Card.Title>starter</Card.Title>
                  <Card.Text>Welcome to out community</Card.Text>
                  <div style={{ width: '200px', margin: '0 auto', textAlign: 'center' }}>
                    {/* Points component */}
                  </div>
                </Card.Body>
              </Card>
            )}
            {points >= 20 &&(
              <Card style={{ width: '18rem', margin: 'auto' }}>
                <Card.Img variant="top" src={level2} alt="Badge 1" />
                <Card.Body>
                  <Card.Title>Knight</Card.Title>
                  <Card.Text>Congratulations! You have earned the Knight Badge. You are now a valiant knight in our community!</Card.Text>
                  <div style={{ width: '200px', margin: '0 auto', textAlign: 'center' }}>
                    {/* Points component */}
                  </div>
                </Card.Body>
              </Card>
            )}
            {points >= 40 && (
              <Card style={{ width: '18rem', margin: 'auto' }}>
                <Card.Img variant="top" src={level3} alt="Badge 3" />
                <Card.Body>
                  <Card.Title>Earl</Card.Title>
                  <Card.Text>Fantastic job! You've reached the Earl Badge, showcasing your expertise and dedication.</Card.Text>
                  <div style={{ width: '200px', margin: '0 auto', textAlign: 'center' }}>
                  </div>
                </Card.Body>
              </Card>
            )}
            {points >= 60 && (
              <Card style={{ width: '18rem', margin: 'auto' }}>
                <Card.Img variant="top" src={level4} alt="Badge 4" />
                <Card.Body>
                  <Card.Title>Duke</Card.Title>
                  <Card.Text>Amazing work! You've earned the Duke Badge, demonstrating exceptional skills and leadership.</Card.Text>
                  <div style={{ width: '200px', margin: '0 auto', textAlign: 'center' }}>
                    {/* Points component */}
                  </div>
                </Card.Body>
              </Card>
            )}
            {points >= 80 &&(
              <Card style={{ width: '18rem', margin: 'auto' }}>
                <Card.Img variant="top" src={level5} alt="Badge 5" />
                <Card.Body>
                  <Card.Title>King</Card.Title>
                  <Card.Text>You are at the top of the game, King</Card.Text>
                  <div style={{ width: '200px', margin: '0 auto', textAlign: 'center' }}>
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
    
        <button
      style={{
        width: '100%',
        textAlign: 'center',
        marginTop: '20px',
        display: 'inline-block',
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
        textDecoration: 'none',
        fontWeight: 'bold',
      }}
    >
      <Link to="/ProfilePage" style={{ color: 'white', textDecoration: 'none' }}>
        Head to your ProfilePage
      </Link>
    </button>
      </div>
    );
    
  }
  
  export default CircularProgressBar; 