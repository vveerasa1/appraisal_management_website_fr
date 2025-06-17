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
    query: () => ({
      url: `${POINT_ENDPOINTS.ROOT}`,
      method: "GET",
    }),
  }),
  getAllPoints: builder.query({
    query: () => ({
      url: `${POINT_ENDPOINTS.ROOT}`,
      method: "GET",
    }),
  }),
}));

export const {
  useCreatePointMutation,
  useGetAllPointsQuery,
  useGetPointQuery,
} = pointApi;
