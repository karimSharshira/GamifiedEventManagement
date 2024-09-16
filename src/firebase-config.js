import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { deleteDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { createChatBotMessage } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css'
import Espace from './pages/Espace';
import Lean from './pages/lean';
const botName = 'EventsBot';
const config = {
  
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },state: {
    gist: "",
    infoBox: "",
  },
  widgets: [
    {
      widgetName: 'lean',
      widgetFunc: (props) => <Lean {...props} />,
    },
    {
      widgetName: 'Espace',
      widgetFunc: (props) => <Espace {...props} />,
    },
  ],
  customComponents: {
    // Replaces the default header
   header: () => <div style={{ backgroundColor: 'grey', padding: "5px", borderRadius: "3px" }}>Conversation with chatBot</div>,
   
 }
};
export default config;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXLAIvoFUPTGmBMPblSLH_RTxE0o54fgY",
  authDomain: "grad23-53fa2.firebaseapp.com",
  projectId: "grad23-53fa2",
  storageBucket: "grad23-53fa2.appspot.com",
  messagingSenderId: "941023689497",
  appId: "1:941023689497:web:4df95701e84279b3c22388",
  measurementId: "G-RF62Z267RK"
};
const app = firebase.initializeApp(firebaseConfig);
// Export the Firestore database, Authentication, and Storage objects
export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const timestamp = serverTimestamp();
export const storage = getStorage(app);


const analytics = getAnalytics(app);

export const deletePost = async (postRef) => {
  try {
    await deleteDoc(postRef);
    console.log("Post deleted successfully");
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};




