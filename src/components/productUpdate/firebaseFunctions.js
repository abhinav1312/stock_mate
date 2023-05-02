import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "../../firebase";

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

export const addProductsToInventory = (productArray) => {
    console.log("Array: ",productArray)
    const {currentUser} = auth;
    // user not signed in
    if(!currentUser){
        return false;
    }
    const subcollectionRef = collection(db, 'current_inventory', currentUser.uid, 'products');
    productArray.forEach(async(product)=>{
        console.log(product)
        try{
            
            await addDoc(subcollectionRef, {...product, createdAt: new Date()});
        }catch(error){
            console.log(error);
            console.log("Error occured while adding product");
            return false;
        }
        return true;
    })

}