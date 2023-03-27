import React from 'react'
import {Form, Row, Col} from 'react-bootstrap'


 function SearchForm({params, onParamChange}) {
  return (
    <Row>
      <Col>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={handleParamChange}
                value={params.description}
                name="description"
                type="text"
                placeholder="Filter by job description"
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Col>
      <Col>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Location</Form.Label>
              <Form.Control
                onChange={handleParamChange}
                value={params.location}
                name="location"
                type="text"
                placeholder="Filter by job location"
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Col>
    </Row>
    )
}

export default SearchForm;
