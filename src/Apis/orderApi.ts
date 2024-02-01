import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { apiResponse, orderHeaderModel } from './../Interfaces';

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://react.localhost/api/',
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<apiResponse, orderHeaderModel>({
      query: (order: orderHeaderModel) => ({
        url: 'Order',
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

export const {useCreateOrderMutation} = orderApi;
export default orderApi;
