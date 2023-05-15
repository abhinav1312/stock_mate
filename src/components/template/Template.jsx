import React, { useEffect } from 'react'
import Header2 from './Header2'
import Aside from './Aside'
import { Outlet } from 'react-router-dom'

const Template = (props) => {
  useEffect(()=>{
    console.log("Template rendered");
  }, [])
  return (
    <>
      <Aside />
      <div className='pr-8 pl-56 pb-8 pt-24'>
        <Outlet />
      </div>
      
    </>
  )
}

export default Template
