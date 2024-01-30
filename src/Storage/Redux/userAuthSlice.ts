import { createSlice } from "@reduxjs/toolkit";
import { userModel } from "./../../Interfaces";

const initialState: Partial<userModel> = {};

export const userAuthSlice = createSlice({
    name: "UserAuth",
    initialState: initialState,
    reducers: {
        setLoggedInUser: (state, action) => {
            return {...state, ...action.payload }
        }
    }
});

export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;