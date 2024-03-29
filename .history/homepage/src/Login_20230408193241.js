import React, {useRef, useState} from 'react'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import {useAuth} from './AuthContext'
import { Link, useNavigate } from "react-router-dom"

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    async function handleSubmuit(e){

        e.preventDefault()

        try{
            setError("")
            setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        navigate("/")
    } catch{
        setError("Failed to log in")
    }
    setLoading(false)
}

  return (
    <Container className ="d-flex align-items-center justify-content-center"
    style={{minHeight: "85vh"}}>
      <div className="w-100" style={{ maxWidth: "300px"}}>
    <>
    <Card>

        <Card.Body>

            <h2 className='text-center mb-4'> Log in</h2>
            {}
            {error && <Alert variant="danger">{error} </Alert>}
            <Form onSubmit = {handleSubmuit}>

                <Form.Group id = "email">
                    <Form.Label> Email</Form.Label>
                    <Form.Control type = "email" ref = {emailRef} required />
 

                </Form.Group>
                <br>
                </br>


                <Form.Group id = "password">
                    <Form.Label> Password</Form.Label>
                    <Form.Control type = "password" ref = {passwordRef} required />
 

                </Form.Group>

                <br>
                </br>

                <Button disabled ={loading} className='w-100 ml-0' type="submit">Log in</Button>
                <br>
                </br>
            </Form>
            <br>
              </br>
     <div className='w-100 text-center mt-2'>      
     <Link to ="/forgot-password"> Forgot Password?</Link>
    </div>
        </Card.Body>
     </Card>
     
     <div className='w-100 text-center mt-2'>      
              Not Registered? <Link to="/signup">Create account</Link>



     </div>
      

    </>
    </div>
   </Container>
  )
}
