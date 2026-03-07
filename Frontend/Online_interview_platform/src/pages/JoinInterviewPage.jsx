import React from 'react'
import { useParams } from 'react-router-dom'
import {useAuthStore} from '../store/AuthStore'
function JoinInterviewPage() {
    const {user} =useAuthStore();
    const {session_code}=useParams();
    console.log(session_code);
    console.log("This User Joined",user.role);
    
  return (
    <div>
      <h1>This is Join Interview Page {session_code} </h1>
    </div>
  )
}

export default JoinInterviewPage
