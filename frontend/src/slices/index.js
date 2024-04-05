import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './uiSlice';
import usersReducer from './userSlice';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';

export default configureStore({
  reducer: {
    ui: uiSlice,
    user: usersReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
