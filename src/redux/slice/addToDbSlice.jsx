import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { db } from '../../firebase';
import { Timestamp } from 'firebase/firestore';

import 'firebase/firestore';
import {addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

const addToDbSlice = createSlice({
    name: 'addToDb',
    initialState: [],
    reducers: {
        addProduct(state, action){
            const {name, expiryDate, brand} = action.payload;
            const productPresent = state.find(product => product.name === name && product.brand === brand && product.expiryDate === expiryDate )
            if(productPresent){
                productPresent.quantity = productPresent.quantity + action.payload.quantity;
            }
            else{
                state.push(action.payload);
            }
        },
        sendProductsToDb({getState}){
            const st = getState();
            console.log("St: ", st);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addProductToCurrentInventory.fulfilled, ()=>{
            return [];
        })
        builder.addCase(addProductToCurrentInventory.rejected, (state, error)=>{
            console.log("Errorrr: ", error)
        })
        
    }
})

// redux thunk to add product to current_inventory
export const addProductToCurrentInventory = createAsyncThunk(
    'addToFirebase',
    async (navigate, { getState }) => {
        const state = getState();
        const {user} = getState().auth
        if(!user){
            alert("Please login to continue");
            navigate('/');
            return;
        }
        console.log("running");
        const productList = state.addToDb;
        const docRef = doc(db, 'current_inventory', user);    
        await setDoc(docRef, {});
        const productCollectionRef = collection(db, 'current_inventory', user, 'products' );
        const categoryCollectionRef = collection(db, 'current_inventory', user, 'categories' );
        const brandCollectionRef = collection(db, 'current_inventory', user, 'brands' );

        const currDateString = new Date().toLocaleDateString();
        const currDate = new Date(Date.parse(currDateString.split('/').reverse().join('/')));
        currDate.setHours(0, 0, 0, 0);
        console.log("Cureeeer;  ", currDate)
        const currTimestamp = Timestamp.fromDate(currDate);
        console.log("Runinngggg")
        // const currTimestamp = Timestamp.fromDate(currDate);
        console.log("Curr tiemstamp: ", currTimestamp);
        productList.map(async product=>{
            try{
                const {barcode, expiryDate, category, brand} = product;
                const categoryDocRef = doc(db, 'current_inventory', user, 'categories', category);
                const brandDocRef = doc(db, 'current_inventory', user, 'brands', brand );
                const expDate = new Date(Date.parse(expiryDate));
                expDate.setHours(0, 0, 0, 0);
                const expTimestamp = Timestamp.fromDate(expDate)
                // query to check whther the same product is added the same day
                const q = query(
                    productCollectionRef,
                    where("barcode", "==",barcode ),
                    where("expiryDate", "==", expTimestamp),
                    where("createdAt", "==", currTimestamp)
                );
                const querySnapshot = await getDocs(q);
                if(querySnapshot.docs.length > 0){ // product added same  day
                    const docId = querySnapshot.docs[0].id;
                    const docRef = doc(db, "current_inventory", user, "products", docId )
                    const snapshotDetail = querySnapshot.docs[0].data();
                    console.log("Snapshot detail: ", snapshotDetail)
                    // await setDoc(docRef, {...snapshotDetail, quantity: snapshotDetail.quantity + product.quantity, expiryDate: Timestamp.fromDate(snapshotDetail.expiryDate)});
                    await setDoc(docRef, {...snapshotDetail, quantity: snapshotDetail.quantity + product.quantity});
                }
                else{ // this product not added today
                    await addDoc(productCollectionRef, {...product, createdAt: currTimestamp});
                    await addDoc(productCollectionRef, {...product, createdAt: currTimestamp, expiryDate: expTimestamp});
                    await setDoc(categoryDocRef, {name: category})
                    await setDoc(brandDocRef, {name: brand})
                }
            }catch(error){
                console.log(error);
                alert("Some error occured while adding the products to firebase");
            }
        })
      }    
)

export default addToDbSlice.reducer;
export const {addProduct, sendProductsToDb} = addToDbSlice.actions;
