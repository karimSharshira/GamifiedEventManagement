import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import React, {useState } from "react";
import {Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const RECAPTCHA_SITE_KEY = "6LfRrwYnAAAAAJbmgcV8O6_ALP9WElaaLsnWJn_V";

  const signUp = (e) => {
    e.preventDefault();
    if (recaptchaToken === "") {
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      
        toast.success('Thanks for signing up!', {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
       });
       
      })
      .catch((error) => {
        console.log(error);
        toast.error("This email is already signed up, please change email or login instead!", {
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
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };
  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ToastContainer />
    
      <form style={{ border: '1px solid #dbdbdb', backgroundColor: '#fafafa', width: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }} onSubmit={signUp}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '20px' }}>Events.</h1>
        <p style={{ marginTop: '10px', fontSize: '0.9rem' }}> Sign up to Events</p>
        <Link to="/login">
  <button style={{ backgroundColor: '#4285f4', color: 'white', margin: '10px 0', padding: '10px', border: 'none', borderRadius: '5px', fontSize: '1rem', cursor: 'pointer' }}>Already Registered?</button>
        </Link>
        <p style={{ fontSize: '0.9rem' }}>OR</p>
        <label style={{ fontSize: '0.9rem', marginTop: '10px' }}>Email:</label>
        <input style={{ border: '1px solid #dbdbdb', padding: '10px', marginTop: '5px', width: '100%' }} type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" ></input>
        <label style={{ fontSize: '0.9rem', marginTop: '10px' }}>Password:</label>
        <input style={{ border: '1px solid #dbdbdb', padding: '10px', marginTop: '5px', width: '100%' }}  type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required ></input>
        <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={handleRecaptchaChange} />
        <button style={{ backgroundColor: '#0095f6', color: 'white', marginTop: '20px', padding: '10px', border: 'none', borderRadius: '5px', fontSize: '1rem', cursor: 'pointer' }} type="submit">Sign Up</button>
        <p style={{ fontSize: '0.9rem', marginTop: '20px' }}>By signing up, you agree to our Terms Privacy Policy and Cookies Policy</p>
      </form>
    </div>
    
    
  );
};
export default SignUp;

