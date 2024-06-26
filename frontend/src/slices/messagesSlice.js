import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import httpClient from '../api/httpClient';
import { removeChannel } from './channelsSlice.js';

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
  const response = await httpClient.get('/messages');
  return response.data;
});

export const addMessage = createAsyncThunk('messages/addMessage', async (message) => {
  console.log('messages/addMessage', message);
  const { data } = await httpClient.post('/messages', message);
  return data;
});

export const editMessage = createAsyncThunk('messages/editMessage', async ({ id, message }) => {
  const { data } = await httpClient.patch(`/messages/${id}`, message);
  return data;
});

export const removeMessage = createAsyncThunk('messages/removeMessage', async (id) => {
  const { data } = await httpClient.delete(`/messages/${id}`);
  return data;
});

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      console.log('addMessage', payload);
      messagesAdapter.addOne(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, messagesAdapter.addMany)
      .addCase(addMessage.fulfilled, messagesAdapter.addOne)
      .addCase(editMessage.fulfilled, messagesAdapter.updateOne)
      .addCase(removeMessage.fulfilled, messagesAdapter.removeOne)
      .addCase(removeChannel.fulfilled, (state, action) => {
        const messages = Object.values(state.entities).filter(
          (e) => e.channelId !== action.payload,
        );
        messagesAdapter.setAll(state, messages);
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
