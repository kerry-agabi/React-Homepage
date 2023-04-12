import React, {useContext, useState, useEffect  } from 'react'
import {auth, db} from './firebase'
import { getDoc, doc } from "firebase/firestore";


export const AuthContext = React.createContext()

export function useAuth(){

    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password){

        return auth.createUserWithEmailAndPassword(email, password)
        // firebase has its own way to notify you when the user gets set.
    }


    function login (email, password ){

        return auth.signInWithEmailAndPassword(email, password)
    }


    function logout() {

      return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)


    }
    
    function updateEmail(email){

        return currentUser.updateEmail(email)
    }
    function updatePassword(password){

        return currentUser.updatePassword(password)
    }


    useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(user =>{

        setCurrentUser(user)
        setLoading(false)
    })

    return unsubscribe
},[])

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user1) => {
      if (user1) {
        const jobSeekerSnapshot = await getDoc(doc(db, "jobSeekers", user1.uid));
        const jobSeekerData = jobSeekerSnapshot.data();
        
        setCurrentUser({ ...user1, jobSeeker: jobSeekerData });
      } else {
        setCurrentUser(user1);
      }
      setLoading(false);
    });
  
    return unsubscribe;
  }, []);
  



    const value = {
        currentUser,
        userId: currentUser ? currentUser.uid : null,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
        

    }
  return (
      <AuthContext.Provider value={value}>
          {!loading && children}
      </AuthContext.Provider>
  )
}
