import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/features/auth/authApi';
import { userApi } from './services/features/users/userApi';
import usersReducer from './services/features/users/userSlice';
import authReducer from './services/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(authApi.middleware, userApi.middleware)
});
