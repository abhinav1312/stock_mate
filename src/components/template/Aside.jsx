import React, { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import BrandLogo from '../../assets/images/BrandLogo.png';
import { logout } from '../../redux/slice/authSlice';
import { GraphIcon, InventoryIcon, ProductUpdateIcon, SignoutIcon } from '../../assets/SVG';

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
         md:w-80 shrink-0
         fixed 
         h-full 
         leading-loose flex flex-col justify-between 
         font-medium"
        ref={asideRef}
      >
          <div className='mx-auto'>
          <NavLink to="/">
            <img
              src={BrandLogo}
              alt="brand logo"
              className="h-12 object-contain rounded-full"
              />
          </NavLink>
          </div>
        <nav className='mt-16 flex-1 flex flex-col gap-8 px-8'>
          <NavLink to={'/hero'} end className="rounded-md py-2 px-6 flex gap-4 items-center hover:bg-hoverSecondary">
            {GraphIcon}
            <h3> Dashboard </h3>
          </NavLink>
          <NavLink to={'/hero/product_update'} className="rounded-md py-2 px-6 flex gap-4 items-center hover:bg-hoverSecondary"> 
            {ProductUpdateIcon}              
            <h3> Product updates </h3>
          </NavLink>
          <NavLink to={'/hero/inventory'} className="rounded-md py-2 px-6 flex gap-4 items-center hover:bg-hoverSecondary"> 
          {InventoryIcon}
            <h3> Inventory </h3>
          </NavLink>
        </nav>
        <button onClick={()=>dispatch(logout(navigate))} className="ml-8 rounded-md !py-2 !px-6 w-4/5 flex gap-4 items-center hover:bg-hoverSecondary">
          {SignoutIcon}
          Sign out
        </button>
      </aside>
    </>
  );
};

export default Aside;
