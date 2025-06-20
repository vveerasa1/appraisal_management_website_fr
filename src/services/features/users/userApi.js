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
    getAllUsers: builder.query({
        query:({ id, ...params}) => {
          const searchParams = new URLSearchParams(params).toString();
         
          return{
          url: `${USER_ENDPOINTS.ROOT}/${id}/${USER_ENDPOINTS.ALL}?${searchParams}` ,
            method:'GET'
          }         
        }
    }),
    updateUser: builder.mutation({
      query:({userId, formData}) => ({
        url:`${USER_ENDPOINTS.ROOT}/${userId}`,
        method:'PUT',
        data:formData
      })
    })
  })
);

export const {
  useGetDashboardQuery,
  useGetReportersQuery,
  useAddUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useGetAllUsersForListQuery,
} = userApi;
