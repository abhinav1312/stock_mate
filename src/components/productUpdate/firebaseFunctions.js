import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../../firebase";

export const findProductInProductInfo = async (barcode) => {
    const docRef = doc(db, 'product_info', barcode);
    try{
        const snapshot = await getDoc(docRef);
        if(snapshot.exists()){
            return (snapshot.data());
        }
        return null;
    }
    catch(error){
        return null;
    }
}

export const addProductInProductInfo = async (productObj) => {
    console.log("ProductOBJ: ", productObj)
    const productDocRef = doc(db, 'product_info', productObj.barcode);
    try{
        await setDoc(productDocRef, productObj);
        return true;
    }
    catch(error){
        alert("Error while adding product to database. Please try again !");
        return false;
    }
}