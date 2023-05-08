import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProductAddedEnd = () => {
    const [endDate, setEndDate] = useState(null);

  return (
    <div className='col-span-3 md:col-span-2 border'>   
      <DatePicker className='outline-none w-full p-2' placeholderText='Product added end date' selected={endDate} onChange={date => setEndDate(date)} />
    </div>
  )
}

export default ProductAddedEnd;
