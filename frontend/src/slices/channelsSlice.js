import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import httpClient from "../api/httpClient";

export const fetchChannels = createAsyncThunk(
    "channels/fetchChannels",
    async () => {
        const response = await httpClient.get("/channels");
        return response.data;
    }
);

export const addChannel = createAsyncThunk(
    "channels/addChannel",
    async (channel) => {
        const { data } = await httpClient.post("/channels", channel);
        return data;
    }
);

export const editChannel = createAsyncThunk(
    "channels/editChannel",
    async ({ id, channel }) => {
        const { data } = await httpClient.patch(`/channels/${id}`, channel);
        return data;
    }
);

export const removeChannel = createAsyncThunk(
    "channels/removeChannel",
    async (id) => {
        const { data } = await httpClient.delete(`/channels/${id}`);
        return data;
    }
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
    name: "channels",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannels.fulfilled, channelsAdapter.addMany)
            .addCase(addChannel.fulfilled, channelsAdapter.addOne)
            .addCase(editChannel.fulfilled, channelsAdapter.updateOne)
            .addCase(removeChannel.fulfilled, channelsAdapter.removeOne);
    },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);

// export const {
//     selectAll: selectAllChannels,
//     selectById: selectChannelById
// } = channelsAdapter.getSelectors(state => state.channels);
