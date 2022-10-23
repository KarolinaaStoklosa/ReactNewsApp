import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnspzJkIYKdliQkKWdgwNDYxPQzgys1X4",
  authDomain: "sdanews-c6c59.firebaseapp.com",
  projectId: "sdanews-c6c59",
  storageBucket: "sdanews-c6c59.appspot.com",
  messagingSenderId: "242125340330",
  appId: "1:242125340330:web:94acfeff595d6d17529ad3",
  measurementId: "G-L5CTQBKQP2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
