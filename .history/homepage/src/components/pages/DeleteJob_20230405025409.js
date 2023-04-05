// DeleteJob.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DeleteJob({ id }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const jobDocRef = doc(db, 'jobs', id);

  const handleDelete = async () => {
    try {
      await deleteDoc(jobDocRef);
      console.log('Job successfully deleted!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="mt-4">
      <Button variant="danger" onClick={handleDelete}>
        Delete Job
      </Button>
    </div>
  );
}

export default DeleteJob;
