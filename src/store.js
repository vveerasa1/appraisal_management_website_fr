import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import { authApi } from "./services/features/auth/authApi";
import { userApi } from "./services/features/users/userApi";
import { pointApi } from "./services/features/points/pointApi";

import { departmentApi } from "./services/features/departments/departmentApi";
import usersReducer from "./services/features/users/userSlice";
import authReducer from "./services/features/auth/authSlice";
import { designationApi } from "./services/features/designation/designationApi";
import { holidayApi } from "./services/features/holidays/holidayApi";
import { roleApi } from "./services/features/roles/roleApi";

// Combine reducers
const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [pointApi.reducerPath]: pointApi.reducer,
  [departmentApi.reducerPath]: departmentApi.reducer,
  [designationApi.reducerPath]: designationApi.reducer,
  [holidayApi.reducerPath]: holidayApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    authApi.reducerPath,
    userApi.reducerPath,
    pointApi.reducerPath,
    departmentApi.reducerPath,
    designationApi.reducerPath,
    holidayApi.reducerPath,
    roleApi.reducerPath,
  ], // Don't persist RTK Query API slices
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      authApi.middleware,
      userApi.middleware,
      departmentApi.middleware,
      designationApi.middleware,
      holidayApi.middleware,
      pointApi.middleware,
      roleApi.middleware
    ),
});

// Create persistor
export const persistor = persistStore(store);
