import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DeleteJob({ id }) {
  const navigate = useNavigate();
  const jobDocRef = doc(db, 'jobs', id);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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
      <Button variant="danger" onClick={handleShow}>
        Delete Job
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this job?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal> 
    </div>
  );
}

export default DeleteJob;
