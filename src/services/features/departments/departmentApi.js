import { DEPARTMENT_ENDPOINTS } from "../../../constants/endpoints";
import { createCustomApi } from "../../api";

export const departmentApi = createCustomApi(
    'departmentApi',
    (builder) => ({
        getDepartments: builder.query({
            query: () => ({
                url: `${DEPARTMENT_ENDPOINTS.ROOT}`,
                method: 'GET',
            }),
        }),
        addDepartment: builder.mutation({
            query: (department) => ({
                url: `${DEPARTMENT_ENDPOINTS.ROOT}`,
                method: 'POST',
                data: department,
            }),
        }),
        getDepartmentById: builder.mutation({
            query: ({ id }) => ({
                url: `/${DEPARTMENT_ENDPOINTS.ROOT}/${id}`,
                method: 'GET',
            }),
        }),
        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `/${DEPARTMENT_ENDPOINTS.ROOT}/${id}`,
                method: 'DELETE',
            }),
        }),
    })
);
export const {
    useGetDepartmentsQuery,
    useAddDepartmentMutation,
    useGetDepartmentsByIdQuery,
    useDeleteDepartmentMutation
} = departmentApi;