import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";
import { menuItemApi, shoppingCartApi, authApi } from "./../../Apis";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { userAuthReducer } from "./userAuthSlice";

const store = configureStore({
    reducer: {
        menuItemStore: menuItemReducer,
        shoppingCartStore: shoppingCartReducer,
        userAuthStore: userAuthReducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer,
        [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getMiddleware) => getMiddleware()
    .concat(menuItemApi.middleware)
    .concat(shoppingCartApi.middleware)
    .concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export default store;