import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://react.localhost/api/',
  }),
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
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
