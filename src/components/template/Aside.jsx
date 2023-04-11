import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';

const Aside = () => {
  const asideRef = useRef();

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
        className=" fixed z-10 top-8 right-16 md:hidden"
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
        className="bg-blue
         text-white 
         w-full
         translate-x-full
         md:translate-x-0
         md:w-96 
         fixed 
         h-full 
         leading-loose 
         font-semibold"
         style = {{transition: ".5s ease"}}
        ref={asideRef}
      >
        <nav className="w-full">
          <ul>
            <li className="pl-20 hover:bg-hoverBlue">
              <NavLink to={'/hero'} end>
                {' '}
                <h2> Dashboard </h2>{' '}
              </NavLink>
            </li>{' '}
            <br />
            <li className="pl-20 hover:bg-hoverBlue">
              <NavLink to={'/hero/product_update'}>
                {' '}
                <h2> Add product </h2>{' '}
              </NavLink>
            </li>{' '}
            <br />
            <li className="pl-20 hover:bg-hoverBlue">
              <NavLink to={'/hero/inventory'}>
                {' '}
                <h2> See inventory</h2>{' '}
              </NavLink>
            </li>{' '}
            <br />
            <li className="pl-20 hover:bg-hoverBlue">
              <NavLink to={'/'}>
                {' '}
                <h2> Logout </h2>{' '}
              </NavLink>{' '}
            </li>{' '}
            <br />
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Aside;
