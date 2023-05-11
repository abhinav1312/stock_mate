import React, { useState } from 'react'
import CurrSearchFilter from './CurrSearchFilter';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase';
import InventoryTable from './InventoryTable';


const CurrInventory = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);

  const userId = useSelector(state=>{
    return state.auth.user;
  })

  const getProducts = async (selectedFilters) => {

    console.log("getData called", selectedFilters);
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

    const data = await getDocs(dynamicQuery);
    const productArray = data.docs.map(doc=>{return {id:doc.id, ...doc.data()}});
    console.log(productArray)
    setProductList(data.docs.map(doc=>{return {id:doc.id, ...doc.data()}}))
  }
  return (
    <>    
      <CurrSearchFilter getProducts={getProducts} />
      <InventoryTable productList={productList} />
      


    </>
  )
}

export default CurrInventory;

