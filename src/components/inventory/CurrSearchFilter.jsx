import React, { useState } from 'react';
import Category from './Category';
import Brand from './Brand';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import { Timestamp, collection, getDocs, query, where } from 'firebase/firestore';
import { format } from 'date-fns';
import { db } from '../../firebase';

const CurrSearchFilter = ({getProducts}) => {
  // const userId = useSelector(state=>{
  //   return state.auth.user;
  // })
  // const navigate = useNavigate();
  // eslint-disable-next-line
  const [catSelected, setCatSelected] = useState(null); // category selected by user
  // eslint-disable-next-line
  const [brandSelected, setBrandSelected] = useState(null); // category selected by user
  const [expStartDt, setExpStartDt] = useState(null);
  const [expEndDt, setExpEndDt] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedFilters, setSelectedFilers] = useState([]);
  // const [productList, setProductList] = useState([]);

  // const sendReq = async () => {
  //   // console.log("getData called")
  //   // if(!userId){
  //   //   alert("Please login to continue..")
  //   //   navigate('/');
  //   //   return;
  //   // }
  //   // const collectionRef = collection(db, 'current_inventory', userId, "products");
  //   // const initialQuery = (collectionRef);

  //   // const dynamicQuery = selectedFilters.reduce((acc, whereCondition) => {
  //     // const { field, operator, value } = whereCondition;
  //     // return query(acc, where(field, operator, value));
  //   // }, initialQuery);


  //   // const data = await getDocs(dynamicQuery);
  //   // const productArray = data.docs.map(doc=>{return {id:doc.id, ...doc.data()}});
  //   // console.log(productArray)
  //   // setProductList(data.docs.map(doc=>{return {id:doc.id, ...doc.data()}}))
  // }
  const handleExpStart = (date) => {
    setExpStartDt(date);
    const timestampDate = Timestamp.fromDate(date)
    const expStartPresent = selectedFilters.find(
      (filter) => filter.id === 'expStart'
    );
    if (expStartPresent) {
      expStartPresent.value = timestampDate;
    } else {
      setSelectedFilers((prev) => {
        return [...prev, { field: 'expiryDate', operator: ">=",  value: timestampDate, id:"expStart"}];
      });
    }
  };
  const handleExpEnd = (date) => {
    setExpEndDt(date);
    const timestampDate = Timestamp.fromDate(date)
    const expEndPresent = selectedFilters.find(
      (filter) => filter.id === 'expEnd'
    );
    if (expEndPresent) {
      expEndPresent.value = timestampDate;
    } else {
      setSelectedFilers((prev) => {
        return [...prev, { field: 'expiryDate', operator: "<=",  value: timestampDate, id:"expEnd"}];
      });
    }
  };
  const handleEndDate = (date) => {
    setEndDate(date);
    const timestampDate = Timestamp.fromDate(date)
    const endDatePresent = selectedFilters.find(
      (filter) => filter.id === 'endDate'
    );
    if (endDatePresent) {
      endDatePresent.value = timestampDate;
    } else {
      setSelectedFilers((prev) => {
        return [...prev, { field: 'createdAt', operator: "<=",  value: timestampDate, id: "endDate"}];
      });
    }
  };
  const handleStartDate = (date) => {
    setStartDate(date);
    const timestampDate = Timestamp.fromDate(date)
    const startDatePresent = selectedFilters.find(
      (filter) => filter.id === 'startDate'
    );
    if (startDatePresent) {
      startDatePresent.value = timestampDate;
    } else {
      setSelectedFilers((prev) => {
        return [...prev, { field: 'createdAt', operator: ">=",  value: timestampDate, id: "startDate"}];
      });
    }
  };
  const handleCatChange = (e) => {
    setCatSelected(e.target.value);
    if (e.target.value !== null && e.target.value !== 'null' ) {
      const catPresent = selectedFilters.find(
        (filter) => filter.id === 'category'
      );
      if (catPresent) {
        catPresent.value = e.target.value;
      } else {
        setSelectedFilers((prev) => {
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
    if (e.target.value !== null && e.target.value !== 'null' ) {
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
      <div className="grid grid-cols-2 gap-4">
        <Category handleCatChange={handleCatChange} />
        <Brand handleBrandChange={handleBrandChange} />

        {/* expiry date start date  */}
        <div className="border border-black">
          <DatePicker
            className="outline-none p-2 w-full"
            placeholderText="Select expiry date limit"
            selected={expStartDt}
            name="expiryDate"
            onChange={handleExpStart}
          />
        </div>

        {/* expiry date end date  */}
        <div className="border border-black">
          <DatePicker
            className="outline-none p-2 w-full"
            placeholderText="Select expiry date limit"
            selected={expEndDt}
            name="expiryDate"
            onChange={handleExpEnd}
          />
        </div>

        {/* product added lower limit  */}
        <div className="border border-black">
          <DatePicker
            className="outline-none w-full p-2"
            placeholderText="Product added start date"
            selected={startDate}
            // onChange={(date) => setStartDate(date)}
            onChange={handleStartDate}
          />
        </div>

        {/* product added upper limit  */}
        <div className="border border-black">
          <DatePicker
            className="outline-none w-full p-2"
            placeholderText="Product added end date"
            selected={endDate}
            // onChange={(date) => setEndDate(date)}
            onChange={handleEndDate}
          />
        </div>
        <button
          onClick={()=>getProducts(selectedFilters)}
          className="border col-span-2 p-2 bg-green-600 font-medium text-center"
        >
          Filter
        </button>
      </div>
    </section>
  );
};

export default CurrSearchFilter;
