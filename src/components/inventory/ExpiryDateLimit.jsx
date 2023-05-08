import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const ExpiryDateLimit = () => {
    const [expiryDate, setExpiryDate] = useState(null);

  return (
    <div className='col-span-3 md:col-span-2  border'>   
      <DatePicker className='outline-none p-2 w-full' placeholderText='Select expiry date limit' selected={expiryDate} onChange={date => setExpiryDate(date)} />
    </div>
  )
}

export default ExpiryDateLimit;
