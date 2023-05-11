import React, { useEffect } from 'react'
import style from "./style/UserCard.module.css"
import { Button } from '@mui/material'
import { createRoom } from '../service/chatService'
import { auth } from '../firebase-config'
export default function UserCard({user,setChatUser,setCurrentRoom,currentUserChats,setCurrentUserChats}) {
    const imageSrc = require("../static/usericon.png")
    console.log(user)
    const handleChatButton = async() => {
      const roomId = await createRoom(auth.currentUser.uid,user.userId)
      setCurrentUserChats([...currentUserChats,{user:user,roomId:roomId}])
      setChatUser(user)
      setCurrentRoom(roomId)
    }

  return (
    <>
     <div className={style["user-card"]}>
      <img src={imageSrc} alt={user.firstname} />
      <h2>{user.firstname + " " + user.lastname}</h2>
      <Button onClick={handleChatButton} variant='contained' style={{width:"100px",backgroundColor: "#006d77",marginTop:"10px"}}>Chat</Button>
    </div>
    </>
  )
}
