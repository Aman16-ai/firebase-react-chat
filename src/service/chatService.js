import { auth, db } from "../firebase-config"
import { addDoc, collection, getDocs } from "firebase/firestore"
import {v4} from "uuid"
export const getAllUsers = async () => {
    const users = []
    try {
        const querySnapshot = await getDocs(collection(db, "users"))
        return querySnapshot.docs.map((doc)=>({...doc.data(), id : doc.id}))
    }
    catch (err) {
        console.log(err.message)
        return users
    }
}

export const createRoom = async (currentUserId,chatUserId) => {
    try {
        const date = new Date()
        const roomId = v4()
        const room = {
            users : [currentUserId,chatUserId],
            roomId : roomId,
            datetime : date
        }
        const docRef = await addDoc(collection(db,"rooms"),room)
        console.log("Create room doc ref---->",docRef)
        return roomId
    }   
    catch(err) {
        console.log(err.message)
    }
}
