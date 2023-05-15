import React, { useContext, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import { useDispatch } from 'react-redux';
import BrandLogo from '../../assets/images/BrandLogo.png';
import { logout } from '../../redux/slice/authSlice';

const Aside = () => {
  // const {handleSignOut} = useContext(AuthContext);
  const asideRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    const asideClasses = asideRef.current.classList
    if(asideClasses.contains("translate-x-full")){
      asideClasses.remove("translate-x-full")
    }
    else{
      asideClasses.add("translate-x-full")
    }
  };

  return (
    <>
      <button
        className="fixed z-10 top-8 right-16 md:hidden"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <aside
        className="
         text-white bg-secondary py-8
         w-full
         translate-x-full
         md:translate-x-0
         md:w-52 shrink-0
         fixed 
         h-full 
         leading-loose 
         font-semibold"
        ref={asideRef}
      >
          <div>
          <NavLink to="/">
            <img
              src={BrandLogo}
              alt="brand logo"
              className="h-12 object-contain rounded-full"
              />
          </NavLink>
          </div>
        <nav className='mt-16 flex flex-col gap-8 px-8'>
          <NavLink to={'/hero'} end className="rounded-md py-2 px-6">
            <h3> Dashboard </h3>
          </NavLink>
          <NavLink to={'/hero/product_update'}>               
            <h3> Add product </h3>
          </NavLink>
          <NavLink to={'/hero/inventory'}> 
            <h3> See inventory</h3>
          </NavLink>
        </nav>
        <button onClick={()=>dispatch(logout(navigate))} className="pr-20 hover:bg-green-700 w-full">
          Sign out
        </button>
      </aside>
    </>
  );
};

export default Aside;
