import { USER_ENDPOINTS } from "../../../constants/endpoints";
import { createCustomApi } from "../../api";

export const userApi = createCustomApi("userApi", (builder) => ({
  getReporters: builder.query({
    query: (employeeId) => ({
      url: `${USER_ENDPOINTS.ROOT}/${USER_ENDPOINTS.REPORTERS}?employeeId=${employeeId}`,
      method: "GET",
    }),
    providesTags: (result, error, userId) => [{ type: "Users", id: userId }],
  }),

  addUser: builder.mutation({
    query: (user) => ({
      url: `${USER_ENDPOINTS.ROOT}`,
      method: "POST",
      data: user,
    }),
    invalidatesTags: ["Users", "TeamMembers"], // Invalidate generic 'Users' and 'TeamMembers' list
  }),

  updateUserProfile: builder.mutation({
    query: ({ userId, formData }) => ({
      url: `${USER_ENDPOINTS.ROOT}/${userId}/number`,
      method: "PUT",
      data: formData,
    }),
    invalidatesTags: (result, error, { userId }) => [
      { type: "Users", id: userId },
    ],
  }),

  getUser: builder.query({
    query: (userId) => ({
      url: `${USER_ENDPOINTS.ROOT}/${userId}`,
      method: "GET",
    }),
    providesTags: (result, error, userId) => [{ type: "Users", id: userId }],
  }),

  getAllUsers: builder.query({
    query: ({ id, ...params }) => {
      const searchParams = new URLSearchParams(params).toString();

      return {
        url: `${USER_ENDPOINTS.ROOT}/${id}/${USER_ENDPOINTS.ALL}?${searchParams}`,
        method: "GET",
      };
    },
    providesTags: ["Users"], // <-- Add this
  }),

  getAllUsersForAppraisal: builder.query({
    query: (id) => {
      // const searchParams = new URLSearchParams(params).toString();

      return {
        url: `${USER_ENDPOINTS.ROOT}/${id}/employees`,
        method: "GET",
      };
    },
    providesTags: ["Users"], // <-- Add this
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

  updatePassword: builder.mutation({
    query: ({ id, ...body }) => ({
      url: `${USER_ENDPOINTS.ROOT}/update/password/${id}`, // Append '/${id}' to the URL
      method: "POST",
      data: body,
    }),
  }),

  getTeamMembers: builder.query({
    // Accept new parameters: department and designation
    query: ({ userId, search, department, designation }) => {
      const params = new URLSearchParams();
      if (search) {
        params.append("search", search);
      }
      if (department) {
        params.append("department", department); // Append department ID
      }
      if (designation) {
        params.append("designation", designation); // Append designation ID
      }
      return {
        // Construct the URL with all relevant parameters
        url: `${
          USER_ENDPOINTS.ROOT
        }/${userId}/team-members?${params.toString()}`,
        method: "GET",
      };
    },
    providesTags: ["TeamMembers"], // <-- Add this
  }),

  deleteUser: builder.mutation({
    query: (id) => ({
      url: `${USER_ENDPOINTS.ROOT}/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Users"], // Add this
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
  useGetTeamMembersQuery,
  useUpdatePasswordMutation,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
  useGetAllUsersForAppraisalQuery,
} = userApi;
