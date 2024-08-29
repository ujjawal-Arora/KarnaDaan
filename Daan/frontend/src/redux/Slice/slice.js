import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'data',
    initialState: {
      searchData: null,
      locationData: null,
    },
    reducers: {
      setSearchData: (state, action) => {
        state.searchData = action.payload;
      },
      setLocationData: (state, action) => {
        state.locationData = action.payload;
      },
      fetchSearchDataSuccess: (state, action) => {
        state.searchData = action.payload;
      },
      fetchLocationDataSuccess: (state, action) => {
        state.locationData = action.payload;
      },
    },
  });
  
  export const {
    setSearchData,
    setLocationData,
    fetchSearchDataSuccess,
    fetchLocationDataSuccess,
  } = dataSlice.actions;
  
  export default dataSlice.reducer;