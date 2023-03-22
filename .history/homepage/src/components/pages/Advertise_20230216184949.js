import { useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import  'firebase/compat/firestore';
import '../../File.css'
import {db} from '../../firebase'
import { collection } from 'firebase/firestore';

   import React from 'react'
   
   function Advertise() {
      const[users, setUsers] = useState([])
      const userCollectionRef = collection(db, "users")


      useEffect(()=>{ 

        const getUsers = async () => {

          const data = await getDocs(userCollectionRef);
          console.log(data)

        }

        getUsers()
      }, [])
     return (
       <div>
         
       </div>
     )
   }
   
    export default Advertise;