import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './baseUrl';

const menuItemApi = createApi({
  reducerPath: 'menuItemApi',
  baseQuery: baseQuery,
  tagTypes: ['MenuItems'],
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => ({
        url: 'MenuItem',
      }),
      providesTags: ['MenuItems'],
    }),
    getMenuItemById: builder.query({
      query: (id) => ({
        url: `MenuItem/${id}`,
      }),
      providesTags: ['MenuItems'],
    }),
    createMenuItem: builder.mutation({
      query: (data) => ({
        url: `MenuItem`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['MenuItems'],
    }),
    updateMenuItem: builder.mutation({
      query: ({data, id}) => ({
        url: `MenuItem/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MenuItems'],
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `MenuItem/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MenuItems'],
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  useGetMenuItemByIdQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = menuItemApi;
export default menuItemApi;
