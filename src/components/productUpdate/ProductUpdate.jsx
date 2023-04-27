import React from 'react'
import { Link} from 'react-router-dom'

const ProductUpdate = () => {
  return (
    <>
    
     <section>
      <div className="flex justify-between w-full">
        <Link to='/product_update' className='py-12 px-24 bg-blue text-2xl shadow-lg font-semibold hover:bg-darkGrey'>Add Product</Link>
        <Link to='/product_update' className='py-12 px-24 bg-blue text-2xl shadow-lg font-semibold hover:bg-darkGrey'>Sell Product</Link>
        <Link to='/product_update' className='py-12 px-24 bg-blue text-2xl shadow-lg font-semibold hover:bg-darkGrey'>View Detail</Link>
      </div>
     </section>

     {/* <section>
      <AddProduct />
     </section> */}
    </>
  )
}

export default ProductUpdate
