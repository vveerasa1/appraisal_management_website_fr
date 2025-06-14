import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    role:'',
    accessToken:''
  },
  reducers: {
    addToken: (state, action) => {
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken
    },
    logout: (state) => {
      state.accessToken = null;
      state.role = null;
    },
  },
});

export const { addToken,logout } = authSlice.actions;
export default authSlice.reducer;