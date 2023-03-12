import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: []
    },
    reducers: {
        populateOrders: (state, action) => {
            state.orders = [...action?.payload]
        }
    }
});

export const {populateOrders} = orderSlice.actions;
export default orderSlice.reducer;