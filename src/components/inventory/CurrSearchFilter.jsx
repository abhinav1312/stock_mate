import React, { useState } from 'react';
import Category from './Category';
import Brand from './Brand';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { format } from 'date-fns';
import { db } from '../../firebase';

const CurrSearchFilter = () => {
  const userId = useSelector(state=>{
    return state.auth.user;
  })
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [catSelected, setCatSelected] = useState(null); // category selected by user
  // eslint-disable-next-line
  const [brandSelected, setBrandSelected] = useState(null); // category selected by user
  const [expiryDate, setExpiryDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedFilters, setSelectedFilers] = useState([]);
  const [productList, setProductList] = useState([]);

  const getData = async () => {
    if(!userId){
      alert("Please login to continue..")
      navigate('/');
      return;
    }
    const collectionRef = collection(db, 'current_inventory', userId, "products");
    const initialQuery = (collectionRef);

    const dynamicQuery = selectedFilters.reduce((acc, whereCondition) => {
      const { field, operator, value } = whereCondition;
      return query(acc, where(field, operator, value));
    }, initialQuery);

    console.log("Dynamic query: ", dynamicQuery)
    
    // setProductList(snapshot.docs.map(snap=>{return snap.data()}))
  }

  console.log("ProductList", productList);

  const handleExpChange = (date) => {
    // setExpiryDate(date);

    // const expDatePresent = selectedFilters.find(
    //   (filter) => filter.id === 'expLimit'
    // );
    // if (expDatePresent) {
    //   expDatePresent.value = date;
    // } else {
    //   setSelectedFilers((prev) => {
    //     return [...prev, { field: 'expiryDate', operator: "==",  value: date, id:"expLimit"}];
    //   });
    // }
  };
  const handleEndDate = (date) => {
    // setEndDate(date);
    // const endDatePresent = selectedFilters.find(
    //   (filter) => filter.id === 'endDate'
    // );
    // if (endDatePresent) {
    //   endDatePresent.value = date;
    // } else {
    //   setSelectedFilers((prev) => {
    //     // return [...prev, { endDate: date, id: 'endDate' }];
    //     return [...prev, { field: 'createdAt', operator: "==",  value: date, id: "endDate"}];
    //   });
    // }
  };
  const handleStartDate = (date) => {
    // setStartDate(date);
    // const startDatePresent = selectedFilters.find(
    //   (filter) => filter.id === 'startDate'
    // );
    // if (startDatePresent) {
    //   startDatePresent.value = date;
    // } else {
    //   setSelectedFilers((prev) => {
    //     return [...prev, { field: 'createdAt', operator: ">=",  value: date, id: "startDate"}];
    //   });
    // }
  };
  const handleCatChange = (e) => {
    setCatSelected(e.target.value);
    if (e.target.value !== null) {
      const catPresent = selectedFilters.find(
        (filter) => filter.id === 'category'
      );
      if (catPresent) {
        catPresent.value = e.target.value;
      } else {
        setSelectedFilers((prev) => {
          // return [...prev, { category: e.target.value, id: 'category' }];
          return [...prev, { field: 'category', operator: "==",  value: e.target.value, id: "category"}];
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

  const handleBrandChange = (e) => {
    setBrandSelected(e.target.value);
    if (e.target.value !== null) {
      const brandPresent = selectedFilters.find(
        (filter) => filter.id === 'brand'
      );
      if (brandPresent) {
        brandPresent.value = e.target.value;
      } else {
        setSelectedFilers((prev) => {
          return [...prev, { field: 'brand', operator: "==",  value: e.target.value, id: "brand"}];
        });
      }
    } else {
      const brandPresent = selectedFilters.find(
        (filter) => filter.id === 'brand'
      );
      if (brandPresent) {
        const newFilter = selectedFilters.filter(
          (filter) => filter.id !== 'brand'
        );
        setSelectedFilers([...newFilter]);
      }
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Category handleCatChange={handleCatChange} />
        <Brand handleBrandChange={handleBrandChange} />

        {/* expiry date limit  */}
        <div className="col-span-3 md:col-span-2  border">
          <DatePicker
            className="outline-none p-2 w-full"
            placeholderText="Select expiry date limit"
            selected={expiryDate}
            name="expiryDate"
            onChange={handleExpChange}
          />
        </div>

        {/* product added lower limit  */}
        <div className="col-span-3 md:col-span-2 border">
          <DatePicker
            className="outline-none w-full p-2"
            placeholderText="Product added start date"
            selected={startDate}
            // onChange={(date) => setStartDate(date)}
            onChange={handleStartDate}
          />
        </div>

        {/* product added upper limit  */}
        <div className="col-span-3 md:col-span-2 border">
          <DatePicker
            className="outline-none w-full p-2"
            placeholderText="Product added end date"
            selected={endDate}
            // onChange={(date) => setEndDate(date)}
            onChange={handleEndDate}
          />
        </div>
        <button
          onClick={getData}
          className="border md:col-span-6 p-2 bg-green-600 font-medium text-center"
        >
          Filter
        </button>
      </div>
    </section>
  );
};

export default CurrSearchFilter;
