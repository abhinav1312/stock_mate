import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCurrentInventory, sendProductsToDb } from '../../redux/slice/addToDbSlice';

const Table = () => {
	const dispatch = useDispatch();
    const data = useSelector(state=> {return state.addToDb})
    const addToDb = () => {
        dispatch(addProductToCurrentInventory());
    }
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
                <th className='w-2/12'>Category world</th>
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
			<div className="flex justify-end">
      	<button onClick={addToDb} className='px-6 py-4 bg-green-600 hover:bg-green-700 transition-all rounded-md text-white font-medium mt-4'>Add products</button>
			</div>
    </section>
  )
}

export default Table
