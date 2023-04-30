import {createSlice} from '@reduxjs/toolkit'
import { auth, db } from '../../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const addToDbSlice = createSlice({
    name: 'addToDb',
    initialState: [],
    reducers: {
        addProduct(state, action){
            state.push(action.payload);
            console.log("Called");
        },
        sendProductsToDb(state, action){
            const {currentUser} = auth;
            console.log("Auth: ", auth)
            if(currentUser){
                const addProduct = async () => {
                    const {uid} = currentUser;
                    console.log("Uid: ", uid);
                    const userDocRef = doc(db, 'current_inventory', uid);
                    setDoc(userDocRef, {})
                    const subcollectionRef = collection(userDocRef, 'products');
                    await addDoc(subcollectionRef, {name: "test", password: "lol lmao"}).then(data=>{console.log("Dataaa: ", data)})
                }

                addProduct();
            }
        }
    }
})

export default addToDbSlice.reducer;
export const {addProduct, sendProductsToDb} = addToDbSlice.actions;
