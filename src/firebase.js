import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBVwCNC0woHs7dx7VB2FKeAdSR5u-h48TQ",
  authDomain: "stock-mate-dsn.firebaseapp.com",
  projectId: "stock-mate-dsn",
  storageBucket: "stock-mate-dsn.appspot.com",
  messagingSenderId: "36171221232",
  appId: "1:36171221232:web:917e84bdc8c848cd7bda35",
  measurementId: "G-VK0QGN0FZW"
};

// hello world
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default app;
export {auth, provider, db}