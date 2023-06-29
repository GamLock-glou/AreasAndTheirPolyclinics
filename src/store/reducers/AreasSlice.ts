import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AreaState } from '../../type/type';
import { getAreas } from "./ActionCreators";
// import axios from "axios";

interface AreasState {
  areas: AreaState[];
  isLoading: boolean;
  error: string;
}

const initialState: AreasState = {
  areas: [],
  isLoading: false,
  error: '',
}

export const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getAreas.fulfilled.type]: (state, action: PayloadAction<AreaState[]>) => {
      state.isLoading = false;
      state.areas = action.payload;
    },
    [getAreas.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAreas.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export default areasSlice.reducer;