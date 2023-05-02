import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { db } from '../../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import {addProductsToInventory } from '../../components/productUpdate/firebaseFunctions';

const addToDbSlice = createSlice({
    name: 'addToDb',
    initialState:[],
    reducers: {
        addProduct(state, action){
            state.push(action.payload);
        },
        sendProductsToDb(action, {getState}){
            const st = getState();
            console.log("St: ", st);
        }
    }
})

export const addProductToCurrentInventory = createAsyncThunk(
    'addToDb/addToFirebase',
    async (data, { getState }) => {
        const state = getState();
        console.log("State: ", state.addToDb)
        const docRef = doc(db, 'current_inventory', "5634");    
        await setDoc(docRef, {});
        const subcollectionRef = collection(db, 'current_inventory', "5634", 'products' );
        try{
            await addDoc(subcollectionRef, {...state.addToDb[0]})
        }catch(error){
            console.log("Errorrr: " ,error);
        }
        // return docRef.id;
      }    
)

export default addToDbSlice.reducer;
export const {addProduct, sendProductsToDb} = addToDbSlice.actions;
