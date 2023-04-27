import React from 'react'

const InventoryModal = ({inventoryInfoSubmit, name, category, brand, handleContentChange, quantity, expiryDate}) => {
  return (
    <>
     <div className="absolute bottom-72 inset-0 opacity-80 bg-gray-300 flex justify-center items-center  h-full w-full"></div>
      <div className="relative p-16 bg-white w-3/4 z-10 rounded-xl shadow-md">
        <h3 className="pb-4">
          Please fill and update necessary details
        </h3>
        <form
          onSubmit={inventoryInfoSubmit}
          className="flex flex-col justify-between gap-8"
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter product name"
            value={name}
            onChange={handleContentChange}
            className="p-4 text-2xl focus:border-blue-400 rounded-2xl focus:outline-none border"
          />
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Enter product category for eg: Chips, biscuit, sauce, spread etc.."
            value={category}
            onChange={handleContentChange}
            className="p-4 text-2xl focus:border-blue-400 rounded-2xl focus:outline-none border"
          />
          <input
            type="text"
            name="brand"
            id="brand"
            placeholder="Enter product brand"
            value={brand}
            onChange={handleContentChange}
            className="p-4 text-2xl focus:border-blue-400 rounded-2xl focus:outline-none border"
          />
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Enter quantity"
            value={quantity}
            onChange={handleContentChange}
            className="p-4 text-2xl focus:border-blue-400 rounded-2xl focus:outline-none border"
          />
          <input
            type="date"
            name="expiryDate"
            id="expiryDate"
            placeholder="Enter expiry date"
            value={expiryDate}
            onChange={handleContentChange}
            className="p-4 text-2xl focus:border-blue-400 rounded-2xl focus:outline-none border"
          />

          <button
            type="submit"
            className="px-16 py-8 border hover:bg-gray-300 text-2xl font-semibold bg-blue hover:bg-hoverBlue"
          >
            Submit
          </button>
        </form>
      </div> 
    </>
  )
}

export default InventoryModal
