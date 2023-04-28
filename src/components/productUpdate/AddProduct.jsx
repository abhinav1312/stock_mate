import React, { useState } from 'react';
import BarcodeScanner from './BarcodeScanner';
import {addProductInProductInfo, findProductInProductInfo} from './firebaseFunctions.js'
import ProductInfoModal from './ProductInfoModal';
import InventoryModal from './InventoryModal';
import Table from './Table';

const AddProduct = () => {

  const [productDetail, setProductDetail] = useState({barcode: "", name:"", category: "", brand: "", quantity: 0, expiryDate: ""})
  const [inventoryModal, setInventoryModal] = useState(false);
  const [productInfoModal, setProductInfoModal] = useState(false);

  const handleContentChange = (e) => {
    const {name, value} = e.target;
    setProductDetail(prev=> {
      return {...prev, [name]:value}
    })
  }

  const inventoryInfoSubmit = () => {}

  const productInfoSubmit = async (e) => {
    e.preventDefault();
    const {name, category, brand} = productDetail;
    const nameCopy = name.trim();
    const categoryCopy = category.trim();
    const brandCopy = brand.trim();
    if(nameCopy === '' || categoryCopy === ''  || brandCopy === ''){
      alert("Please fill all the required fields");
      return;
    }
    else{
      const added = await addProductInProductInfo({barcode: productDetail.barcode, name: nameCopy, brand: brandCopy, category: categoryCopy});
      if(added){
        setProductInfoModal(false);
        setInventoryModal(true);
      }
      else{
        alert("Error while finding product from the barcode scan. Please try again");
      }
    }
  }

  const getProductInfo = async (barcode) => {
    try{
      const data = await findProductInProductInfo(barcode);
      if(data){
        console.log(data);
        const{productName: name, barcode, productBrand:brand, productCategory: category } = data;
        setProductDetail(prev=>{return{...prev, name, barcode, brand, category}});
        setInventoryModal(true);
      }
      else{
        setProductDetail(prev=> {return{...prev, barcode: barcode}})
        setProductInfoModal(true);
      }
  }catch(error){
      alert("Some error occured while getting product details. \n Please try again");
    }
  }

  return (
    <>
    <div>
      <BarcodeScanner getProductInfo={getProductInfo} />
      {productInfoModal && <ProductInfoModal productInfoSubmit = {productInfoSubmit} handleContentChange={handleContentChange} name={productDetail.name} brand={productDetail.brand} category={productDetail.category} /> }
      {inventoryModal && <InventoryModal inventoryInfoSubmit = {inventoryInfoSubmit} handleContentChange={handleContentChange} name={productDetail.name} brand={productDetail.brand} category={productDetail.category} expiryDate={productDetail.expiryDate} quantity={productDetail.quantity} />}
      <Table />
    </div>
    </>
  );
};

export default AddProduct;
