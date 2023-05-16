import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Category from '../inventory/Category';

const DashboardFilter = () => {
  const [expStartDt, setExpStartDt] = useState(null);
  const [expEndDt, setExpEndDt] = useState(null);
  const [selectedFilters, setSelectedFilers] = useState([]);
  const handleExpStart = (date) => {
    setExpStartDt(date);
    const timestampDate = Timestamp.fromDate(date);
    const expStartPresent = selectedFilters.find(
      (filter) => filter.id === 'expStart'
    );
    if (expStartPresent) {
      expStartPresent.value = timestampDate;
    } else {
      setSelectedFilers((prev) => {
        return [
          ...prev,
          {
            field: 'expiryDate',
            operator: '>=',
            value: timestampDate,
            id: 'expStart',
          },
        ];
      });
    }
  };
  const handleExpEnd = (date) => {
    setExpEndDt(date);
    const timestampDate = Timestamp.fromDate(date);
    const expEndPresent = selectedFilters.find(
      (filter) => filter.id === 'expEnd'
    );
    if (expEndPresent) {
      expEndPresent.value = timestampDate;
    } else {
      setSelectedFilers((prev) => {
        return [
          ...prev,
          {
            field: 'expiryDate',
            operator: '<=',
            value: timestampDate,
            id: 'expEnd',
          },
        ];
      });
    }
  };

  const handleCatChange = (e) => {
    // setCatSelected(e.target.value);
    if (e.target.value !== null && e.target.value !== 'null') {
      const catPresent = selectedFilters.find(
        (filter) => filter.id === 'category'
      );
      if (catPresent) {
        catPresent.value = e.target.value;
      } else {
        setSelectedFilers((prev) => {
          return [
            ...prev,
            {
              field: 'category',
              operator: '==',
              value: e.target.value,
              id: 'category',
            },
          ];
        });
      }
    } else {
      const catPresent = selectedFilters.find(
        (filter) => filter.id === 'category'
      );
      if (catPresent) {
        const newFilter = selectedFilters.filter(
          (filter) => filter.id !== 'category'
        );
        setSelectedFilers([...newFilter]);
      }
    }
  };
  return (
    <div className="grid md:grid-cols-3 gap-2 p-8 bg-white rounded-md mb-8">
      <div className="border border-black">
        <DatePicker
          className="outline-none p-2 w-full"
          placeholderText="Select expiry date limit"
          selected={expStartDt}
          name="expiryDate"
          onChange={handleExpStart}
        />
      </div>
      <div className="border border-black">
        <DatePicker
          className="outline-none p-2 w-full"
          placeholderText="Select expiry date limit"
          selected={expEndDt}
          name="expiryDate"
          onChange={handleExpEnd}
        />
      </div>
      <Category handleCatChange={handleCatChange} />
      <button className='btn-outline'>Reset</button>
      <button
          // onClick={()=>getProducts(selectedFilters)}
          className="fill col-span-2"
        >
          Filter
      </button>
    </div>
  );
};

export default DashboardFilter;
