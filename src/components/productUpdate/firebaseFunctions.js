import { addDoc, collection, doc, getDoc } from "firebase/firestore"
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
    const collectionRef = collection(db, 'product_info');
    try{
        await addDoc(collectionRef, productObj);
        return true;
    }
    catch(error){
        alert("Error while adding product to database. Please try again !");
        return false;
    }
}