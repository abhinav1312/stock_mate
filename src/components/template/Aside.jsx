import React, { useContext, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import { useDispatch } from 'react-redux';
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
         text-white bg-green-500 pt-24
         w-full
         translate-x-full
         md:translate-x-0
         md:w-52 shrink-0
         fixed 
         h-full 
         leading-loose 
         font-semibold transition-all"
        ref={asideRef}
      >
        <nav>
          <ul>
            <li className="pl-8 hover:bg-green-700">
              <NavLink to={'/hero'} end>
                
                <h2> Dashboard </h2>
              </NavLink>
            </li>
            <br />
            <li className="pl-8 hover:bg-green-700">
              <NavLink to={'/hero/product_update'}>
                
                <h2> Add product </h2>
              </NavLink>
            </li>
            <br />
            <li className="pl-8 hover:bg-green-700">
              <NavLink to={'/hero/inventory'}>
                
                <h2> See inventory</h2>
              </NavLink>
            </li>
            <br />
            <button onClick={()=>dispatch(logout(navigate))} className="pr-20 hover:bg-green-700 w-full">
              Sign out
            </button>
            <br />
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Aside;
