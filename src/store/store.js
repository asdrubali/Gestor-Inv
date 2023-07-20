import persistStore from "redux-persist/es/persistStore";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { gestorSlice } from "./gestor";




export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        gestor: gestorSlice.reducer,
    },
})
