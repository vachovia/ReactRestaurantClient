import {createApi} from '@reduxjs/toolkit/query/react';
import {apiResponse, orderHeaderModel, orderModel} from './../Interfaces';
import {baseQuery} from './baseUrl';

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQuery,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    createOrder: builder.mutation<apiResponse<orderHeaderModel>, orderModel>({
      query: (orderDetails) => ({
        url: 'Order',
        method: 'POST',
        body: orderDetails,
      }),
      invalidatesTags: ['Orders'],
    }),
    getAllOrders: builder.query<apiResponse<orderHeaderModel[]>, string>({
      query: (userId) => ({
        url: 'Order',
        params: {
          userId: userId,
        },
      }),
      providesTags: ['Orders'],
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `Order/${id}`,
      }),
      providesTags: ['Orders'],
    }),
    updateOrderHeader: builder.mutation({
      query: (orderDetails) => ({
        url: `Order/${orderDetails.orderHeaderId}`,
        method: 'PUT',
        body: orderDetails,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {useCreateOrderMutation, useGetAllOrdersQuery, useGetOrderDetailsQuery, useUpdateOrderHeaderMutation} =
  orderApi;
export default orderApi;
