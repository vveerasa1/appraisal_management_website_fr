import { createSlice } from '@reduxjs/toolkit';

const  initialState = {
    id: null,
    name: '',
    email: '',
    status: '',
  }

const userSlice = createSlice({
  name: 'users',
 initialState,
  reducers: {
    addUserInfo: (state, action) => {
     const {id, name, email, status} = action.payload
      state.id = id;
      state.name = name;
      state.email = email;
      state.status = status;
    },
    deleteUserInfo:() => initialState
  },
});

export const { addUserInfo, deleteUserInfo} = userSlice.actions;
export default userSlice.reducer;