import React from 'react'

const InventoryModal = ({inventoryInfoSubmit, name, category, brand, handleContentChange, quantity, expiryDate}) => {
  return (
    <>
     <div className="absolute z-10 inset-0 opacity-80 bg-gray-300  overflow-hidden"></div>
      <div className="fixed top-16 left-[25rem] z-10 p-8 rounded-2xl shadow-lg bg-white w-1/2">
        <h2 className="pb-4 text-2xl font-medium">
          Please fill and update necessary details
        </h2>
        <form
          onSubmit={inventoryInfoSubmit}
          className="flex flex-col justify-between gap-4"
        >
          <div>
            <h3 className='modalFormHeading'>Product name</h3>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter product name"
              value={name}
              onChange={handleContentChange}
              className="modalFormInput"
            />
          </div>
          <div>
            <h3 className='modalFormHeading'> Category </h3>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Enter product category for eg: Chips, biscuit, sauce, spread etc.."
              value={category}
              onChange={handleContentChange}
              className="modalFormInput"
            />
          </div>

          <div>
            <h3 className='modalFormHeading'> Brand </h3>
            <input
              type="text"
              name="brand"
              id="brand"
              placeholder="Enter product brand"
              value={brand}
              onChange={handleContentChange}
              className="modalFormInput"
            />
          </div>
          <div>
            <h3 className='modalFormHeading'> Quantity </h3>
            <input
              type="number"
              name="quantity"
              id="quantity"
              placeholder="Enter quantity"
              value={quantity}
              onChange={handleContentChange}
              className="modalFormInput"
            />
          </div>
          <div>
            <h3 className='modalFormHeading'> Expiry date </h3>
            <input
              type="date"
              name="expiryDate"
              id="expiryDate"
              placeholder="Enter expiry date"
              value={expiryDate}
              onChange={handleContentChange}
              className="modalFormInput"
            />
          </div>

          <button
            type="submit"
            className="px-8 py-4 rounded-md border bg-green-600 hover:bg-green-700 text-white text-xl font-semibold"
          >
            Submit
          </button>
        </form>
      </div> 
    </>
  )
}

export default InventoryModal
