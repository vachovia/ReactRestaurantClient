import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { apiResponse, shoppingCartModel } from './../Interfaces';

const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://reactdotnetapp20240213120238.azurewebsites.net/api/',
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem('token');
      token && headers.append('Authorization', `Bearer ${token}`);
    },
  }),
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
