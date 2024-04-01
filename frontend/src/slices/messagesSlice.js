import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import httpClient from "../api/httpClient";

export const fetchMessages = createAsyncThunk(
    "messages/fetchMessages",
    async () => {
        const response = await httpClient.get("/messages");
        return response.data;
    }
);

export const addMessage = createAsyncThunk(
    "messages/addMessage",
    async (message) => {
        const { data } = await httpClient.post("/messages", message);
        return data;
    }
);

export const editMessage = createAsyncThunk(
    "messages/editMessage",
    async ({ id, message }) => {
        const { data } = await httpClient.patch("/messages/${id}", message);
        return data;
    }
);

export const removeMessage = createAsyncThunk(
    "messages/removeMessage",
    async (id) => {
        const { data } = await httpClient.delete(`/messages/${id}`);
        return data;
    }
);

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.fulfilled, messagesAdapter.addMany)
            .addCase(addMessage.fulfilled, messagesAdapter.addOne)
            .addCase(editMessage.fulfilled, messagesAdapter.updateOne)
            .addCase(removeMessage.fulfilled, messagesAdapter.removeOne);
    },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
