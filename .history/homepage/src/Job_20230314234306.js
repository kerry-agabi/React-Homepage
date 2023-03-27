import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Advertise from './components/pages/Advertise';
import JobCard from './components/pages/JobCard';
import JobsPage from './components/pages/JobsPage';

function Job() {
  const [params, setParams] = useState({ description: '', location: '' });
  const [page, setPage] = useState(0);
  const { jobs, loading, error } = useFetchJobs(params, page);

  const handleParamChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };

  return (
    <Container>
      <br />
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
      <br />
      <JobsPage page={page} setPage={setPage} hasNextPage={true} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try refreshing the page</h1>}
      {jobs.map((job) => {
        return <JobCard key={job.id} job={job} />;
      })}
      <JobsPage page={page} setPage={setPage} hasNextPage={true} />
    </Container>
  );
}

export default Job;
