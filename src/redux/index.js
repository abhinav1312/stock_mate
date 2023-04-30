// export * as action from './actions/index'

import { configureStore } from "@reduxjs/toolkit";
import addToDbSlice from "./slice/addToDbSlice";

const store = configureStore({
    reducer: {
        addToDb: addToDbSlice
    }
})

export default store;