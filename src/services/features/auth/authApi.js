import { AUTH_ENDPOINTS } from "../../../constants/endpoints";
import { createCustomApi } from "../../api";

export const authApi = createCustomApi("authApi", (builder) => ({
  login: builder.mutation({
    query: (credentials) => ({
      url: `${AUTH_ENDPOINTS.ROOT}/${AUTH_ENDPOINTS.LOGIN}`,
      method: "POST",
      data: credentials,
    }),
  }),
  sendOtp: builder.mutation({
    query: (email) => ({
      url: `${AUTH_ENDPOINTS.ROOT}/send-otp`,
      method: "POST",
      data: email,
    }),
  }),
  verifyOtp: builder.mutation({
    query: (data) => ({
      url: `${AUTH_ENDPOINTS.ROOT}/verify-otp`,
      method: "POST",
      data: data,
    }),
  }),
}));

export const {
  useSendOtpMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
} = authApi;
