import React from 'react'
import Header2 from './Header2'
import Aside from './Aside'
import { Outlet } from 'react-router-dom'

const Template = (props) => {

  return (
    <>
      <Header2 />
      <Aside />
      <Outlet />
      
    </>
  )
}

export default Template
