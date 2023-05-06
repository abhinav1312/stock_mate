// export * as action from './actions/index'

import { configureStore } from "@reduxjs/toolkit";
import addToDbSlice from "./slice/addToDbSlice";
import authSlice from "./slice/authSlice.jsx";

const rootReducer = {
    auth: authSlice,
    addToDb: addToDbSlice
}

const store = configureStore({
    reducer: rootReducer
})

export default store;