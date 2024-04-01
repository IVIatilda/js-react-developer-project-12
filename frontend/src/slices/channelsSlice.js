import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChannels = createAsyncThunk(
    "channels/fetchChannels",
    async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/v1/channels", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

export const addChannel = createAsyncThunk(
    "channels/addChannel",
    async (channel) => {
        const { data } = await axios.post("/api/v1/channels", channel);
        return data;
    }
);

export const editChannel = createAsyncThunk(
    "channels/editChannel",
    async (id, channel) => {
        const { data } = await axios.patch("/api/v1/channels" + id, channel);
        return data;
    }
);

export const removeChannel = createAsyncThunk(
    "channels/removeChannel",
    async (id) => {
        const { data } = await axios.delete("/api/v1/channels" + id);
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

// export const selectors = channelsSlice.getSelectors((state: any) => state.channels);
// export const channelsSelectors = channelsAdapter.getSelectors<RootState>(
//     (state) => state.channels
//   );

// export default channelsSlice.reducer;

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
