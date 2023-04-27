import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Template2 = () => {
  return (
    <>
    <section>
    <div className="flex justify-between w-full">
      <NavLink to='/hero/product_update/add_product' className='py-12 px-24 bg-blue text-2xl shadow-lg font-semibold hover:bg-darkGrey'>Add Product</NavLink>
      <NavLink to='/hero/product_update/sell_product' className='py-12 px-24 bg-blue text-2xl shadow-lg font-semibold hover:bg-darkGrey'>Sell Product</NavLink>
      <NavLink to='/hero/product_update/view_detail' className='py-12 px-24 bg-blue text-2xl shadow-lg font-semibold hover:bg-darkGrey'>View Detail</NavLink>
    </div>
   </section>
   <section>
    <Outlet />
   </section>
    </>
  )
}

export default Template2
