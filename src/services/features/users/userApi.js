import { createCustomApi } from '../../api';

export const userApi = createCustomApi(
  'userApi',
  (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
    }),
  })
);

export const { useGetPostsQuery } = userApi;