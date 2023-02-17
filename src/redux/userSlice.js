const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            isLoggedIn: false
        }
    },
    reducers: {
        login: (state, action) => {
            state.user.isLoggedIn = true;
        },
        logout: (state, action) => {
            state.user.isLoggedIn = false;
        }
    }
})

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;