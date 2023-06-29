import { combineReducers, configureStore } from "@reduxjs/toolkit";
import areasReducer from "./reducers/AreasSlice";
import polyclinicsReducer from "./reducers/PolyclinicsSlice";
import doctorsReducer from "./reducers/DoctorsSlice";
import cardsReducer from "./reducers/CardsSlice";

const rootReducer = combineReducers({
  areasReducer,
  polyclinicsReducer,
  doctorsReducer,
  cardsReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
