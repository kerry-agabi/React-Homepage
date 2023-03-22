import React, {useState } from 'react'
import { Card, Button, Alert, Container } from 'react-bootstrap'
import {useAuth} from './AuthContext'
import { Link, useNavigate } from "react-router-dom"
export default function Dashboard() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()

    async function handleLogout(){

        setError('')

        try{

            await logout()
            navigate("/login")

        } catch{

            setError('Failed to log out')


        }



    }
  return (
    <Container className ="d-flex align-items-center justify-content-center"
    style={{minHeight: "85vh"}}>
      <div className="w-100" style={{ maxWidth: "400px"}}>
   <>
   <Card>
    <Card.Body>
    <h2 className='text-center mb-4'> Profile </h2>
    {error && <Alert variant="danger">{error} </Alert>}

    <strong>Email:</strong> {currentUser.email}
    <Link to="/dashboard2" className = "btn btn-primary w-100 mt-3">
    Update Profile
    </Link>

    </Card.Body>

   </Card>
   <div className='w-100 text-center mt-2'>      
             <Button variant = "link" onClick={handleLogout}> Log out </Button>



     </div>
   
   
   </>
   </div>
   </Container>
  )
}
