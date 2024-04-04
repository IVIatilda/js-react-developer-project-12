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
    async (channel) => {
        const { data } = await httpClient.patch(
            `/channels/${channel.id}`,
            channel
        );
        return { id: channel.id, changes: data };
    }
);

export const removeChannel = createAsyncThunk(
    "channels/removeChannel",
    async (id) => {
        await httpClient.delete(`/channels/${id}`);
        return id;
    }
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
    name: "channels",
    initialState,
    reducers: {
        removeChannel: channelsAdapter.removeOne,
        updateChannel: channelsAdapter.updateOne,
        addChannel: channelsAdapter.addOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannels.fulfilled, channelsAdapter.addMany)
            .addCase(addChannel.fulfilled, channelsAdapter.addOne)
            .addCase(editChannel.fulfilled, channelsAdapter.removeOne)
            .addCase(removeChannel.fulfilled, channelsAdapter.removeOne);
    },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const channelsSelectors = channelsAdapter.getSelectors(
    (state) => state.channels
);
