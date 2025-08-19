import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const createCustomApi = (reducerPath, endpointsBuilder) => {
  return createApi({
    reducerPath,
    tagTypes: ["Users", "Points", "TeamMembers"], // Add any other tags you use
    // <-- MUST BE PRESENT
    baseQuery: axiosBaseQuery({ baseUrl }),
    endpoints: (builder) => endpointsBuilder(builder),
  });
};
