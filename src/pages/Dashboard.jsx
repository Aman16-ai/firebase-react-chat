import React, { useEffect, useState } from 'react'
import style from "./style/Dashboard.module.css"
import { Button, TextField, Typography } from '@mui/material'
import { auth } from '../firebase-config'
import UsersModal from '../components/UsersModal'
import { getAllUsers } from '../service/chatService'
import { db } from "../firebase-config"
import { addDoc, collection, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore"
import ChatCard from '../components/ChatCard'
import MessageCard from '../components/MessageCard'
export default function Dashboard() {
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState("")
  const [chatUser, setChatUser] = useState("")
  const [currentRoom, setCurrentRoom] = useState("")
  const [currentUserChats, setCurrentUserChats] = useState([])
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState({
    roomId: "",
    sent_by: "",
    message: "",
    datetime: "",
    timestamp: "",
  })

  const sendMessage = async () => {
    message['roomId'] = currentRoom
    message['sent_by'] = currentUser
    message['datetime'] = new Date()
    message['timestamp'] = Date.now()
    const docRef = await addDoc(collection(db, "messages"), message)
    console.log("message sended", docRef)
    setMessage({
      roomId: "",
      sent_by: "",
      message: "",
      datetime: "",
      timestamp: "",
    })
  }
  const handleLogoutBtn = async () => {
    await auth.signOut()
    window.location.href = "/"
  }

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"))
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    })
    let currentUserId = auth.currentUser.uid
    let result = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setUsers(result.filter(user => user.userId !== currentUserId))
    setCurrentUser(result.filter(user => user.userId === currentUserId)[0])
  }
  const getUser = async (id) => {
    const q = query(collection(db, "users"), where("userId", '==', id))
    const data = await getDocs(q)
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
  }
  const getCurrentUserChats = async () => {
    // const data = await getDocs(collection(db,"rooms"))
    // const rooms = data.docs.map((doc) => ({...doc.data(),id:doc.id}))
    // const chats = []
    // for(let room of rooms) {
    //   if(room.users.includes(currentUser.userId)) {
    //     const chatUserId = room.users[0] === currentUser.userId ? room.users[1]: room.users[0]
    //     const user = await getUser(chatUserId)
    //     chats.push({user:user,roomId:room.roomId})
    //   }
    // }
    // setCurrentUserChats(chats)
    const q = query(collection(db, "rooms"))
    const unsub = onSnapshot(q, async (data) => {
      const rooms = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const chats = []
      for (let room of rooms) {
        if (room.users.includes(currentUser.userId)) {
          const chatUserId = room.users[0] === currentUser.userId ? room.users[1] : room.users[0]
          const user = await getUser(chatUserId)
          chats.push({ user: user, roomId: room.roomId })
        }
      }
      setCurrentUserChats(chats)
    })
  }

  const getMessages = () => {
    const q = query(collection(db, 'messages'), where("roomId", "==", currentRoom))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("Message in realtime --->", doc.data())
      })
      setMessages(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).sort((a, b) => a.timestamp - b.timestamp))
    })

  }
  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    getCurrentUserChats()
  }, [currentUser])
  useEffect(() => {
    console.log("Chat user--------->", chatUser?.username)
    console.log("room user--------->", currentRoom)
    if (currentRoom !== "" && currentRoom !== " ") {
      getMessages()
    }

  }, [chatUser, currentRoom])

  return (
    <>
      <div className={style['container']}>
        <UsersModal open={open} setOpen={setOpen} allUsers={users} setChatUser={setChatUser} setCurrentRoom={setCurrentRoom} currentUserChats={currentUserChats} setCurrentUserChats={setCurrentUserChats} />

        <div className={style['left']}>

          <div className={style["chat-container"]}>

            <div className={style["current-user-nav"]}>

              <img src={require("../static/usericon.png")} alt="" />
              <Typography sx={{ color: "white", marginTop: "25px", marginLeft: "10px" }} variant='h5'>
                {`${currentUser?.firstname} ${currentUser?.lastname}`}
              </Typography>

            </div>

            {currentUserChats.map((chat) => {
              return <ChatCard setChatUser={setChatUser} setCurrentRoom={setCurrentRoom} user={chat} />
            })}

          </div>
          <div className={style['button-container']}>
            <Button onClick={() => setOpen(prev => !prev)} variant='contained' style={{ marginBottom: "2px", backgroundColor: "white", color: "#006d77", border: "2px solid #006d77", fontWeight: "bolder", fontSize: '1.2rem' }} className={style['btns']}>+ Chat</Button>
            <Button onClick={handleLogoutBtn} variant='contained' style={{ marginTop: "15px", backgroundColor: "#006d77", fontWeight: "bolder", fontSize: "1.2rem" }} className={style['btns']}>Logout</Button>
          </div>
        </div>
        <div className={style['right']}>
          {chatUser !== "" ? <div className={style["chat-user-nav"]}>
            <img src={require("../static/usericon.png")} alt="" />
            <Typography sx={{ color: "black", marginTop: "25px", marginLeft: "10px" }} variant='h5'>
              {chatUser.firstname} {chatUser.lastname}
            </Typography>
          </div> : null}
          <div className={style["message-container"]}>
            {messages.map((message) => {
              return (
                <>

                  <MessageCard isReceiver={currentUser.userId !== message.sent_by.userId} sender={message.sent_by.userId === currentUser.userId ? "You" : `${message.sent_by.firstname} ${message.sent_by.lastname}`} message={message.message} />
                </>
              )
            })}
          </div>
          <div className={style["send-message-container"]}>
            <input onChange={(e) => setMessage({ ...message, message: e.target.value })} value={message.message} type="text" />
            <Button onClick={sendMessage} variant='contained' style={{ marginLeft: "20px", marginRight: "70px", width: "150px", height: "60px", backgroundColor: "#006d77" }}>Send</Button>
          </div>
        </div>
      </div>
    </>
  )
}
