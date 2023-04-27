import React from 'react';

const ProductInfoModal = ({productInfoSubmit, name, brand, category, handleContentChange}) => {
  return (
    <>
      <div className="absolute inset-0 opacity-80 bg-gray-300 flex justify-center items-center  h-full w-full"></div>
      <div className="relative  p-16 bg-white w-3/4 z-10">
        <h3 className="pb-4">
          Product not in database yet, please fill the details to add to
          database
        </h3>
        <form
          onSubmit={productInfoSubmit}
          className="flex flex-col justify-between gap-8"
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter product name"
            value={name}
            onChange={handleContentChange}
            className="p-4 text-2xl focus:outline-none border"
          />
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Enter product category for eg: Chips, biscuit, sauce, spread etc.."
            value={category}
            onChange={handleContentChange}
            className="p-4 text-2xl focus:outline-none border"
          />
          <input
            type="text"
            name="brand"
            id="brand"
            placeholder="Enter product brand"
            value={brand}
            onChange={handleContentChange}
            className="p-4 text-2xl focus:outline-none border"
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
  );
};

export default ProductInfoModal;
