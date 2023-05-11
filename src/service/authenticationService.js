import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase-config";
import { collection,addDoc } from "firebase/firestore";
export const registerUser = async(credentials) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth,credentials.email,credentials.password)
        const userId = userCredentials.user.uid
        credentials['userId'] = userId
        const docRef = await addDoc(collection(db,"users"),credentials)
        console.log("User register with doc id :",docRef.id)
    }
    catch(err) {
        console.log(err.message)
    }
} 

export const loginUser = async({email,password}) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth,email,password)
        console.log("logged in user",userCredentials.user)
    }
    catch(err) {
        console.log(err.message)
    }
}