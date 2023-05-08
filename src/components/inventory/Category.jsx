import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

const Category = ({handleCatChange}) => {
  const [categoryList, setCategoryList] = useState([]);
  
  useEffect(() => {
    const getData = async () => {
      const collectionRef = collection(
        db,
        'current_inventory',
        'nOpnwTQ0X7MH97366rGY3443SGr2',
        'categories'
      );
      const snapshot = await getDocs(collectionRef);
      snapshot.docs.map((snap) => {
        console.log(snap.id);
        return 1;
      });

      setCategoryList(
        snapshot.docs.map((snap) => {
          return snap.id;
        })
      );
    };

    getData();
  }, []);

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
