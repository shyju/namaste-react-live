import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "./addressSlice";
import cartSlice from "./cartSlice";
import restrauntSlice from "./restrauntSlice";

const store = configureStore({
    reducer: {
        restraunt: restrauntSlice,
        cart: cartSlice,
        address: addressSlice
    }
});

export default store;