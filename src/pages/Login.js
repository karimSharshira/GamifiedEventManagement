import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useCallback, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcApproval } from "react-icons/fc";
const Login = ({ setIsAuth }) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        toast.success(<>
          Welcome Back <FcApproval fontSize="large" />!
        </>, {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
       });
       
        
      setTimeout(() => {
        navigate("/Homepage");
      }, 5000); // Wait for 5 seconds before navigating to homepage
        
      })
      
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        toast.success(<>
          Welcome Back <FcApproval fontSize="large" />!
        </>, {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
       });
       
        
      setTimeout(() => {
        navigate("/Homepage");
      }, 5000); // Wait for 5 seconds before navigating to homepage
        
      })
      .catch((error) => {
        console.log(error);
        toast.error("Please enter valid credentials", {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
       });
      });
  };
 
  return (
    <div>
      <ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ border: '1px solid #dbdbdb', backgroundColor: '#fafafa', width: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }} >
          <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '20px' }}>Events.</h1>
          <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
          <p style={{ fontSize: '0.9rem' }}>OR</p>
        </div>
        <form style={{ border: '1px solid #dbdbdb', backgroundColor: '#fafafa', width: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }} onSubmit={signIn} >
          <label style={{ fontSize: '0.9rem', marginTop: '10px' }}>Email:</label>
          <input
            style={{ border: '1px solid #dbdbdb', padding: '10px', marginTop: '5px', width: '100%' }}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <label style={{ fontSize: '0.9rem', marginTop: '10px' }}>Password:</label>
          <input
            style={{ border: '1px solid #dbdbdb', padding: '10px', marginTop: '5px', width: '100%' }}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            style={{ backgroundColor: '#0095f6', color: 'white', marginTop: '20px', padding: '10px', border: 'none', borderRadius: '5px', fontSize: '1rem', cursor: 'pointer' }}
          >
            Log In
          </button>
          <p style={{ fontSize: '0.9rem', marginTop: '20px' }}>By logging in, you agree to our Terms Privacy Policy and Cookies Policy</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
