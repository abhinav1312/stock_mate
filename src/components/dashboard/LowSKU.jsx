import React from 'react';

const LowSKU = () => {
  return (
    <div className='p-8 rounded-md bg-white flex flex-col items-center justify-center'>
      <h3 className="text-lg font-medium mb-2">Low SKU products</h3>
      <table>
        <thead>
          <tr>
            <th>S no.</th>
            <th>Product name</th>
            <th>Quantity left</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Kitkat wafers</td>
            <td>24</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Vadila cookie crunch 110ml</td>
            <td>19</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Lays Cream and Onion</td>
            <td>16</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Bourbon biscuit 180gm</td>
            <td>15</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Britannia cake 80gn</td>
            <td>12</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LowSKU;
