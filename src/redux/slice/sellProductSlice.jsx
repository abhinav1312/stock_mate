import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
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

const removeFromCurrInventory = createAsyncThunk(
  'removeFromCurrInventory',
  async (navigate, { getState }) => {
    const state = getState();
    const { user } = state.auth;
    if (!user) {
      alert('Please login to continue');
      navigate('/');
      return;
    }

    const productList = state.sellProduct.removeFromCurrInventory;
		const docRef = doc(db, 'sold_inventory', user);    
		await setDoc(docRef, {});
    productList.map(async (product) => {
      const { name, brand, category, expiryDate, createdAt, quantity } =
        product;
      const soldCollectionRef = doc(db, 'sold_inventory', user, 'products');
      const currCollectionRef = doc(db, 'curr_inventory', user, 'products');

      const q = query(
        currCollectionRef,
        where('name', '==', name),
        where('brand', '==', brand),
        where('category', '==', category),
        where('expiryDate', '==', expiryDate),
        where('createdAt', '==', createdAt)
      );

      try {
        const snapshot = await getDocs(q);
        if (snapshot.docs.length > 0) {
          const productDetail = snapshot.docs[0].data();
          const productId = snapshot.docs[0].id;
          const totalQuantity = productDetail.quantity;
          if (totalQuantity >= quantity) {
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
							const currTimestamp = Timestamp.fromDate(new Date());
							const q = query(
								soldCollectionRef,
								where("name" === name),
								where("brand" === brand),
								where("category" === category),
								where("expiryDate" === expiryDate),
								where("createdAt" === createdAt),
								where("soldAt" === currTimestamp),
							)
							const queriedProduct = await getDocs(q);
							if(queriedProduct.docs.length > 0){
								const productDetail =  queriedProduct.docs[0].data();
								const productId = queriedProduct.docs[0].id;
								const ref = doc(db, 'sold_inventory', user, 'products', productId)
								await setDoc(ref, {...productDetail, quantity: productDetail.quantity+quantity});
							}
							else{
								const ref = collection(db, 'sold_inventory', user, 'products')
								await addDoc(ref, product);
							}
            } catch (error) {
              console.log('Error');
            }
          }
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
