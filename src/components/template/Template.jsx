import React from 'react'
import Aside from './Aside'
import { Outlet } from 'react-router-dom'

const Template = (props) => {

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
