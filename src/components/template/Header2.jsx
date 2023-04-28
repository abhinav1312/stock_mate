import React from 'react';
import BrandLogo from '../../assets/images/BrandLogo.png';
import { NavLink, Outlet } from 'react-router-dom';

const Header2 = (props) => {
  return (
    <>
      <header className="py-6 px-16 shadow-lg w-full">
          <NavLink to="/">
            <img
              src={BrandLogo}
              alt="brand logo"
              className="h-6 object-contain"
            />
          </NavLink>
      </header>
      
    </>
  );
};

export default Header2;
