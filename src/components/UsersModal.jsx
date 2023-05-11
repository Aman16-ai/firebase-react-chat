import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UserCard from './UserCard';
import myStyle from "./style/UsersModal.module.css"
import { getAllUsers } from '../service/chatService';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height:530,
    bgcolor: 'background.paper',
    borderRadius:2,
    boxShadow: 24,
    p: 0,
    overflowY:"scroll"
};

export default function UsersModal({ open, setOpen,allUsers,setChatUser,setCurrentRoom,currentUserChats,setCurrentUserChats }) {
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{marginLeft:"13px",marginTop:"10px",marginBottom:"10px",fontWeight:"bold"}} variant='h4'>
                        Explore
                    </Typography>
                    <div className={myStyle['user-grid']} style={{width:"100%",height:'100%'}}>
                    {
                        allUsers.map((user)=>{
                            return <UserCard user={user} setCurrentRoom={setCurrentRoom} setChatUser={setChatUser} currentUserChats={currentUserChats} setCurrentUserChats={setCurrentUserChats}/>
                        })
                    }
                    </div>
                </Box>
            </Modal>
        </div>
    );
}