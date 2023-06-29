import { createAsyncThunk } from "@reduxjs/toolkit";
import { AreasApi, CardsApi, DoctorsApi, PolyclinicsApi } from "../../api/queries";
import { AreaState, ICard, ITypeAndDoctor, PolyclinicState } from "../../type/type";


export const getAreas = createAsyncThunk(
  'areas',
  async (_, thunkApi) => {
    try {
      return await AreasApi.getAreas().then((data: AreaState[])=>{
        return data
      })
    } catch(e) {
      return thunkApi.rejectWithValue('Some Error')
    }
  }
)

export const getPolyclinics = createAsyncThunk<PolyclinicState[] | string>(
  'polyclinics',
  async (_, thunkApi) => {
    try {
      return await PolyclinicsApi.getPolyclinics().then((data: PolyclinicState[])=>{
        return data
      })
    }
    catch(e) {
      return thunkApi.rejectWithValue('Some Error')
    }
  }
)

export const getDoctors = createAsyncThunk(
  'doctors',
  async (_, thunkApi) => {
    try {
      const doctors = await DoctorsApi.getDoctors();
      const areaDoctors = await DoctorsApi.getAreaDoctors();
      return {doctors, areaDoctors}
    } catch(e) {
      return thunkApi.rejectWithValue('Some Error')
    }
  }
)

export const getCards = createAsyncThunk(
  'cards',
  async (_, thunkApi) => {
    try {
      return await CardsApi.getCards().then((data: ICard[])=>{
        return data
      });
    } catch(e) {
      return thunkApi.rejectWithValue('Some Error')
    }
  }
)

export const getSearchCards = createAsyncThunk(
  'searchCards',
  async (value: string, thunkApi) => {
    try {
      return await CardsApi.getSearchCards(value).then((data: ICard[])=>{
        return data
      });
    } catch(e) {
      return thunkApi.rejectWithValue('Some Error')
    }
  }
)

export const addCard =  createAsyncThunk(
  'addCard',
  async (values: ICard, thunkApi) => {
    try {
      return await CardsApi.addCard(values).then((data: ICard) => {
        return data
      })
    }
    catch(e) {
      return thunkApi.rejectWithValue('Some Error')
    }
  }
)

export const addVisit =  createAsyncThunk(
  'addVisit',
  async (values: ICard, thunkApi) => {
    try {
      return await CardsApi.addVisit(values).then((data: ICard) => {
        return data
      })
    }
    catch(e) {
      return thunkApi.rejectWithValue('Some Error')
    }
  }
)

export const changeDoctor =  createAsyncThunk(
  'changeSchedule',
  async (values: ITypeAndDoctor, thunkApi) => {
    try {
      return await DoctorsApi.changeDoctor(values).then((data: ICard) => {
        return {type: values.type, doctor: data}
      })
    }
    catch(e) {
      return thunkApi.rejectWithValue('Some Error')
    }
  }
)

export const addDoctor =  createAsyncThunk(
  'addDoctor',
  async (values: ITypeAndDoctor, thunkApi) => {
    try {
      return await DoctorsApi.addCard(values).then((data) => {
        return {type: values.type, doctor: data}
      })
    }
    catch(e) {
      return thunkApi.rejectWithValue('Some Error')
    }
  }
)
