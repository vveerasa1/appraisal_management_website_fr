import { POINT_ENDPOINTS } from "../../../constants/endpoints";
import { createCustomApi } from "../../api";

export const pointApi = createCustomApi("pointApi", (builder) => ({
  createPoint: builder.mutation({
    query: (point) => ({
      url: `${POINT_ENDPOINTS.ROOT}`,
      method: "POST",
      data: point,
    }),
  }),
  getPoint: builder.query({
    query: (id) => ({
      url: `${POINT_ENDPOINTS.ROOT}/${id}`,
      method: "GET",
    }),
  }),
  getAllPoints: builder.query({
    query: ({ search = "", department = "", designation = "" } = {}) => ({
      url: `${POINT_ENDPOINTS.ROOT}?search=${search}&department=${department}&designation=${designation}`,
      method: "GET",
    }),
  }),
}));

export const {
  useCreatePointMutation,
  useGetPointQuery,
  useGetAllPointsQuery,
} = pointApi;
