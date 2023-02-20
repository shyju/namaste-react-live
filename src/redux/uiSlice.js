import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isPaymentSuccessModalOpen: false,
        isAddressModalOpen: false
    },
    reducers: {
        TogglePaymentSuccessModal: (state, action) => {
            state.isPaymentSuccessModalOpen = !state.isPaymentSuccessModalOpen;
        },
        ToggleAddresssModal: (state, action) => {
            state.isAddressModalOpen = !state.isAddressModalOpen;
        }
    }
});

export const {TogglePaymentSuccessModal, ToggleAddresssModal} = uiSlice.actions;

export default uiSlice.reducer;