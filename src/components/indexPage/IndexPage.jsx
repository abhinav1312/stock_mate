import React, { useContext } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import {useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
// import { login } from '../../redux/slice/authSlice';
import { login, logout } from '../../redux/slice/authSlice.jsx';

const IndexPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const handleSignIn = useContext(AuthContext).handleSignIn
  // const handleSignOut = useContext(AuthContext).handleSignOut
  // const loggedIn = useContext(AuthContext).loggedIn

  const handleSignIn = () => {
    dispatch(login(navigate));
  }

  const handleClick = () => {
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

export default IndexPage;
