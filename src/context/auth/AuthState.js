import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { auth, provider, db } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';



const AuthState = (props) => {
  const [loggedIn, setLoggedIn] = useState(false); // state to check whether user is logged in

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return() => unsubscribe();
  }, []);

  // handle sign in
  const handleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      console.log("User: ", user.uid)
      // sign in on buttonclick
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
      
    } catch (error) {
      alert("Error occured while signing in");
      console.log(error)
    }
  };

  // handle sign out
  const handleSignOut = async () => {
    
    try{
      await auth.signOut();
      setLoggedIn(false);  
    }catch (error) {
      alert('error','Some error occurred while signing out. Please try again.');
    }
  };

  return (
    <>
      <AuthContext.Provider value={{ loggedIn, handleSignIn, handleSignOut }}>
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthState;
