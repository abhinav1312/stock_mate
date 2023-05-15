import React from 'react';
import BrandLogo from '../../assets/images/BrandLogo.png';
import { NavLink, Outlet } from 'react-router-dom';
import { GoogleIcon, ProfileIcon } from '../../assets/SVG';
import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/slice/authSlice.jsx';

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // check if user is logged in or logged out
  const user = useSelector(state=>{return state.auth.user})
  const name = useSelector(state=>{return state.auth.name})

  return (
    <>
      <header className="fixed w-full py-4 px-16 flex justify-between shadow-lg bg-body z-10">
        <div className='py-2'>
            <NavLink to="/">
              <img
                src={BrandLogo}
                alt="brand logo"
                className="h-12 object-contain rounded-full"
                />
            </NavLink>
          </div>
        <div className='flex gap-8 items-center text-lg font-medium'>
          <NavLink to="/" className="header-navlink">
            <h3>Home</h3>
          </NavLink>
          <NavLink to="/home" className="header-navlink">
            <h3>About</h3>
          </NavLink>
          <NavLink to="/home" className="header-navlink">
            <h3>Contact Us</h3>
          </NavLink>
        {
          user ? 
            <button className='header-navlink fill flex items-center gap-2' onClick={()=>dispatch(logout(navigate))}>
              <span>{ProfileIcon}</span>
              Logout of {name}
            </button>
          :
          <button className='header-navlink btn-outline flex items-center gap-2' onClick={()=>dispatch(login(navigate))}>
            <span>{GoogleIcon}</span>
            Login / Signup
          </button>
        }
        </div>


      </header>
        <Outlet />
    </>
  );
};

export default Header;
