import React, { useContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase'; // Assuming you have your Firestore database exported as 'db'

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function fetchUserData(uid) {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.data();
  }

  async function storeUserData(uid, userData) {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, userData);
  }

  function signup(email, password, userData) {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      storeUserData(cred.user.uid, userData);
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await fetchUserData(user.uid);
        setCurrentUser({ ...user, jobSeeker: userData });
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
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
