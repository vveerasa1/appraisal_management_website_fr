import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: "",
    accessToken: "",
  },
  reducers: {
    addToken: (state, action) => {
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.accessToken = null;
      state.role = null;
    },
    setPermissions: (state, { payload }) => {
      state.permissions = payload; // Payload should be the array of permission slugs
    },
  },
});

export const { addToken, logout, setPermissions } = authSlice.actions;
export default authSlice.reducer;
