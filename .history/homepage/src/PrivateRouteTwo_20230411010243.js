import React from 'react'
import  {Navigate} from 'react-router-dom'
import { useAuth } from './AuthContextTwo'

export default function PrivateRouteTwo({ children}) {
const {currentUser} = useAuth()
    
        return currentUser ? children : <Navigate to ="/login"/>;      
}
