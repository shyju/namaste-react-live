import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isModalOpen: false
    },
    reducers: {
        ToggleModal: (state, action) => {
            state.isModalOpen = !state.isModalOpen;
        }
    }
});

export const {ToggleModal} = uiSlice.actions;

export default uiSlice.reducer;