import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { db } from '../../firebase';
import {} from 'firebase/firestore';
import {addProductsToInventory } from '../../components/productUpdate/firebaseFunctions';

// export const addProductsToDb = createAsyncThunk(
//     'addToDb/addProductsToDb',
//     async () => {
//         const batch = db.batch();
//     }
// )

const addToDbSlice = createSlice({
    name: 'addToDb',
    initialState:{
        productArray: [{name: "Hello", password:'123'}]
    },
    reducers: {
        addProduct(state, action){
            state.push(action.payload);
            console.log("Called");
        },
        sendProductsToDb(state, action){
            console.log(state.productArray.values)
            // const allProductAdded = addProductsToInventory(state.productArray);
            //     if(allProductAdded){
            //         alert("Product added");
            //         return [];
            //     }
            //     else alert("Error while adding products. Please try again");
            
        }
    }
})

export default addToDbSlice.reducer;
export const {addProduct, sendProductsToDb} = addToDbSlice.actions;
