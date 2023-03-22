import { useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import  'firebase/compat/firestore';
import '../../File.css'
import {db} from '../../firebase'
import { collection, getDocs } from 'firebase/firestore';

   import React from 'react'
   
   function Advertise() {
      const[users, setUsers] = useState([])
      const userCollectionRef = collection(db, "users")


      useEffect(()=>{ 

        const getUsers = async () => {

          const data = await getDocs(userCollectionRef);
          setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id }))) 

        }

        getUsers()
      }, [])
     return (
       <div>
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