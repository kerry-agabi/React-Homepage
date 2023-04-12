import React, {useContext, useState, useEffect  } from 'react'
import {auth, db} from './firebase'
import { getDoc, doc } from "firebase/firestore";

export const AuthContextTwo = React.createContext()

export function useAuthTwo(){

    return useContext(AuthContextTwo)
}

export function AuthProviderTwo({children}) {

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
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const jobSeekerSnapshot = await getDoc(doc(db, "jobSeekers", user.uid));
            const jobSeekerData = jobSeekerSnapshot.data();
            setCurrentUser({ ...user, jobSeeker: jobSeekerData });
          } else {
            setCurrentUser(user);
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
      <AuthContextTwo.Provider value={value}>
          {!loading && children}
      </AuthContextTwo.Provider>
  )
}
