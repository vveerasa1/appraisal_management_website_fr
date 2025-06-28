import { DESIGNATION_ENDPOINTS } from "../../../constants/endpoints";
import { createCustomApi } from "../../api";

export const designationApi = createCustomApi("designationApi", (builder) => ({
  getDesignations: builder.query({
    query: ({ search }) => ({
      url: `${DESIGNATION_ENDPOINTS.ROOT}?search=${search}`,
      method: "GET",
    }),
    providesTags: ["Designations"], // <-- Add this
  }),
  addDesignation: builder.mutation({
    query: (designation) => ({
      url: "/designations",
      method: "POST",
      data: designation,
    }),
    invalidatesTags: ["Designations"], // <-- Add this
  }),
  getDesignationById: builder.query({
    query: (id) => ({
      url: `${DESIGNATION_ENDPOINTS.ROOT}/${id}`,
      method: "GET",
    }),
  }),
  deleteDesignation: builder.mutation({
    query: (id) => ({
      url: `${DESIGNATION_ENDPOINTS.ROOT}/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Designations"], // Add this
  }),
}));

export const {
  useGetDesignationsQuery,
  useAddDesignationMutation,
  useGetDesignationByIdQuery,
  useDeleteDesignationMutation,
} = designationApi;
