import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        restraunt: {
            id: '',
            name: '',
            restrauntImageId: ''
        },
        items: [],
        count: 0
    },
    reducers: {
        updateRestrauntInfo: (state, action) => {
            const {restrauntName: name, area, restrauntImageId} = action.payload;
            state.restraunt = {name, area, restrauntImageId};
        },
        populateCart: (state, action) => {
            state.items = action.payload
        },
        populateRestaurant: (state, action) => {
            state.restraunt = action.payload
        },
        addItem: (state, action) => {
            state.items = action.payload
        },
        updateItem: (state, action) => {
            state.items = action.payload
        },
        removeItem: (state, payload) => {
            state.items.pop();
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const {updateRestrauntInfo, populateCart, populateRestaurant, addItem, updateItem, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;