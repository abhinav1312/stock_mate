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
      <div className='pl-72'>
        <Outlet />
      </div>
      
      
    </>
  )
}

export default Template
