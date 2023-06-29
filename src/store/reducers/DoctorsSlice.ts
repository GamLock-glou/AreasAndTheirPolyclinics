import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { AreasDoctorState, DoctorState, ITypeAndDoctor, ITypeAreaDoctor, ITypeDoctor } from "../../type/type";
import { addDoctor, changeDoctor, getDoctors } from "./ActionCreators";

export interface DoctorsState {
  doctors: DoctorState[];
  areaDoctors: AreasDoctorState[]
  isLoading: boolean;
  error: string;
}

const initialState: DoctorsState = {
  doctors: [],
  areaDoctors: [],
  isLoading: false,
  error: '',
}

const selectDoctors = (state: RootState) => state.doctorsReducer;
const selectPolyclinics = (state: RootState) => state.polyclinicsReducer;
export const doctorsNameSelector = createSelector(selectDoctors, (state) => {
  const doctorsName = state.doctors.map(d => d.name);
  const areaDoctorsName = state.areaDoctors.map(d => d.name);
  return [...doctorsName, ...areaDoctorsName];
});
export const doctorsSelector = (value: number) =>
  createSelector([selectDoctors, selectPolyclinics], (stateDoctors, statePolyclinics) => {
  const area = statePolyclinics?.polyclinics.filter(p => p.numberPolyclinic === value)[0]?.numberArea;
  const doctors = stateDoctors.doctors.filter((d)=> d.numberPolyclinic === value);
  const areaDoctors = stateDoctors.areaDoctors.filter(d => d?.numberArea === area)
  return {areaDoctors, doctors}
})

export const getIdsDoctorsSelector = createSelector([selectDoctors], (state: DoctorsState) => {
  return {idDoctor: Number(state.doctors.at(-1)?.id) + 1, idAreaDoctor: Number(state.areaDoctors.at(-1)?.id) + 1}
});

export const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    changeInfoDoctor(state: any, action: PayloadAction<any>) {
      const index = state[action.payload.type].findIndex((d: DoctorState | AreasDoctorState) => d.name === action.payload.name);
      state[action.payload.type][index].schedule = action.payload.schedule;
    }
  },
  extraReducers: {
    [getDoctors.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.doctors = action.payload.doctors;
      state.areaDoctors = action.payload.areaDoctors;
    },
    [getDoctors.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getDoctors.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [changeDoctor.fulfilled.type]: (state: DoctorsState, action: PayloadAction<ITypeDoctor | ITypeAreaDoctor>) => {
      state[action.payload.type][action.payload.doctor.id] = action.payload.doctor;
    },
    [addDoctor.fulfilled.type]: (state: DoctorsState, action: PayloadAction<ITypeDoctor | ITypeAreaDoctor>) => {
      // @ts-ignore
      state[action.payload.type].push(action.payload.doctor)
    }
  }
})


export const {changeInfoDoctor} = doctorsSlice.actions;
export default doctorsSlice.reducer;