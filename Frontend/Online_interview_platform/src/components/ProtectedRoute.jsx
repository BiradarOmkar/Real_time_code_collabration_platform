import React, { Children } from 'react'
import { useAuthStore } from '../store/AuthStore'
import { Navigate } from 'react-router-dom';
function ProtectedRoute({children,allowedrole}) {
  const {user} =useAuthStore();
  // console.log("Role",user.role);
  
   if(!user) return <Navigate to="/"  replace/>
   if(allowedrole && user.role!==allowedrole)  return <Navigate to="/" replace/>
  return children
}

export default ProtectedRoute
