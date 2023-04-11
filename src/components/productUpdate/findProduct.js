import { db } from "../../firebase"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"

// find the product details from the database
const findProduct = async (barcode) => {
    try{
        const docRef = doc(collection(db, "product_info"), barcode);
        const snapshot = await getDoc(docRef);
        if(snapshot.exists()){
            console.log(snapshot.data())
            return ({data: snapshot.data(), present: true})
        }
        else{ // if product doesnt exist in bar code
            return ({present: false})
        }
    }
    catch(error){
        console.log("Error while checking scanning please try again! ", error)
        return false;
    }

}

const addProduct = async (barcode, productDetailObject) => {
    try{
        const productDocRef = doc(db, "product_info", barcode);
        await setDoc(productDocRef, productDetailObject);
    }
    catch(error){
        console.log("Some error occured")
        console.log(error)
    }
}

export {findProduct, addProduct}