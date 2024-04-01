import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, { payload }) {
      state.name = payload.name;
    },
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;