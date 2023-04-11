import React from 'react'
import  {Navigate} from 'react-router-dom'
import { useAuthTwo } from './AuthContextTwo'

export default function PrivateRouteTwo({ children }) {
    const { currentUser } = useAuthTwo();
  
    if (currentUser === undefined) {
      // return a loading state or null, while the currentUser is being fetched
      return null;
    }
  
    return currentUser ? children : <Navigate to ="/login"/>;
  }
  