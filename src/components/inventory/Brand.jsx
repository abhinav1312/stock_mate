import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Cookies from 'js-cookie';
import { isEqual } from 'lodash';

const Brand = ({ handleBrandChange }) => {
  const [brandList, setBrandList] = useState([]);
  
  const brandListCookie = Cookies.get('brandList');
  useEffect(() => {
    const collectionRef = collection(
      db,
      'current_inventory',
      'nOpnwTQ0X7MH97366rGY3443SGr2',
      'brands'
    );
    const getData = async () => {
      if (brandListCookie){
        setBrandList([...JSON.parse(brandListCookie)]);
        console.log("brandListCookie", [...JSON.parse(brandListCookie)]);
        const snapshot = await getDocs(collectionRef);
        const snapShotArray = 
          snapshot.docs.map((snap) => {
            return snap.id;
          })
        const sameBrands = isEqual(snapShotArray, JSON.parse(brandListCookie));
        if(!sameBrands){
          setBrandList([...snapShotArray]);
          Cookies.set('brandList', JSON.stringify(snapShotArray))
        }
        // console.log("Smae snapshot array ", snapShotArray);
      }
      else{
        const snapshot = await getDocs(collectionRef);
        const snapshotArray = (snapshot.docs.map((snap) => {
          return snap.id;
        }))
        setBrandList([...snapshotArray]);
        Cookies.set('brandList', JSON.stringify(snapshotArray));
      }
    };
    getData();
  }, [brandListCookie]);

  return (
    <div className="col-span-3">
      <select
        className="border py-2 px-2 outline-none w-full"
        name="category"
        id="category"
        onChange={handleBrandChange}
      >
        <option value="Category1">--Select brand--</option>
        {brandList.length > 0 &&
          brandList.map((category, id) => {
            return (
              <option key={id} value={category}>
                {category}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Brand;
