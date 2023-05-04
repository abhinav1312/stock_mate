import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCurrentInventory } from '../../redux/slice/addToDbSlice';

const Table = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => {
    return state.addToDb;
  });
  const addToDb = () => {
    dispatch(addProductToCurrentInventory());
  };
  return (
    <section>
      <h1 className="text-3xl mb-2">Recently Added Products</h1>
      <div className="overflow-auto">
        <table className="w-full border-collapse py-4">
          <thead>
            <tr>
              <th className="w-1/12">Serial No.</th>
              <th className="w-3/12">Name</th>
              <th className="w-2/12">Brand</th>
              <th className="w-2/12">Category world</th>
              <th className="w-1/12">Quantity</th>
              <th className="w-2/12">Expiry date</th>
              <th className="w-1/12">Bar code</th>
            </tr>
          </thead>
          <tbody>
            {productList.length > 0 &&
              productList.map((product, id) => {
                const { name, quantity, category, brand, expiryDate } = product;
                return (
                  <tr key={id}>
                    <td> {id + 1} </td>
                    <td> {name} </td>
                    <td> {brand} </td>
                    <td> {category} </td>
                    <td> {quantity} </td>
                    <td> {expiryDate} </td>
                    <td> Barcode </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button
          onClick={addToDb}
          className="px-6 py-4 bg-green-600 hover:bg-green-700 transition-all rounded-md text-white font-medium mt-4"
        >
          Add to database
        </button>
      </div>
    </section>
  );
};

export default Table;
