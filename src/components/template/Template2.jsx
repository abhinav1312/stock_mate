import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Template2 = () => {
  return (
    <>
    <section>
    <div className="flex justify-between w-full">
      <NavLink to='/hero/product_update/add_product' className='anchor-outline'>Add Product</NavLink>
      <NavLink to='/hero/product_update/sell_product' className='anchor-outline'>Sell Product</NavLink>
      <NavLink to='/hero/product_update/view_detail' className='anchor-outline'>View Detail</NavLink>
    </div>
   </section>
   <div>
    <Outlet />
   </div>
    </>
  )
}

export default Template2
