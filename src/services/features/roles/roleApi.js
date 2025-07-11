import { ROLE_ENDPOINTS } from "../../../constants/endpoints";
import { createCustomApi } from "../../api";

export const roleApi = createCustomApi("roleApi", (builder) => ({
  getRoles: builder.query({
    query: ({ search = "" }) => ({
      url: `${ROLE_ENDPOINTS.ROOT}?search=${search}`,
      method: "GET",
    }),
    providesTags: ["Roles"], // <-- Add this
  }),
  addRole: builder.mutation({
    query: (role) => ({
      url: `${ROLE_ENDPOINTS.ROOT}`,
      method: "POST",
      data: role,
    }),
    invalidatesTags: ["Roles"], // <-- Add this
  }),
  getRoleById: builder.query({
    query: (id) => ({
      url: `${ROLE_ENDPOINTS.ROOT}/${id}`,
      method: "GET",
    }),
  }),
  deleteRole: builder.mutation({
    query: (id) => ({
      url: `${ROLE_ENDPOINTS.ROOT}/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Roles"], // <-- Add this
  }),
}));

export const {
  useGetRolesQuery,
  useAddRoleMutation,
  useGetRoleByIdQuery,
  useDeleteRoleMutation,
  useLazyGetRoleByIdQuery,
} = roleApi;
