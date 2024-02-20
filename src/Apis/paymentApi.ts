import {createApi} from '@reduxjs/toolkit/query/react';
import { apiResponse, shoppingCartModel } from './../Interfaces';
import {baseQuery} from './baseUrl';

const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    initiatePayment: builder.mutation<apiResponse<shoppingCartModel>, string>({
      query: (userId) => ({
        url: 'Payment',
        method: 'POST',
        params: {
          userId: userId,
        },
      }),
    }),
  }),
});

export const {useInitiatePaymentMutation} = paymentApi;
export default paymentApi;
