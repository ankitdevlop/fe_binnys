import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./combineReducer";

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat();
    },
    devTools: true,
});