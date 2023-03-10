import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage,  } from "firebase/storage";
import {getFirestore } from "firebase/firestore";


const firebaseConfig = {
//  YOUR FIRE BASE CONFIG
};
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app)
  export const storage = getStorage(app);
  export const db = getFirestore (app)