import { DEPARTMENT_ENDPOINTS } from "../../../constants/endpoints";
import { createCustomApi } from "../../api";

export const departmentApi = createCustomApi("departmentApi", (builder) => ({
  getDepartments: builder.query({
    query: ({ search = "" }) => ({
      url: `${DEPARTMENT_ENDPOINTS.ROOT}?search=${search}`,
      method: "GET",
    }),
    providesTags: ["Departments"], // <-- Add this
  }),
  addDepartment: builder.mutation({
    query: (department) => ({
      url: `${DEPARTMENT_ENDPOINTS.ROOT}`,
      method: "POST",
      data: department,
    }),
    invalidatesTags: ["Departments"], // <-- Add this
  }),
  getDepartmentById: builder.query({
    query: (id) => ({
      url: `${DEPARTMENT_ENDPOINTS.ROOT}/${id}`,
      method: "GET",
    }),
  }),
  deleteDepartment: builder.mutation({
    query: (id) => ({
      url: `${DEPARTMENT_ENDPOINTS.ROOT}/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Departments"], // Add this
  }),
}));
export const {
  useGetDepartmentsQuery,
  useAddDepartmentMutation,
  useGetDepartmentByIdQuery,
  useDeleteDepartmentMutation,
} = departmentApi;
