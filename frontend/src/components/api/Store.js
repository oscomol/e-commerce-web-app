import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import authReducer from "./slices/authSliceData"

export const Store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare().concat(apiSlice.middleware),
    devTools: true
});
setupListeners(Store.dispatch);