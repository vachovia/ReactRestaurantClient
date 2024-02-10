import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { apiResponse, shoppingCartModel } from './../Interfaces';

const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://react.localhost/api/',
  }),
  endpoints: (builder) => ({
    initiatePayment: builder.mutation<apiResponse<shoppingCartModel>, string>({
      query: (userId) => ({
        url: 'Payment',
        method: 'POST',
        params: {
          userId: userId
        },
      }),
    }),
  }),
});

export const {useInitiatePaymentMutation} = paymentApi;
export default paymentApi;
