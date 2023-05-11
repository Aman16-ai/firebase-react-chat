import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCrfglivDEJzNrpjft-HgogBUShtKdfEjY",
    authDomain: "chat-firebase-react-e5faa.firebaseapp.com",
    projectId: "chat-firebase-react-e5faa",
    storageBucket: "chat-firebase-react-e5faa.appspot.com",
    messagingSenderId: "497163145107",
    appId: "1:497163145107:web:49fa9b8a53a2d362686266",
    measurementId: "G-4BPKRD3ELQ"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)