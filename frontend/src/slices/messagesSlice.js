import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMessages = createAsyncThunk(
    "messages/fetchMessages",
    async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/v1/messages", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

export const addMessage = createAsyncThunk(
    "messages/addMessage",
    async (message) => {
        const { data } = await axios.post("/api/v1/messages", message);
        return data;
    }
);

export const editMessage = createAsyncThunk(
    "messages/editMessage",
    async (id, message) => {
        const { data } = await axios.patch("/api/v1/messages" + id, message);
        return data;
    }
);

export const removeMessage = createAsyncThunk(
    "messages/removeMessage",
    async (id) => {
        const { data } = await axios.delete("/api/v1/messages" + id);
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
