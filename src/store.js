import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/features/auth/authApi";
import { userApi } from "./services/features/users/userApi";
import { pointApi } from "./services/features/points/pointApi";

import { departmentApi } from "./services/features/departments/departmentApi";
import usersReducer from "./services/features/users/userSlice";
import authReducer from "./services/features/auth/authSlice";
import { designationApi } from "./services/features/designation/designationApi";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [designationApi.reducerPath]: designationApi.reducer,
    [pointApi.reducerPath]: pointApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      departmentApi.middleware,
      designationApi.middleware,
      pointApi.middleware
    ),
});
