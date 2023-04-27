import React from 'react'
import Header2 from './Header2'
import Aside from './Aside'
import { Outlet } from 'react-router-dom'

const Template = (props) => {

  return (
    <>
      <Header2 />
      {/* <div className="grid grid-cols-[1fr_1fr]"> */}
        <Aside />
        <Outlet />
      {/* </div> */}
    </>
  )
}

export default Template
