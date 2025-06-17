import { USER_ENDPOINTS } from "../../../constants/endpoints";
import { createCustomApi } from "../../api";

export const userApi = createCustomApi("userApi", (builder) => ({
  getReporters: builder.query({
    query: () => ({
      url: `${USER_ENDPOINTS.ROOT}/${USER_ENDPOINTS.REPORTERS}`,
      method: "GET",
    }),
  }),
  getAllUsers: builder.query({
    query: (id) => ({
      url: `${USER_ENDPOINTS.ROOT}/${id}/all`,
      method: "GET",
    }),
  }),
  getUserById: builder.query({
    query: (id) => ({
      url: `${USER_ENDPOINTS.ROOT}/${id}`, // Adjust endpoint as needed
      method: "GET",
    }),
  }),
}));

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetReportersQuery,
} = userApi;
