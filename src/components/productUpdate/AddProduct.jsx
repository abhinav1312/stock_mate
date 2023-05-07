import React, { useState } from 'react';
import BarcodeScanner from './BarcodeScanner';
import {addProductInProductInfo, findProductInProductInfo} from './firebaseFunctions.js'
import ProductInfoModal from './ProductInfoModal';
import InventoryModal from './InventoryModal';
import Table from './Table';
import { useDispatch } from 'react-redux';
import {addProduct} from '../../redux/slice/addToDbSlice'
import { startCase } from 'lodash';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [qrCodeText, setQRCodeText] = useState('');
  const [productDetail, setProductDetail] = useState({barcode: "", name:"", category: "", brand: "", quantity: null, expiryDate: ""})
  const [inventoryModal, setInventoryModal] = useState(false);
  const [productInfoModal, setProductInfoModal] = useState(false);

  const handleContentChange = (e) => {
    const {name, value} = e.target;
    setProductDetail(prev=> {
      return {...prev, [name]:value}
    })

  }

  // barcode scanned and product found in database
  // or after the product is added to database
  const inventoryInfoSubmit = (e) => {
    e.preventDefault();
    const dateString = new Date().toLocaleDateString('en-US');
    const date = new Date(dateString);
    console.log("Daate: ", date);
    
    const productDetailCopy = {
      ...productDetail,
      quantity: parseInt(productDetail.quantity),
      expiryDate: new Date(productDetail.expiryDate).toLocaleDateString('en-US')
    }
    if(productDetailCopy.quantity <=0 || productDetailCopy.quantity === null){
      alert("Please enter the quantity correctly.")
      return;
    }
    const expDate = new Date(productDetailCopy.expiryDate)
    console.log("EXP DATE: ", expDate);
    if(expDate < date){
      alert("Please enter products that are not expired");
      return;
    }
    dispatch(addProduct(productDetailCopy));
    setInventoryModal(false);
    setProductDetail({barcode: "", name:"", category: "", brand: "", quantity: null, expiryDate: ""});
  }

  // barcode scanned and product not found in database
  const productInfoSubmit = async (e) => {
    e.preventDefault();

    // removing white spaces and capitalizing the values
    const {name, category, brand} = productDetail;
    const nameCopy =  startCase(name.trim());
    const categoryCopy = startCase(category.trim());
    const brandCopy = startCase(brand.trim());
    if(nameCopy === '' || categoryCopy === ''  || brandCopy === ''){
      alert("Please fill all the required fields");
      return;
    }
    else{
      setProductDetail(prev=>{return {...prev, name: nameCopy, brand: brandCopy, category: categoryCopy}});
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

  // find product on barcode scan
  const getProductInfo = async (barcode) => {
    try{
      const data = await findProductInProductInfo(barcode);
      if(data){
        const{name, brand, category } = data;
        setProductDetail(prev=>{return{...prev, barcode, name, brand, category}});
        setInventoryModal(true);
      }
      else{
        setProductDetail(prev=>{return {...prev, barcode: barcode}});
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

      <QRCode
        id="qrCodeEl"
        size={150}
        value={productDetail}
        className='hidden'
      />
    </div>
    </>
  );
};

export default AddProduct;
