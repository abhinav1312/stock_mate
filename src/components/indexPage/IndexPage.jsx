import React, { useContext } from 'react'
import AuthContext from '../../context/auth/AuthContext'

const LandingPage = () => {
  const handleSignIn = useContext(AuthContext).handleSignIn
  const handleSignOut = useContext(AuthContext).handleSignOut
  const loggedIn = useContext(AuthContext).loggedIn
  return (
    <>
     <section className='pl-16'>
      Landing Page

      <button onClick={handleSignIn}> Sign in </button>
     </section>
    </>
  )
}

export default LandingPage
