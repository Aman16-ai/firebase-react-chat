import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function ChatCard({user,setCurrentRoom,setChatUser}) {
  console.log("Chat card------->",user)
  const handleClick = () => {
    setChatUser(user.user)
    setCurrentRoom(user.roomId)
  }
  return (
    <>
        <div onClick={handleClick} style={{width:"96%",margin:"10px",height:"13%",borderTop:"1px solid black",borderBottom:"1px solid black"}} className="chat-card-container">
            <Stack direction={'row'}>
                <img style={{width:"50px",marginTop:"5px",height:'50px',borderRadius:"50%"}} src={require("../static/usericon.png")}/>
                <Typography style={{marginTop:"15px",marginLeft:"5px"}} variant='h5'>
                    {user?.user?.firstname} {user?.user?.lastname}
                </Typography>
            </Stack>
        </div>
    </>
  )
}
