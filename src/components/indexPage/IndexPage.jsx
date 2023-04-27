import React, { useContext } from 'react'
import AuthContext from '../../context/auth/AuthContext'

const LandingPage = () => {
  const handleSignIn = useContext(AuthContext).handleSignIn
  const handleSignOut = useContext(AuthContext).handleSignOut
  const loggedIn = useContext(AuthContext).loggedIn
  return (
    <>
     <section>
      Landing Page
     </section>
    </>
  )
}

export default LandingPage
