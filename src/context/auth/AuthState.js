import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { auth, provider, db } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import AlertContext from '../alert/AlertContext';

const AuthState = (props) => {
  const showAlert = useContext(AlertContext).showAlert; // alerts when some process occurs
  const [loggedIn, setLoggedIn] = useState(false); // state to check whether user is logged in
  const [userId, setUserId] = useState(null); // set user id when user is logged in

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setLoggedIn(true);
      } else {
        setUserId(null);
        setLoggedIn(false);
      }
    });
    return() => unsubscribe();
  }, []);

  // handle sign in
  const handleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider); // sign in popup on buttonclick
      const userDocRef = doc(db, 'users', user.uid); // check if user exists in database
      const snapshot = await getDoc(userDocRef);

      //add user to database if it doesnt exist
      if (!snapshot.exists()) {
        const name = user.displayName;
        const email = user.email;
        const createdAt = new Date();
        await setDoc(userDocRef, { name, email, createdAt });
      }
      setLoggedIn(true); // user logged in successfully
      showAlert("success", "Successfully logged in.")
    } catch (error) {
      showAlert('error','Some error occurred while signing in. Please try again.');
    }
  };

  // handle sign out
  const handleSignOut = async () => {
    try{
      await auth.signOut();
      setLoggedIn(false);
      setUserId(null);
    }catch (error) {
      showAlert('error','Some error occurred while signing out. Please try again.');
    }
  };

  

  console.log(userId, loggedIn)

  return (
    <>
      <AuthContext.Provider value={{ loggedIn, handleSignIn, handleSignOut }}>
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthState;
