import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchCampsites = createAsyncThunk(
 'campsites/fetchCampsites',
 async () => {
  //Payload Creator
  const response = await fetch(baseUrl + 'campsites');
  return response.json();
 }
);

const campsitesSlice = createSlice({
 name: 'campsites',
 initialState: { isLoading: true, errMess: null, campsitesArray: [] },
 reducers: {},
 extraReducers: {
  //Pending Promise Returned from Payload Creator, Action Creator Dispatched here:
  [fetchCampsites.pending]: (state) => {
   state.isLoading = true;
  },
  [fetchCampsites.fulfilled]: (state, action) => {
   state.isLoading = false;
   state.errMess = null;
   state.campsitesArray = action.payload;
  },
  [fetchCampsites.rejected]: (state, action) => {
   state.isLoading = false;
   state.errMess = action.error ? action.error.message : 'Fetch failed';
  }
 }
});

export const campsitesReducer = campsitesSlice.reducer;