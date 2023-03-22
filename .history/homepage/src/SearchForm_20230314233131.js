import React from 'react'
import {Form, Col} from 'react-bootstrap'


 function SearchForm({params, onParamChange}) {
  return (
    <Form className="mb-4">
        <Form.Row>
        <Form.Group as={Col}>
        <Form.Label> Description </Form.Label>
        <Form.Control name="description" type="text"/>
        </Form.Group>
        </Form.Row>
        </Form>
  )
}

export default SearchForm;
