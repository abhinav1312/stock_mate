import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showToUser: [],
    removeFromCurrInventory: []
}
const sellProductSlice = createSlice({
    name: "sellProduct",
    initialState,
    reducers: {
        sellProduct(state, action){
            const {name, brand, category, expiryDate, createdAt, quantity} = action.payload;
            const productPresent = state.showToUser.find(product=>
                product.name === name &&
                product.brand === brand &&
                product.category === category
            )
            if(productPresent){
                console.log("If conditon rendereddd")
                productPresent.quantity = productPresent.quantity + quantity;
            }
            else{
                console.log("Else conditon")
                const prdObject = action.payload;
                console.log("PRDOBJECT: ", prdObject)
                state.showToUser.push(prdObject);
            }

            const productInSoldInv = state.showToUser.find(product=>
                product.name === name &&
                product.brand === brand &&
                product.category === category &&
                product.expiryDate === expiryDate &&
                product.createdAt === createdAt
            )
            if(productInSoldInv){
                productInSoldInv.quantity = productInSoldInv.quantity + quantity;
            }
            else{
                state.removeFromCurrInventory.push(action.payload);
            } 
        }
    }
})

export default sellProductSlice.reducer;
export const {sellProduct} = sellProductSlice.actions;