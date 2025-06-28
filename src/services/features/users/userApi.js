import { USER_ENDPOINTS } from "../../../constants/endpoints";
import { createCustomApi } from "../../api";

export const userApi = createCustomApi("userApi", (builder) => ({
  getReporters: builder.query({
    query: () => ({
      url: `${USER_ENDPOINTS.ROOT}/${USER_ENDPOINTS.REPORTERS}`,
      method: "GET",
    }),
  }),

  addUser: builder.mutation({
    query: (user) => ({
      url: `${USER_ENDPOINTS.ROOT}`,
      method: "POST",
      data: user,
    }),
  }),

  getUser: builder.query({
    query: (userId) => ({
      url: `${USER_ENDPOINTS.ROOT}/${userId}`,
      method: "GET",
    }),
  }),

  getAllUsers: builder.query({
    query: ({ id, ...params }) => {
      const searchParams = new URLSearchParams(params).toString();

      return {
        url: `${USER_ENDPOINTS.ROOT}/${id}/${USER_ENDPOINTS.ALL}?${searchParams}`,
        method: "GET",
      };
    },
  }),
  getAllUsersForList: builder.query({
    query: (id) => ({
      url: `${USER_ENDPOINTS.ROOT}/${id}/all`,
      method: "GET",
    }),
  }),
  getDashboard: builder.query({
    query: ({ userId, role }) => ({
      url: `${USER_ENDPOINTS.ROOT}/${userId}/dashboard?role=${role}`,
      method: "GET",
    }),
  }),

  getEmployeeTree: builder.query({
    query: () => ({
      url: `${USER_ENDPOINTS.ROOT}/tree`,
      method: "GET",
    }),
  }),
  getDepartmentTree: builder.query({
    query: () => ({
      url: `${USER_ENDPOINTS.ROOT}/departments/users`,
      method: "GET",
    }),
  }),

  resetPassword: builder.mutation({
    query: (body) => ({
      url: `${USER_ENDPOINTS.ROOT}/reset/password`,
      method: "POST",
      data: body,
    }),
  }),
}));

export const {
  useGetDashboardQuery,
  useGetReportersQuery,
  useAddUserMutation,
  useGetUserQuery,
  useGetAllUsersQuery,
  useGetAllUsersForListQuery,
  useGetEmployeeTreeQuery,
  useGetDepartmentTreeQuery,
  useResetPasswordMutation,
} = userApi;
