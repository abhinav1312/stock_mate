import React, { useState } from 'react';
import BarcodeScanner from './BarcodeScanner';
// import { useContext } from 'react';
// import AlertContext from '../../context/alert/AlertContext';
// import AddProductContext from '../../context/addProduct/ProductContext';
import {addProductInProductInfo, findProductInProductInfo} from './firebaseFunctions.js'
import ProductInfoModal from './ProductInfoModal';
import InventoryModal from './InventoryModal';

const AddProduct = () => {
  // const showAlert = useContext(AlertContext).showAlert;
  // const addProductContext = useContext(AddProductContext);
  // const addProductToProductInfo = addProductContext.addProductToProductInfo;
  // const setProductInfo = addProductContext.setProductInfo;
  // const productInfo = addProductContext.productInfo;
  // const [showProductInfoModal, setShowProductInfoModal] = useState(false);
  // const [userModal, setUserModal] = useState(false);

  // const [formContent, setFormContent] = useState({
  //   productName: '',
  //   productBrand: '',
  //   productCategory: '',
  // });

  // const handleFormContentChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormContent((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //     };
  //   });
  // };

  // const handleUserInputChange = (e) =>{
  //   const { name, value } = e.target;
  //   setProductInfo(prev=>{
  //     return {
  //       ...prev,
  //       [name]: value
  //     }

  //   })
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const name = formContent.productName.trim().toLowerCase();
  //   const category = formContent.productCategory.trim().toLowerCase();
  //   const brand = formContent.productBrand.trim().toLowerCase();
  //   if (name === '' || category === '' || brand === '') {
  //     showAlert('warning', 'Please full all the details');
  //     return;
  //   }

  //   setProductInfo((prev) => {
  //     return { ...prev, name, category, brand };
  //   });

  //   try {
  //     await addProductToProductInfo({ name, category, brand });
  //   } catch (error) {
  //     showAlert('warning', 'Error while adding product, please try again');
  //   }
  //   setShowProductInfoModal(false);
  //   setUserModal(true)
  // };

  // find whether the scanned product is in our product_info collection or not

  const [productDetail, setProductDetail] = useState({name:"", category: "", brand: "", quanity: 0, expiryDate: ""})
  const [inventoryModal, setInventoryModal] = useState(false);
  const [productInfoModal, setProductInfoModal] = useState(false);

  const handleContentChange = (e) => {
    const {name, value} = e.target;
    setProductDetail(prev=> {
      return {...prev, [name]:value}
    })
  }

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
      const added = await addProductInProductInfo({name: nameCopy, brand: brandCopy, category: categoryCopy});
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
    const data = await findProductInProductInfo(barcode);
    if(data){
      setInventoryModal(true);
    }
    else{
      setProductInfoModal(true);
    }
    // (barcode);
  }

  return (
    <>
      {/* <div className="add-product py-24">
        <BarcodeScanner setProductInfoModal={setShowProductInfoModal} setUserModal={setUserModal} />
      </div>

      {showProductInfoModal && (
        <div className="modal h-max w-1/3 bg-darkGrey absolute p-8 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="modal-title pb-4">
            <h3>
              Product not in database yet, please fill the details to add to
              database
            </h3>
          </div>
          <div className="modal-content">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between gap-4"
            >
              <input
                type="text"
                name="productName"
                id="productName"
                placeholder="Enter product name"
                value={formContent.productName}
                onChange={handleFormContentChange}
                className="p-4 text-2xl focus:outline-none"
              />
              <input
                type="text"
                name="productCategory"
                id="productCategory"
                placeholder="Enter product category for eg: Chips, biscuit, sauce, spread etc.."
                value={formContent.productCategory}
                onChange={handleFormContentChange}
                className="p-4 text-2xl focus:outline-none"
              />
              <input
                type="text"
                name="productBrand"
                id="productBrand"
                placeholder="Enter product brand"
                value={formContent.productBrand}
                onChange={handleFormContentChange}
                className="p-4 text-2xl focus:outline-none"
              />

              <button
                type="submit"
                className="px-16 py-8 text-2xl font-semibold text-white bg-blue hover:bg-hoverBlue"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {userModal &&
      <div className="modal h-max w-1/3 bg-darkGrey absolute p-8 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="modal-content">
        <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between gap-4"
            >
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter product name"
                value={productInfo.name}
                onChange={handleUserInputChange}
                className="p-4 text-2xl focus:outline-none"
              />
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Enter product brand"
                value={productInfo.brand}
                onChange={handleUserInputChange}
                className="p-4 text-2xl focus:outline-none"
              />
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Enter product category"
                value={productInfo.category}
                onChange={handleUserInputChange}
                className="p-4 text-2xl focus:outline-none"
              />
              <input
                type="number"
                name="quantity"
                id="quantity"
                placeholder="Enter product category"
                value={productInfo.quantity}
                onChange={handleUserInputChange}
                className="p-4 text-2xl focus:outline-none"
              />

              <label htmlFor="Expiry date" className='text-xl font-bold'> Enter expiry date </label>
              <input
                type="date"
                name="expiryDate"
                id="expiryDate"
                placeholder="Enter product expiry date"
                value={productInfo.expiryDate}
                onChange={handleUserInputChange}
                className="p-4 text-2xl focus:outline-none"
              />

              <button
                type="submit"
                className="px-16 py-8 text-2xl font-semibold text-white bg-blue hover:bg-hoverBlue"
              >
                Submit
              </button>
          </form>
        </div>
      </div>
      } */}
    <div>
      <BarcodeScanner getProductInfo={getProductInfo} />
      {productInfoModal && <ProductInfoModal productInfoSubmit = {productInfoSubmit} handleContentChange={handleContentChange} name={productDetail.name} brand={productDetail.brand} category={productDetail.category} /> }
      {inventoryModal && <InventoryModal />}
    </div>
    </>
  );
};

export default AddProduct;
