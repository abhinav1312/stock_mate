import React, { useContext } from 'react'
import AuthContext from '../../context/auth/AuthContext'

const LandingPage = () => {
  const handleSignIn = useContext(AuthContext).handleSignIn
  const handleSignOut = useContext(AuthContext).handleSignOut
  const loggedIn = useContext(AuthContext).loggedIn
  return (
    <>
      Landing page
      {
        loggedIn? (
          <>
            <button className='text-5xl' onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <button className='text-5xl' onClick={handleSignIn}>Sign In</button>
          </>
        )
      }
    </>
  )
}

export default LandingPage
