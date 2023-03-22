import { useState, useEffect} from 'react';
import  'firebase/compat/firestore';
import '../../File.css'
import {db} from '../../firebase'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Card, Badge } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown';

function JobCard() {

  const [newCompany, setNewCompany] = useState("")
  const [newContract, setNewContract] = useState("")
  const [newJobDescription, setNewJobDescription] = useState("")
  const [newJobTitle, setNewJobTitle] = useState("")
  const [newLocation, setNewLocation] = useState("")
  const [newSkills, setNewSkills] = useState("")
  const [newdate, setNewdate] = useState("")
  const [newLink, setNewLink] = useState("")




  const[jobs, setjobs] = useState([])
  const jobsCollectionRef = collection(db, "jobs")

  const createJob = async () => {


    await addDoc(jobsCollectionRef, {
      Company: newCompany,
      Contract: newContract,
      JobDescription: newJobDescription,
      JobTitle: newJobTitle,
      Location: newLocation,
      Skills: newSkills,
      date: newdate,
      Link: newLink,
    });

  }

    // const updateUser = async (id, age) => {
    //   const userDoc = doc(db, "jobs", id)

    //   const newFields = { age:age + 1}

    //   await updateDoc(userDoc, newFields)


     


    // }
    
    const deletejobs = async(id) => {

      const jobDoc = doc(db, "jobs", id)
      await deleteDoc(jobDoc)
    }
  useEffect(()=>{ 

    const getjobs = async () => {

      const data = await getDocs(jobsCollectionRef);
      setjobs(data.docs.map((doc) => ({...doc.data(), id: doc.id }))) 

    }

   getjobs()
  }, [])
 return (


  <div>

  
 
  {jobs.map((job) => {

      return (
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Card.Title>
                  {job.JobTitle} -{" "}
                  <span className="text-mute font-weight-light">
                    {job.Company}{" "}
                  </span>
                </Card.Title>
                <Card.Subtitle>
                  {new Date(job.date).toLocaleDateString()}
                </Card.Subtitle>
                <Badge variant="secondary" className='mr-2'>{job.Contract}</Badge>
                <Badge variant="secondary">{job.Location}</Badge>
                <div>
                  <ReactMarkdown source={job.Link} > </ReactMarkdown>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      );
     })}


</div> )



}

export default JobCard;