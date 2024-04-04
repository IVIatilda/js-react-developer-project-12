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
            console.log("userLogin", payload);
            localStorage.setItem("token", payload.token);
            localStorage.setItem("username", payload.username);
            // state = payload;
            return payload;
        },
        userLogout(state, { payload }) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            // state = initialState;
            return initialState;
        },
    },
});

export const { actions } = userSlice;
export default userSlice.reducer;
