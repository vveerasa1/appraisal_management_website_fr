import { POINT_ENDPOINTS } from "../../../constants/endpoints";
import { createCustomApi } from "../../api";

export const pointApi = createCustomApi("pointApi", (builder) => ({
  createPoint: builder.mutation({
    query: (point) => ({
      url: `${POINT_ENDPOINTS.ROOT}`,
      method: "POST",
      data: point,
    }),
    invalidatesTags: (result, error, arg) => {
      const tagsToInvalidate = ["Points"]; // Invalidate the general 'Points' list

      // This now correctly matches the specific tag provided by getUser
      if (arg.employeeId) {
        tagsToInvalidate.push({ type: "Users", id: arg.employeeId });
      }

      // Invalidate TeamMembers as well (as you specified)
      tagsToInvalidate.push("TeamMembers");

      return tagsToInvalidate;
    },
  }),
  getPoint: builder.query({
    query: (id) => ({
      url: `${POINT_ENDPOINTS.ROOT}/${id}`,
      method: "GET",
    }),
  }),
  getAllPoints: builder.query({
    query: ({
      search = "",
      dateRange = "",
      pointsRange = "",
      createdBy = "",
    } = {}) => ({
      url: `${POINT_ENDPOINTS.ROOT}?search=${search}&dateRange=${dateRange}&pointsRange=${pointsRange}&createdBy=${createdBy}`,
      method: "GET",
    }),
    providesTags: ["Points"], // <-- Add this
  }),

  getAllPointsByUserId: builder.query({
    query: (id) => ({
      url: `${POINT_ENDPOINTS.ROOT}/employee/${id}`,
      method: "GET",
    }),
  }),
}));

export const {
  useCreatePointMutation,
  useGetPointQuery,
  useGetAllPointsQuery,
  useGetAllPointsByUserIdQuery,
} = pointApi;
