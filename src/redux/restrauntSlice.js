import { createSlice } from "@reduxjs/toolkit";

const restrauntSlice = createSlice({
    'name': 'restraunt',
    initialState: {
        restrauntList: [],
        restrauntDetails: null
    },
    reducers: {
        updateRestrauntList: (state, action) => {
            state.restrauntList = action.payload
        },
        updateRestrauntDetails: (state, action) => {
            state.restrauntDetails =  action.payload
        }
    }
});

export const {updateRestrauntList, updateRestrauntDetails} = restrauntSlice.actions;

export default restrauntSlice.reducer;