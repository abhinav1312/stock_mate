export const addToDb = (productDetailObj) => {
    return (dispatch) => {
        dispatch({
            type: "ADD_TO_DB",
            payload: productDetailObj
        })
    }
}