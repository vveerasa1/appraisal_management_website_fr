import { AUTH_ENDPOINTS } from '../../../constants/endpoints';
import { createCustomApi } from '../../api';

export const authApi = createCustomApi(
  'authApi',
  (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_ENDPOINTS.ROOT}/${AUTH_ENDPOINTS.LOGIN}`,
        method: 'POST',
        data:credentials
      }),
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: `${AUTH_ENDPOINTS.ROOT}/${AUTH_ENDPOINTS.RESETPASSWORD}`,
        method: 'POST',
        data:email
      }),
    }),
  })
);

export const { useLoginMutation, useResetPasswordMutation } = authApi;