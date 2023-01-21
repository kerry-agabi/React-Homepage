import React from 'react'
import  '../../App.css'
import{Form, Button, Card} from 'react-bootstrap'

export default function SignUp() {
  return(
    <>
    
    <h2 className='sign-up'> SIGNUP</h2>
    <Card>
      <Card.Body>
      <h2 className='text-center mb-4'> Sign Up </h2>]
      <Form>
        <Form.Group id ="email">
          <Form.Label> Email </Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>

        <Form.Group id ="password">
          <Form.Label> Password </Form.Label>
          <Form.Control type="password" ref={passwordRef} required />
        </Form.Group>

        <Form.Group id ="password-confirm">
          <Form.Label> Password Confirmation </Form.Label>
          <Form.Control type="password" ref={passwordConfirmRef} required />
        </Form.Group>

        <Button className='w-100' type='submit'></Button>

      </Form>

      </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>

    </div>

   </> 
  )
}