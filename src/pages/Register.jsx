import React from 'react'
import { TextField, Button, Typography,ButtonBase} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../firebase-config';
import { registerUser } from '../service/authenticationService';
export default function Register() {
    const [credentials,setCredentials] = useState({
        email : "",
        password : "",
    })
    const handleOnChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        // dispatch(setCredentials({name,value}))
        setCredentials({...credentials,[name]:value})
        
      }

      const handleBtn = async()=> {
        // try {
        //   const userCredential = await createUserWithEmailAndPassword(auth,credentials.email,credentials.password)
        //   console.log(userCredential.user)
        // }
        // catch(err) {
        //   console.log(err.message)
        // }
        await registerUser(credentials)
        window.location.href = "/"

      }
  return (
    <>
        <div style={{ backgroundColor:"#F0F2F5",width:"100vw",height:"100vh", display: "flex", justifyContent: "center", alignItems: "center" }} className="container">
        <div style={{
          width: "28rem",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius:"1rem",
          backgroundColor:"white",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.13)"
        }} className="login-container">

          <h3 style={{
            fontSize: "1.9rem",
            alignSelf: "flex-start",
            marginLeft: "3.3vw",
            marginBottom: "0px"
          }}>Register</h3>


          {/* <InputLabel >Pick Profile</InputLabel>
          <Input onChange={handleFileChange} placeholder='Pick' inputProps={{'aria-label': 'description'}} type='file'/> */}
          <div style={{ width:"26vw", marginTop: "1.5vh", display: "flex" }} className="names-container">
            <TextField name='firstname' value={credentials.firstname} onChange={handleOnChange} style={{ width: "13vw", marginRight: "0.3vw" }} variant='outlined' label="Firstname" />
            <TextField name='lastname' onChange={handleOnChange} style={{ width: "13vw" ,marginLeft:"0.3vw" }} variant='outlined' label="Lastname" />
          </div>
          <TextField name='username' onChange={handleOnChange} style={{marginTop:"10px",width:"26vw"}} variant='outlined' label="Username"/>
          <TextField name='email' onChange={handleOnChange} style={{marginTop:"10px",width:"26vw"}} variant='outlined' label="Email" type={"email"}/>
          <TextField name='password' onChange={handleOnChange} style={{marginTop:"10px",width:"26vw"}} variant='outlined' label="Password" type={"password"}/>
        <Button variant="contained" style={{
          marginTop:"5vh",
          marginBottom:"2vh",
          alignSelf:"flex-start",
          marginLeft:"3.6vw",
          borderRadius:"1.5rem",
          width:"10vw",
          height:"7vh"
          }} onClick={handleBtn} >Register</Button>
          <Typography style={{marginBottom:"20px",alignSelf:"flex-start",marginLeft:"3.7vw"}} variant='p'>
            Already have an account ? <Link style={{color:"blue"}} to="/login">Login</Link>
          </Typography>
        </div>

      </div>
    </>
  )
}
