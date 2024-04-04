import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    token: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLogin(state, { payload }) {
            localStorage.setItem("token", payload.token);
            localStorage.setItem("username", payload.username);
            return payload;
        },
        userLogout(state, { payload }) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            return initialState;
        },
    },
});

export const { actions } = userSlice;
export default userSlice.reducer;
