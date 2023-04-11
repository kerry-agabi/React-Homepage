import React from 'react'
import  {Navigate} from 'react-router-dom'
import { useAuthTwo } from './AuthContextTwo'

export default function PrivateRouteTwo({ children}) {
const {currentUser} = useAuthTwo()
    
        return currentUser ? children : <Navigate to ="/login"/>;      
}
