import { createCustomApi } from "../../api";
export const holidayApi = createCustomApi('holidayApi', (builder) => ({
  getHolidays: builder.query({
    query: () => ({
      url: `/holidays`,
      method: "GET",
    }),
    providesTags: ['Holiday'],
  }),
  getHolidayById: builder.query({
    query: (id) => ({
      url: `/holidays/${id}`,
      method: "GET",
    }),
    providesTags: (result, error, id) => [{ type: 'Holiday', id }],
  }),

  addHoliday: builder.mutation({
    query: (payload) => ({
      url: '/holidays',
      method: 'POST',
      data: payload,
    }),
    invalidatesTags: ['Holiday'],
  }),
  updateHoliday: builder.mutation({
    query: (payload) => ({
      url: `/holidays`,
      method: 'POST',
      data: payload,
    }),
    invalidatesTags: ['Holiday'],
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
