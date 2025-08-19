import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

const baseUrl =  "http://localhost:4003/api";
export const createCustomApi = (reducerPath, endpointsBuilder) => {
  return createApi({
    reducerPath,
    tagTypes: ["Users", "Points", "TeamMembers"], // Add any other tags you use
    // <-- MUST BE PRESENT
    baseQuery: axiosBaseQuery({ baseUrl }),
    endpoints: (builder) => endpointsBuilder(builder),
  });
};
