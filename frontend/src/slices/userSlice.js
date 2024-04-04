import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    token: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo(state, { payload }) {
            state = payload;
        },
    },
});

export const { actions } = userSlice;
export default userSlice.reducer;
