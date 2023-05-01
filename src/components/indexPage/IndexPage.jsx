import React, { useContext } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import {useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate();
  const handleSignIn = useContext(AuthContext).handleSignIn
  // const handleSignOut = useContext(AuthContext).handleSignOut
  // const loggedIn = useContext(AuthContext).loggedIn

  const handleClick = () => {
    console.log("clicked")
    navigate('/hero/product_update')
  }
  return (
    <>
     <section className='pl-16'>
      Landing Page

      <button onClick={handleSignIn}> Sign in </button>

      <button onClick = {handleClick}>Click bisi</button>
     </section>
    </>
  )
}

export default LandingPage;
