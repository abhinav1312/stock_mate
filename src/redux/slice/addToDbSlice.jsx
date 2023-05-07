import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { db } from '../../firebase';
import {addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

const addToDbSlice = createSlice({
    name: 'addToDb',
    initialState: [],
    reducers: {
        addProduct(state, action){
            const {name, expiryDate, brand} = action.payload;
            console.log("Stateefewwwww, ", state);
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
        const productList = state.addToDb;
        const docRef = doc(db, 'current_inventory', user);    
        await setDoc(docRef, {});
        const subcollectionRef = collection(db, 'current_inventory', user, 'products' );
        const date = new Date().toLocaleDateString('en-US');
        productList.map(async product=>{
            try{
                console.log("Product: ", product)
                const {barcode, expiryDate} = product;

                // query to check whther the same product is added the same day
                const q = query(
                    subcollectionRef,
                    where("barcode", "==",barcode ),
                    where("expiryDate", "==", expiryDate),
                    where("createdAt", "==", date)
                );
                const querySnapshot = await getDocs(q);
                if(querySnapshot.docs.length > 0){ // product added same  day
                    const docId = querySnapshot.docs[0].id;
                    const docRef = doc(db, "current_inventory", user, "products", docId )
                    const snapshotDetail = querySnapshot.docs[0].data();
                    console.log("Snapshot detail: ", snapshotDetail)
                    await setDoc(docRef, {...snapshotDetail, quantity: snapshotDetail.quantity + product.quantity});
                }
                else{ // this product not added today
                    await addDoc(subcollectionRef, {...product, createdAt: date}) ;
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
