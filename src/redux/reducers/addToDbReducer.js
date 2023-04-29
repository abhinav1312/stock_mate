const initialProductState = {
    productList: []
};
const reducer = (state=initialProductState, action) => {
    if(action.type==="ADD_TO_DB"){
        return {
            ...state,
            productList: [ action.payload , ...state.productList]
        }
    }
}

export default reducer;