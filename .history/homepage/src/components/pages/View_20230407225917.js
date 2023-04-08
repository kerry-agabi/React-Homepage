import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Card, Container } from 'react-bootstrap';

function View() {
  const { id } = useParams();
  const [jobSeekers, setJobSeekers] = useState([]);

  useEffect(() => {
    const fetchJobSeekers = async () => {
      const jobSeekersCollectionRef = collection(db, 'jobSeekers', id, 'careerInfo');
      const jobSeekersSnapshot = await getDocs(jobSeekersCollectionRef);
      const jobSeekersData = jobSeekersSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setJobSeekers(jobSeekersData);
    };

    fetchJobSeekers();
  }, [id]);

  return (
    <div className="mt-4">
      <Container>
        {jobSeekers.map((jobSeeker) => (
          <Card className="mb-3" key={jobSeeker.id}>
            <Card.Body>
              <Card.Title>
                {jobSeeker.name} - {jobSeeker.email}
              </Card.Title>
              <Card.Text>
                <strong>Address: </strong>
                {jobSeeker.address}
              </Card.Text>
              <Card.Text>
                <strong>Skills: </strong>
                {jobSeeker.skills && jobSeeker.skills.join(', ')}
              </Card.Text>
              <Card.Text>
                <strong>Contract Preference: </strong>
                {jobSeeker.contractPreference}
              </Card.Text>
              <Card.Text>
                <strong>Worksite Preference: </strong>
                {jobSeeker.worksitePreference}
              </Card.Text>
              <Card.Text>
                <strong>Matching Score: </strong>
                {jobSeeker.matchingScore}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default View;
