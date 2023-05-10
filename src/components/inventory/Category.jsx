import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Cookies from 'js-cookie';
import { isEqual } from 'lodash';

const Category = ({handleCatChange}) => {
  const [categoryList, setCategoryList] = useState([]);

  const catListCookie = Cookies.get('catList');
  useEffect(() => {
    const collectionRef = collection(
      db,
      'current_inventory',
      'nOpnwTQ0X7MH97366rGY3443SGr2',
      'categories'
    );
    const getData = async () => {
      if (catListCookie){
        setCategoryList([...JSON.parse(catListCookie)]);
        console.log("catListCookie", [...JSON.parse(catListCookie)]);
        const snapshot = await getDocs(collectionRef);
        const snapShotArray = 
          snapshot.docs.map((snap) => {
            return snap.id;
          })
        const sameBrands = isEqual(snapShotArray, JSON.parse(catListCookie));
        if(!sameBrands){
          setCategoryList([...snapShotArray]);
          Cookies.set('brandList', JSON.stringify(snapShotArray))
        }
        // console.log("Smae snapshot array ", snapShotArray);
      }
      else{
        const snapshot = await getDocs(collectionRef);
        const snapshotArray = (snapshot.docs.map((snap) => {
          return snap.id;
        }))
        setCategoryList([...snapshotArray]);
        Cookies.set('brandList', JSON.stringify(snapshotArray));
      }
    };
    getData();
  }, [catListCookie]);

  return (
    <div className='col-span-3'>
      <select
        className="border py-2 px-2 outline-none w-full"
        name="category"
        id="category"
        onChange={handleCatChange}
      >
        <option value={null}>--Select category--</option>
        {categoryList.length > 0 &&
          categoryList.map((category, id) => {
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

export default Category;
