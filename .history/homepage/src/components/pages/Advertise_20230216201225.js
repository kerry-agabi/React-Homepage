import { useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import  'firebase/compat/firestore';
import '../../File.css'
import {db} from '../../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore';

   import React from 'react'
   
   function Advertise() {
      const [newName, setNewName] = useState("")
      const [newAge, setNewAge] = useState(0)

      const[users, setUsers] = useState([])
      const userCollectionRef = collection(db, "users")

      const createUser = async () => {


        await addDoc(userCollectionRef, {name: newName, age: newAge})

      }


      useEffect(()=>{ 

        const getUsers = async () => {

          const data = await getDocs(userCollectionRef);
          setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id }))) 

        }

        getUsers()
      }, [])
     return (
       <div>
          <input placeholder='Name...' onChange={(event) => {setNewName(event.target.value)}}/>
          <input type="number" placeholder= "Age..." onChange={(event) => {setNewAge(event.target.value)}} />

          <button onClick = {createUser}> Create User </button>
         {users.map((user) => {
          return(

            <div>
              {" "}

              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>

              </div>

          )
         })}
       </div>
     )
   }
   
    export default Advertise;