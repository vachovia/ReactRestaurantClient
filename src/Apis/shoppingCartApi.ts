import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const shoppingCartApi = createApi({
    reducerPath: "shoppingCartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://react.localhost/api/"
    }),
    tagTypes: ["ShoppingCarts"],
    endpoints: (builder) => ({
        getShoppingCartByUserId: builder.query({
            query: (userId) => ({
                url: 'ShoppingCart',
                params: {
                    userId: userId
                }
            }),
            providesTags: ["ShoppingCarts"]
        }),
        updateShoppingCart: builder.mutation({
            query: ({ userId, menuItemId, updateQuantityBy }) => ({
                url: 'ShoppingCart',
                method: 'POST',
                params:{
                    userId: userId,
                    menuItemId: menuItemId,
                    updateQuantityBy: updateQuantityBy
                }
            }),
            invalidatesTags: ["ShoppingCarts"]
        })
    })
});

export const { useGetShoppingCartByUserIdQuery, useUpdateShoppingCartMutation } = shoppingCartApi;
export default shoppingCartApi;