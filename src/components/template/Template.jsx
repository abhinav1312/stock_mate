import React from 'react'
import Header from './Header'
import Aside from './Aside'

const Template = (props) => {

  return (
    <>
      <Header />
      <div className="pt-28 bg-bgColor min-h-screen">
        <div className="flex-1">
          <Aside /> 
        </div>
        <main className='p-16 md:pl-[28rem] h-full'>
          {props.children}
        </main>
      </div>

    </>
  )
}

export default Template
