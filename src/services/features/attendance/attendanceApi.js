import { ATTENDENCE_ENDPOINTS } from "../../../constants/endpoints";
import { createCustomApi } from "../../api";
export const attendanceApi = createCustomApi("attendanceApi", (builder) => ({
  addAttendance: builder.mutation({
    query: (attendance) => ({
      url: `${ATTENDENCE_ENDPOINTS.ROOT}`,
      method: "POST",
      data: attendance,
    }),
    invalidatesTags: ["Attendance"], // <-- Add this
  }),
  getAttendanceSummary: builder.query({
    query: ({ userId, month, year, mode, startDate, endDate, date }) => ({
      url: `${ATTENDENCE_ENDPOINTS.ROOT}/summary/${userId}`,
      method: "GET",
      params: {
        month,
        year,
        mode,
        startDate,
        endDate,
        date,
      },
    }),
    providesTags: ["Attendance"],
  }),
  getAttendance: builder.query({
    query: (id) => ({
      url: `${ATTENDENCE_ENDPOINTS.ROOT}/${id}`,
      method: "GET",
    }),
    providesTags: ["Attendance"],
  }),

  deleteAttendance: builder.mutation({
    query: (id) => ({
      url: `${ATTENDENCE_ENDPOINTS.ROOT}/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Attendance"], // Add this
  }),
}));
export const {
  useAddAttendanceMutation,
  useGetAttendanceSummaryQuery,
  useGetAttendanceQuery,
  useDeleteAttendanceMutation,
} = attendanceApi;
