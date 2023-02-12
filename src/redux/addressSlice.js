import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        addresses: []
    },
    reducers: {
        populateAddress: (state, action) => {
            state.addresses = action.payload
        }
    }
});

export const {populateAddress} = addressSlice.actions;
export default addressSlice.reducer;