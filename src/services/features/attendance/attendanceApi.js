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
}));
export const { useAddAttendanceMutation } = attendanceApi;
