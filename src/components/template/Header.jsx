import React from 'react';
import BrandLogo from '../../assets/images/BrandLogo.png';
import { NavLink } from 'react-router-dom';

const Header = (props) => {


  // const handleClick = () => {

  // }

  return (
    <>
      <header className="fixed w-full bg-white flex justify-between items-center shadow-md">
        <div className="brand-logo">
          <NavLink to="/">
            <img
              src={BrandLogo}
              alt="brand logo"
              className="h-12 object-contain"
            />
          </NavLink>
        </div>

        {/* <button className='md:hidden'>
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
        </button> */}

        {/* <div className="profile p-2 font-semibold">
          <h3>Logout</h3>
        </div> */}
      </header>

      {/* <header className="fixed top-0 flex px-1 justify-between items-center h-24 bg-blue w-full">
        <li>About</li>
        <li>About</li>
        <li>About</li>
        <li>About</li>
      </header> */}
    </>
  );
};

export default Header;
