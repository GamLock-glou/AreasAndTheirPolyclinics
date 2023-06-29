import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { AreaState, PolyclinicState } from '../../type/type';
import { getAreas, getPolyclinics } from "./ActionCreators";
// import axios from "axios";

interface PolyclinicsState {
  polyclinics: PolyclinicState[];
  isLoading: boolean;
  error: string;
}

const initialState: PolyclinicsState = {
  polyclinics: [],
  isLoading: false,
  error: '',
}

const selectorPolyclinics = (state: RootState) => state.polyclinicsReducer;
export const numberPolyclinicsSelector = createSelector(selectorPolyclinics, (state) => {
  return state.polyclinics.map((polyclinic)=> {
    return polyclinic.numberPolyclinic
  })
});
export const numberAreasSelector = createSelector(selectorPolyclinics, (state) => {
  return Array.from(new Set(state.polyclinics.map((polyclinic)=> {
    return polyclinic.numberArea
  })))
});

export const polyclinicsSlice = createSlice({
  name: 'polyclinics',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getPolyclinics.fulfilled.type]: (state, action: PayloadAction<PolyclinicState[]>) => {
      state.isLoading = false;
      state.polyclinics = action.payload;
    },
    [getPolyclinics.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getPolyclinics.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export default polyclinicsSlice.reducer;