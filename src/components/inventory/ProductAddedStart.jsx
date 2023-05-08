import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProductAddedStart = () => {
    const [startDate, setStartDate] = useState(null);

  return (
    <div className='col-span-3 md:col-span-2 border'>   
      <DatePicker className='outline-none w-full p-2' placeholderText='Product added start date' selected={startDate} onChange={date => setStartDate(date)} />
    </div>
  )
}
export default ProductAddedStart;
