import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {
    addChannel,
    removeChannel,
    actions as channelActions,
} from "./channelsSlice.js";

const initialState = {
    selectedChannel: "1",
    defaultChannel: "1",
};

const uiAdapter = createEntityAdapter();

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setSelectedChannel(state, { payload }) {
            if (payload) {
                state.selectedChannel = payload;
            } else {
                state.selectedChannel = state.defaultChannel;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(removeChannel.fulfilled, (state, action) => {
                state.selectedChannel = state.defaultChannel;
            })
            .addCase(channelActions.removeChannel, (state, action) => {
                state.selectedChannel = state.defaultChannel;
            })
            .addCase(addChannel.fulfilled, (state, action) => {
                state.selectedChannel = action.payload.id;
            });
    },
});

export const { actions } = uiSlice;
export default uiSlice.reducer;
export const uiSelectors = uiAdapter.getSelectors((state) => state.ui);
