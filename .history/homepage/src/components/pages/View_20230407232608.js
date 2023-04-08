import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { db } from '../../firebase';
import { collection, getDocs, query, where, doc} from 'firebase/firestore';

function View() {
  const [jobApplications, setJobApplications] = useState([]);
  const { jobId } = useParams();

  useEffect(() => {
    const fetchJobApplications = async () => {
      const applicationsCollectionRef = collection(db, 'applications');
      const q = query(where('jobId', '==', jobId));
      const querySnapshot = await getDocs(q);

      const applications = [];
      querySnapshot.forEach((doc) => {
        applications.push(doc.data());
      });

      const jobSeekersCollectionRef = collection(db, 'jobSeekers');
      const jobSeekers = await Promise.all(
        applications.map(async (application) => {
          const docRef = doc(jobSeekersCollectionRef, application.userId);
          const docSnap = await getDocs(docRef);
          return { ...docSnap.data(), id: docSnap.id };
        }),
      );

      setJobApplications(
        applications.map((application, index) => ({
          ...jobSeekers[index],
          matchingScore: application.matchingScore,
        })),
      );
    };

    fetchJobApplications();
  }, [jobId]);

  return (
    <Container className="mt-4">
      <h2>Job Applications</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Skills</th>
            <th>Contract Preference</th>
            <th>Worksite Preference</th>
            <th>Matching Score</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications.map((jobApplication) => (
            <tr key={jobApplication.id}>
              <td>{jobApplication.name}</td>
              <td>{jobApplication.email}</td>
              <td>{jobApplication.address}</td>
              <td>{jobApplication.skills.join(', ')}</td>
              <td>{jobApplication.contractPreference}</td>
              <td>{jobApplication.worksitePreference}</td>
              <td>{jobApplication.matchingScore}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default View;