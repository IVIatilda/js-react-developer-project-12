import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo(state, { payload }) {
            state.username = payload.username;
        },
    },
});

export const { actions } = userSlice;
export default userSlice.reducer;
