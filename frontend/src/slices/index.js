import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import channelsReducer from "./channelsSlice";
import messagesReducer from "./messagesSlice";

export default configureStore({
    reducer: {
        user: usersReducer,
        channels: channelsReducer,
        messages: messagesReducer,
    },
});
