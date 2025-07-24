import { createCustomApi } from "../../api";

export const holidayApi = createCustomApi('holidayApi',(builder) => ({
    getHolidays: builder.query({
      query: () => '/holidays',
      providesTags: ['Holiday'],
    }),
    getHolidayById: builder.query({
      query: (id) => `/holidays/${id}`,
      providesTags: (result, error, id) => [{ type: 'Holiday', id }],
    }),
    addHoliday: builder.mutation({
      query: (holiday) => ({
        url: '/holidays',
        method: 'POST',
        body: holiday,
      }),
      invalidatesTags: ['Holiday'],
    }),
    updateHoliday: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/holidays/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Holiday', id }],
    }),
    deleteHoliday: builder.mutation({
      query: (id) => ({
        url: `/holidays/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Holiday'],
    }),
  }),
);

export const {
  useGetHolidaysQuery,
  useGetHolidayByIdQuery,
  useAddHolidayMutation,
  useUpdateHolidayMutation,
  useDeleteHolidayMutation,
} = holidayApi;
