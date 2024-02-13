import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authResponse, userLoginModel, userRegisterModel } from './../Interfaces';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://reactdotnetapp20240213120238.azurewebsites.net/api/',
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<void, userRegisterModel>({
      query: (userData) => ({
        url: 'Auth/Register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: userData,
      }),
    }),
    loginUser: builder.mutation<authResponse, userLoginModel>({
      query: (userCredentials) => ({
        url: 'Auth/Login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: userCredentials,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
export default authApi;