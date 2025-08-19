import axios from 'axios';

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
 
       const token = localStorage.getItem('token');

      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      };
    }
  };
