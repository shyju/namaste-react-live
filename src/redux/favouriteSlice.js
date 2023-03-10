import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: {
        favourites: []
    },
    reducers: {
        populateFavourites: (state, action) => {
            state.favourites = action.payload
        }
    }
});

export const {populateFavourites} = favouriteSlice.actions;

export default favouriteSlice.reducer;