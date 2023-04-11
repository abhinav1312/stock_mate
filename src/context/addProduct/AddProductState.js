import { useState, useContext } from "react";
import { db } from "../../firebase"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import AddProductContext from "./AddProductContext";
import AlertContext from "../alert/AlertContext";

const AddProductState = (props) => {
    const alertContext = useContext(AlertContext);
    const showAlert = alertContext.showAlert;
    const [productInfo, setProductInfo] = useState({
        name:"",
        category: "",
        brand: "",
        barcode: "",
        expiryDate: new Date(),
        quantity: ""
    })

    const findProductInProductInfo = async (barcode) => {
      if(barcode.length === 0) {
        showAlert("error", "Barcode not defined, please try again")
        return;
      }
      try{
          const docRef = doc(collection(db, "product_info"), barcode);

          //check prpduct exists
          const snapshot = await getDoc(docRef);
          if(snapshot.exists()){
              return ({data: snapshot.data(), present: true})
          }
          else{ // if product doesnt exist in bar code
              return ({present: false})
          }
      }
      catch(error){
        showAlert("error", "Error while checking scanning please try again! ")
          return false;
      }
  }

  const addProductToProductInfo = async (productDetailObject) => {
    try{
        const productDocRef = doc(db, "product_info", productInfo.barcode);
        await setDoc(productDocRef, productDetailObject);
    }
    catch(error){
      console.log(error)
      showAlert("error", "Some error occured. Please try again")
    }
}


  return (
    <>
        <AddProductContext.Provider value={{productInfo, setProductInfo, findProductInProductInfo, addProductToProductInfo}}>
            {props.children}
        </AddProductContext.Provider> 
    </>
  )
}

export default AddProductState
