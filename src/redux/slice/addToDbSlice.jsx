import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { db } from '../../firebase';
import {collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import authSlice from './authSlice';


const initialState = {
    product: ["hello"]
}

const addToDbSlice = createSlice({
    name: 'addToDb',
    initialState,
    reducers: {
        addProduct(state, action){
            const {name, expiryDate, brand} = action.payload;
            const productPresent = Array.isArray(state.product) && state.product.find(product => product.name === name && product.brand === brand && product.expiryDate === expiryDate )
            if(productPresent){
                productPresent.quantity = productPresent.quantity + action.payload.quantity;
            }
            else{
                state.product.push(action.payload);
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
    async (data, { getState }) => {
        const state = getState();
        console.log("Statef34f: ", state);
        // console.log("kejfwe", authSlice(state));
        const productList = state.addToDb.product;
        const docRef = doc(db, 'current_inventory', "5634");    
        await setDoc(docRef, {});
        // const subcollectionRef = collection(db, 'current_inventory', "5634", 'products' );
        const fullDate  = new Date();
        const dateString = fullDate.getFullYear() + "-" + fullDate.getMonth() + "-" + fullDate.getDay();
        productList.map(async product=>{
            try{
                console.log("Product: ", product)
                const {barcode, expiryDate} = product;
                const q = query(
                    collection(db, 'current_inventory', "5634", "products"),
                    where("category", "==", "Handwash"),
                    where("expiryDate", "==", expiryDate),
                    where("createdAt", "==", dateString)
                );
                const querySnapshot = await getDocs(q);
                if(querySnapshot.docs.length > 0){
                    console.log("Query snapshot: ", querySnapshot.docs[0].data());
                }
                else{
                    console.log("Snapshot doesnt exists");
                    // await addDoc(subcollectionRef, {...product, createdAt: dateString}) ;
                }
            }catch(error){
                console.log(error);
                // alert("Some error occured while adding the products to firebase");
            }
        })
      }    
)

export default addToDbSlice.reducer;
export const {addProduct, sendProductsToDb} = addToDbSlice.actions;
