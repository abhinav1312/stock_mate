import {createSlice} from '@reduxjs/toolkit'

const addToDbSlice = createSlice({
    name: 'addToDb',
    initialState: [],
    reducers: {
        addProduct(state, action){
            state.push(action.payload);
            console.log("Called");
        },
        sendProductsToDb(state, action){}
    }
})

export default addToDbSlice.reducer;
export const {addProduct} = addToDbSlice.actions;
