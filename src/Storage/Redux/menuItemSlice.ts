import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  menuItem: [],
  search: '',
};

export const menuItemSlice = createSlice({
  name: 'MenuItem',
  initialState: initialState,
  reducers: {
    setMenuItem: (state, action) => {
      return {...state, menuItem: action.payload};
    },
    setSearchItem: (state, action) => {
      return {...state, search: action.payload};
    },
  },
});

export const {setMenuItem, setSearchItem} = menuItemSlice.actions;
export const menuItemReducer = menuItemSlice.reducer;
