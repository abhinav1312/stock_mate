import React from 'react'
import Template from '../template/Template'
import AddProduct from './AddProduct'

const ProductUpdate = () => {
  return (
    <>
    <Template>
     <section>
      <div className="flex justify-between w-full">
        <button className='py-12 px-24 bg-grey text-2xl shadow-lg font-semibold hover:bg-darkGrey'>Add Product</button>
        <button className='py-12 px-24 bg-grey text-2xl shadow-lg font-semibold hover:bg-darkGrey'>Add Product</button>
        <button className='py-12 px-24 bg-grey text-2xl shadow-lg font-semibold hover:bg-darkGrey'>Add Product</button>
      </div>
     </section>

     <section>
      <AddProduct />
     </section>
    </Template>
    </>
  )
}

export default ProductUpdate
