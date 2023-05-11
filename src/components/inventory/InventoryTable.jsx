import React from 'react';

function formatDate(date) {
  const formatDate = new Date(
      date.seconds * 1000 + date.nanoseconds / 1000000
  );
  const formattedDate = formatDate.toLocaleDateString('en-us');
  const arr = formattedDate.split('/');
  const temp = arr[0];
  arr[0] = arr[1];
  arr[1] = temp;
  return arr.join('/');
}


const InventoryTable = ({productList}) => {
  return (
    <section>
      <h1 className="text-3xl mb-2">Products</h1>
      <p className='text-gray-400'>The date is in dd/mm/yyyy format </p>
      <div className="overflow-auto">
        <table className="w-full border-collapse py-4">
          <thead>
            <tr>
              <th className="w-1/12">Serial No.</th>
              <th className="w-3/12">Name</th>
              <th className="w-2/12">Brand</th>
              <th className="w-2/12">Category</th>
              <th className="w-1/12">Quantity</th>
              <th className="w-1/12">Added date</th>
              <th className="w-2/12">Expiry date</th>
            </tr>
          </thead>
          <tbody>
            {productList.length > 0 &&
              productList.map((product, id) => {
                const { name, quantity, category, brand, expiryDate, createdAt } = product;
                const addDateConv = formatDate(createdAt);
                const expDateConv = formatDate(expiryDate);
                return (
                  
                    <tr key={product.id}>
                      <td> {id + 1} </td>
                      <td> {name} </td>
                      <td> {brand} </td>
                      <td> {category} </td>
                      <td> {quantity} </td>
                      <td> {addDateConv} </td>
                      <td> {expDateConv} </td>
                    </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default InventoryTable;
