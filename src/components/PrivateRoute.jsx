import React from 'react'
import {Navigate} from 'react-router-dom'
import { auth } from '../firebase-config'
export default function PrivateRoute({children}) {
  const user = auth.currentUser
  console.log(user)
  if(user === null) {
    return <Navigate to={"/login"} />
  }
  return children
}
