import React, {useRef, useState, Alert} from 'react'
import  '../../App.css'
import{Form, Button, Card, Container} from 'react-bootstrap'
import {useAuth} from '../../AuthContext'


export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)


    async function handleSubmuit(e) {
      e.preventDefault(); // prevent the form from refreshing
      
      if (passwordRef.current.value !== passwordConfirmRef.current.value)
              {
                  return setError('Passwords do not match !')
              }
          try{
            setError('')
            setLoading(true) // stops the user from creating the mulitple accounts with the same credentials

          
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch{

            setError('Failed to create an account')
    }

    setLoading(false)
  }
      
  return(

    <Container className ="d-flex align-items-center justify-content-center"
style={{minHeight: "85vh"}}>
  <div className="w-100" style={{ maxWidth: "400px"}}>
    <>
    <Card>
      <Card.Body>
      <h2 className='text-center mb-4'> Sign Up </h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant='danger'> {error} </Alert> }
        <Form.Group id ="email">
          <Form.Label> Email </Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>
        <br>
        </br>

        <Form.Group id ="password">
          <Form.Label> Password </Form.Label>
          <Form.Control type="password" ref={passwordRef} required />
        </Form.Group>
        <br>
        </br>
        <Form.Group id ="password-confirm">
          <Form.Label> Password Confirmation </Form.Label>
          <Form.Control type="password" ref={passwordConfirmRef} required />
        </Form.Group>
        <br>
        </br>

        <Button disabled ={loading} className='w-100' type='submit'>Sign Up</Button>

      </Form>

      </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>

    </div>

   </> 
   </div>
   </Container>
  )
}
