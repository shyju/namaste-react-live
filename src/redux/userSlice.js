const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        User: (state, action) => {
            state.user = action.payload;
        },
        Logout: (state, action) => {
            state.user = null;
        }
    }
})

export const {User, Logout} = userSlice.actions;
export default userSlice.reducer;