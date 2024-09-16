import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Event from "./pages/Event";
import CreateEvent from "./pages/CreateEvent";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import { useState } from "react";
import { signOut } from "firebase/auth";
import CircularProgressBar from "./pages/CircularProgressBar";
import   { auth } from "./firebase-config";
import Signup from './pages/Signup';
import Homepage from "./pages/Homepage";
import Form from "./pages/Form";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import ProfilePage from "./pages/ProfilePage";
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from "./firebase-config";
import MessageParser from "./pages/MessageParser";
import ActionProvider from "./pages/ActionProvider";
import { ConditionallyRender } from "react-util-kit";
import { ReactComponent as ButtonIcon } from "./Assets/robot.svg"
function App() {
  
  const [showChatbot, toggleChatbot] = useState(true);
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);



  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  const [posts, setPosts] = useState([
    { id: 1, title: 'Post 1', postText: 'This is the first post' },
    { id: 2, title: 'Post 2', postText: 'This is the second post' },
    { id: 3, title: 'Post 3', postText: 'This is the third post' },
  ]);

  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    
    <Router>
      <div>
      <div className="particles-wrapper">
      <Particles
        className="w-full h-screen"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: true,
          background: {
             color: {
               value: "",
             },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",

                distance: 400,
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 150,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#FFA500",
            },
            links: {
              color: "#FFA500",
              distance: 120,
              enable: true,
              opacity: 0.8,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1200,
              },
              value: 80,
            },
            opacity: {
              value: 0.8,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        
      />
    </div>
      </div>
      <div>
        <nav>
        {!isAuth ? (
    <>
      <Link to="/Homepage">Home</Link>   
      <Link to="/login">Login</Link>
      <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown__button">
        Signup <i className={isOpen ? 'fas fa-caret-up' : 'fas fa-caret-down'}></i>
      </button>
      {isOpen && (
        <div className="dropdown__menu">
          <Link to="/signup" className="dropdown__link">
            Attendees/Volunteers
          </Link>
          <Link to="/Form" className="dropdown__link">
            Form
          </Link>
        </div>
      )}
    </div>
    </>
  ) : (
    <>
      <Link to="/Homepage">Home</Link>   
      <Link to="/Home">Blogs</Link>
      <Link to="/Event">Events</Link>
      <Link to="/Gallery">Gallery</Link>
      <Link to="/createpost">Create Post</Link>
      <Link to="/ProfilePage">Profile</Link>
      {auth.currentUser && auth.currentUser.email === "mahmoudlotfy3799@gmail.com" && (
        <Link to="/createEvent">Add Event</Link>
      )}
              <button
                onClick={signUserOut}
                style={{
                  backgroundColor: "#82070f",
                  borderRadius: "5px",
                  border: "none",
                  color: "white",
                  padding: "7px 16px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: "16px",
                  margin: "4px 2px",
                  cursor: "pointer",
                }}
              >
                Log Out
              </button>
            </>
          )}
        </nav>
        <div>
          <Routes>
            <Route path="/Event" element={<Event isAuth={isAuth} />} />
            <Route path="/createEvent" element={<CreateEvent isAuth={isAuth} />} />
            <Route path="/Home" element={<Home isAuth={isAuth} />} />
            <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
            <Route path="/Gallery" element={<Gallery isAuth={isAuth} />} />
            <Route path="/Homepage" element={<Homepage setIsAuth={setIsAuth} />} />
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            <Route path="/Signup" element={<Signup setIsAuth={setIsAuth} />} />
            <Route path="/ProfilePage" element={<ProfilePage setIsAuth={setIsAuth} />} />
            <Route path="/Form" element={<Form setIsAuth={setIsAuth} />} />
            <Route path="/CircularProgressBar" element={<CircularProgressBar isAuth={isAuth} />} />

          </Routes>
        </div>
      </div>
      <div className="app-chatbot-container">
          <ConditionallyRender
            ifTrue={showChatbot}
            show={
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            }
          />
          <button
          className="app-chatbot-button"
          onClick={() => toggleChatbot((prev) => !prev)}
        >
          <ButtonIcon className="app-chatbot-button-icon" />
        </button>
        </div>
    </Router>
    
  );
}

export default App;
