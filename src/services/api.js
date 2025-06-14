import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const createCustomApi = (reducerPath, endpointsBuilder) => {
  return createApi({
    reducerPath,
    baseQuery: axiosBaseQuery({ baseUrl }),
    endpoints: (builder) => endpointsBuilder(builder),
  });
};