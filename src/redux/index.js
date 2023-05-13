// export * as action from './actions/index'

import { configureStore } from "@reduxjs/toolkit";
import addToDbSlice from "./slice/addToDbSlice";
import authSlice from "./slice/authSlice.jsx";
import storage from 'redux-persist/lib/storage'
import {persistStore,  persistReducer } from "redux-persist";
import { combineReducers} from "@reduxjs/toolkit";
import sellProductSlice from "./slice/sellProductSlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ['auth', 'addToDb']
}

const rootReducer = combineReducers({
    auth: authSlice,
    addToDb: addToDbSlice,
    sellProduct: sellProductSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
})

export default store;
export const persistor = persistStore(store);