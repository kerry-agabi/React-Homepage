import React from 'react'
import {Form, Col} from 'react-bootstrap'


 function SearchForm({params, onParamChange}) {
  return (
    <div> 
    <Form className="mb-4">
        <Form.Row>
        <Form.Group as={Col}>
        <Form.Label> Description </Form.Label>
        <Form.Control onChange={onParamChange} value = {params.description} name = "description" type ="text" />
        </Form.Group>
        </Form.Row>
        </Form>
  </div>)
}

export default SearchForm;
