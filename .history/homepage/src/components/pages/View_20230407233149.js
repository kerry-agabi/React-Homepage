import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

function View() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getApplications = async () => {
      const applicationsRef = collection(db, 'applications');
      const q = query(applicationsRef, where('jobId', '==', jobId));

      const applicationsSnapshot = await getDocs(q);
      setApplications(
        applicationsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })),
      );
    };

    getApplications();
  }, [jobId]);

  return (
    <Container>
      <h2 className="mt-4 mb-4">Job Applications</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>CV</th>
            <th>Cover Note</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.firstName}</td>
              <td>{application.lastName}</td>
              <td>{application.email}</td>
              <td>
                <a href={application.cvFileURL} target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              </td>
              <td>{application.coverNote}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default View;
