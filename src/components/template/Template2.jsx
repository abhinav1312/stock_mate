import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Template2 = () => {
  return (
    <>
    <section>
    <div className="flex justify-between w-full">
      <NavLink to='/hero/product_update/add_product' className='shadow-md rounded-md py-6 px-12 text-2xl bg-green-500 hover:bg-green-400'>Add Product</NavLink>
      <NavLink to='/hero/product_update/sell_product' className='shadow-md rounded-md py-6 px-12 text-2xl bg-green-500 hover:bg-green-400 '>Sell Product</NavLink>
      <NavLink to='/hero/product_update/view_detail' className='shadow-md rounded-md py-6 px-12 text-2xl bg-green-500 hover:bg-green-400'>View Detail</NavLink>
    </div>
   </section>
   <div>
    <Outlet />
   </div>
    </>
  )
}

export default Template2
