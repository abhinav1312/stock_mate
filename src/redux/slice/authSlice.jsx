import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { auth } from '../../firebase/firebase';
import { auth } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { db, provider } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';


const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  errorMessage: '',
  redirect: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRedirect(state){
      state = true;
      state = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
        console.log("Pending")
      })
      .addCase(login.fulfilled, (state) => {
        state.user = auth.currentUser.uid;
        console.log("Login done")
        console.log("Auth user :", state.user);
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

const login = createAsyncThunk('auth/login', async (navigate) => {
  try{

  
  const {user} = await signInWithPopup(auth, provider);
  navigate('/hero');
  // check if user exists in database
  const userDocRef = doc(db, 'users', user.uid); 
  const snapshot = await getDoc(userDocRef);

  // add user to database if it doesnt exist
  if (!snapshot.exists()) {
    const name = user.displayName;
    const email = user.email;
    const createdAt = new Date();
    await setDoc(userDocRef, { name, email, createdAt });
  }

}catch(error){
  alert("Error occured while signing in. Please try again.")
}
});

const logout = createAsyncThunk('auth/logout', async (navigate) => {
  await auth.signOut();
  navigate('/');
});

export default authSlice.reducer;
export {login, logout};