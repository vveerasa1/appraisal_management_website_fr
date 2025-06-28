import { POINT_ENDPOINTS } from "../../../constants/endpoints";
import { createCustomApi } from "../../api";

export const pointApi = createCustomApi("pointApi", (builder) => ({
  createPoint: builder.mutation({
    query: (point) => ({
      url: `${POINT_ENDPOINTS.ROOT}`,
      method: "POST",
      data: point,
    }),
    invalidatesTags: ["Points"], // <-- Add this
  }),
  getPoint: builder.query({
    query: (id) => ({
      url: `${POINT_ENDPOINTS.ROOT}/${id}`,
      method: "GET",
    }),
  }),
  getAllPoints: builder.query({
    query: ({ search = "", dateRange = "", pointsRange = "" } = {}) => ({
      url: `${POINT_ENDPOINTS.ROOT}?search=${search}&dateRange=${dateRange}&pointsRange=${pointsRange}`,
      method: "GET",
    }),
    providesTags: ["Points"], // <-- Add this
  }),
}));

export const {
  useCreatePointMutation,
  useGetPointQuery,
  useGetAllPointsQuery,
} = pointApi;
