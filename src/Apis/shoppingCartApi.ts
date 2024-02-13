import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const shoppingCartApi = createApi({
  reducerPath: 'shoppingCartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://reactdotnetapp20240213120238.azurewebsites.net/api/',
  }),
  tagTypes: ['ShoppingCarts'],
  endpoints: (builder) => ({
    getShoppingCartByUserId: builder.query({
      query: (userId) => ({
        url: 'ShoppingCart',
        params: {
          userId: userId,
        },
      }),
      providesTags: ['ShoppingCarts'],
    }),
    updateShoppingCart: builder.mutation({
      query: ({userId, menuItemId, updateQuantityBy}) => ({
        url: 'ShoppingCart',
        method: 'POST',
        params: {
          userId: userId,
          menuItemId: menuItemId,
          updateQuantityBy: updateQuantityBy,
        },
      }),
      invalidatesTags: ['ShoppingCarts'],
    }),
  }),
});

export const {useGetShoppingCartByUserIdQuery, useUpdateShoppingCartMutation} = shoppingCartApi;
export default shoppingCartApi;
