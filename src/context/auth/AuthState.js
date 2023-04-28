import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { auth, provider, db } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import AlertContext from '../alert/AlertContext';
import { Navigate } from 'react-router-dom';

const AuthState = (props) => {
  const {showAlert} = useContext(AlertContext); // alerts when some process occurs
  const [loggedIn, setLoggedIn] = useState(false); // state to check whether user is logged in
  // const [userId, setUserId] = useState(null); // set user id when user is logged in

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        <Navigate to='/'/>
      }
    });
    return() => unsubscribe();
  }, []);

  // handle sign in
  const handleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider); // sign in on buttonclick
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
      console.log(error)
    }
  };

  // handle sign out
  const handleSignOut = async () => {
    console.log("Called logout");
    try{
      await auth.signOut();
      setLoggedIn(false);
    }catch (error) {
      showAlert('error','Some error occurred while signing out. Please try again.');
    }
    console.log("Auth insidee: ", auth);
  };

  console.log("Auth: ", auth);

  return (
    <>
      <AuthContext.Provider value={{ loggedIn, handleSignIn, handleSignOut }}>
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthState;
