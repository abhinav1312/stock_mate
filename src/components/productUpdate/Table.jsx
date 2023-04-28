import React from 'react'

const Table = () => {
  return (
    <section>
      <h1 className='text-3xl'>Recently Added Products</h1>
      <div className="overflow-auto">
      <table className='w-full border-collapse py-4'>
        <thead>
            <tr>
                <th className='w-1/12'>Serial No.</th>
                <th className='w-3/12'>Name</th>
                <th className='w-2/12'>Brand</th>
                <th className='w-2/12'>Category</th>
                <th className='w-1/12'>Quantity</th>
                <th className='w-2/12'>Expiry date</th>
                <th className='w-1/12'>Bar code</th>
            </tr>
        </thead>
        <tbody>

            <tr>
                <td>1</td>
                <td>Real juice 180ml</td>
                <td>Real</td>
                <td>Juice</td>
                <td>5</td>
                <td>{`${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`}</td>
                <td>Real barcode</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Real juice 180ml</td>
                <td>Real</td>
                <td>Juice</td>
                <td>5</td>
                <td>{`${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`}</td>
                <td>Real barcode</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Real juice 180ml</td>
                <td>Real</td>
                <td>Juice</td>
                <td>5</td>
                <td>{`${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`}</td>
                <td>Real barcode</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Real juice 180ml</td>
                <td>Real</td>
                <td>Juice</td>
                <td>5</td>
                <td>{`${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`}</td>
                <td>Real barcode</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Real juice 180ml</td>
                <td>Real</td>
                <td>Juice</td>
                <td>5</td>
                <td>{`${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`}</td>
                <td>Real barcode</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Real juice 180ml</td>
                <td>Real</td>
                <td>Juice</td>
                <td>5</td>
                <td>{`${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`}</td>
                <td>Real barcode</td>
            </tr>
        </tbody>
      </table>
      </div>
    </section>
  )
}

export default Table
