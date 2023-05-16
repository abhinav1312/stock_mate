import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

const initialState = {
  showToUser: [],
  removeFromCurrInventory: [],
};
const sellProductSlice = createSlice({
  name: 'sellProduct',
  initialState,
  reducers: {
    sellProduct(state, action) {
      const { name, brand, category, expiryDate, createdAt, quantity } =
        action.payload;
      const productPresent = state.showToUser.find(
        (product) =>
          product.name === name &&
          product.brand === brand &&
          product.category === category
      );
      if (productPresent) {
        productPresent.quantity = productPresent.quantity + quantity;
      } else {
        state.showToUser.push(action.payload);
      }

      const productInRemInv = state.removeFromCurrInventory.find(
        (product) =>
          product.name === name &&
          product.brand === brand &&
          product.category === category &&
          product.expiryDate === expiryDate &&
          product.createdAt === createdAt
      );
      if (productInRemInv) {
        productInRemInv.quantity = productInRemInv.quantity + quantity;
      } else {
        state.removeFromCurrInventory.push(action.payload);
      }
    },
  },
});

export const removeFromCurrInventory = createAsyncThunk(
  'removeFromCurrInventory',
  async (navigate, { getState }) => {
    console.log('removeFromCurrInventory called');
    const state = getState();
    const { user } = state.auth;
    if (!user) {
      alert('Please login to continue');
      navigate('/');
      return;
    }

    const productList = state.sellProduct.removeFromCurrInventory;
    if(productList.length <= 0){
      alert("Please add the products and try again.")
    }
    const docRef = doc(db, 'sold_inventory', user);
    await setDoc(docRef, {});
    productList.map(async (product) => {
      const { name, brand, category, expiryDate, createdAt, quantity } =
        product;

      const expDate = new Date(Date.parse(expiryDate));
      expDate.setHours(0, 0, 0, 0);
      const expTimestamp = Timestamp.fromDate(expDate);
      console.log('Exttmp: ', expTimestamp);

      const createdAtDate = new Date(
        Date.parse(createdAt.split('/').reverse().join('/'))
      );
      createdAtDate.setHours(0, 0, 0, 0);
      const createdAtTimestamp = Timestamp.fromDate(createdAtDate);
      console.log('Creatmp: ', createdAtTimestamp);
      const soldCollectionRef = collection(
        db,
        'sold_inventory',
        user,
        'products'
      );
      const currCollectionRef = collection(
        db,
        'current_inventory',
        user,
        'products'
      );

      const q = query(
        currCollectionRef,
        where('name', '==', name),
        where('brand', '==', brand),
        where('category', '==', category),
        where('expiryDate', '==', expTimestamp),
        where('createdAt', '==', createdAtTimestamp)
      );

      try {
        const snapshot = await getDocs(q);
        if (snapshot.docs.length > 0) {
          console.log('snapshot.docs.length > 0');
          const productDetail = snapshot.docs[0].data();
          const productId = snapshot.docs[0].id;
          const totalQuantity = productDetail.quantity;
          if (totalQuantity >= quantity) {
            console.log('totalQuantity >= quantity');
            try {
              const currInvProdDocRef = doc(
                db,
                'current_inventory',
                user,
                'products',
                productId
              );
              await setDoc(currInvProdDocRef, {
                ...productDetail,
                quantity: totalQuantity - quantity,
              });
              console.log('Product quanitity decreased');
              const currDateString = new Date().toLocaleDateString();
              const currDate = new Date(
                Date.parse(currDateString.split('/').reverse().join('/'))
              );
              currDate.setHours(0, 0, 0, 0);
              const currTimestamp = Timestamp.fromDate(currDate);
              const q = query(
                soldCollectionRef,
                where('name', '==', name),
                where('brand', '==', brand),
                where('category', '==', category),
                where('expiryDate', '==', expiryDate),
                where('createdAt', '==', createdAt),
                where('soldAt', '==', currTimestamp)
              );
              const queriedProduct = await getDocs(q);
              console.log('Sold invenrtory queried');
              if (queriedProduct.docs.length > 0) {
                console.log('queriedProduct.docs.length > 0');
                const productDetail = queriedProduct.docs[0].data();
                const productId = queriedProduct.docs[0].id;
                const ref = doc(
                  db,
                  'sold_inventory',
                  user,
                  'products',
                  productId
                );
                await setDoc(ref, {
                  ...productDetail,
                  quantity: productDetail.quantity + quantity,
                });
              } else {
                console.log('else queriedProduct.docs.length < 0');
                const ref = collection(db, 'sold_inventory', user, 'products');
                await addDoc(ref, {
                  ...product,
                  createdAt: createdAtTimestamp,
                  expiryDate: expTimestamp,
                  soldDate: currTimestamp,
                });
                console.log('Successfully added to sold inventory');
              }
            } catch (error) {
              console.log('Error');
              console.log(error);
            }
          } else {
            console.log('Quantity less');
          }
        } else {
          console.log('No product found');
        }
      } catch (error) {
        alert('Some error coccured while searching. Please try again');
        console.log(error);
      }
    });
  }
);
export default sellProductSlice.reducer;
export const { sellProduct } = sellProductSlice.actions;
