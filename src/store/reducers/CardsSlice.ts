import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ICard, ICardsFirstList } from "../../type/type";
import { getCards, addCard, addVisit, getSearchCards } from "./ActionCreators";

interface CardsState {
  cards: ICard[];
  isLoading: boolean;
  error: string;
}

const initialState: CardsState = {
  cards: [],
  isLoading: false,
  error: '',
}

const selectCards = (state: RootState) => state.cardsReducer.cards;
export const cardsIntelligenceDataSelector = (number: number) => createSelector([selectCards], (cards: ICard[]): ICard | undefined => {
  return cards.find(c => c.numberCard === number)
})

export const getNumberCardSelector = createSelector([selectCards], (cards: ICard[]): any => {
  return {numberCard: Number(cards.at(-1)?.numberCard) + 1, id: Number(cards.at(-1)?.id) + 1}
})

export const cardsFirstDataSelector = createSelector([selectCards], (cards: ICard[]): ICardsFirstList[] => {
  const newData = cards.map(card => {
    const {numberCard, name, address, gender, age, insurancePolicyNumber, createDateCards, id} = card;
    return {numberCard, name, address, gender, age, insurancePolicyNumber, createDateCards, id};
  });
  return newData
})

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getCards.fulfilled.type]: (state, action: PayloadAction<ICard[]>) => {
      state.isLoading = false;
      state.cards = action.payload;
    },
    [getSearchCards.fulfilled.type]: (state, action: PayloadAction<ICard[]>) => {
      state.isLoading = false;
      state.cards = action.payload;
    },
    [getCards.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getCards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addCard.fulfilled.type]: (state, action: PayloadAction<ICard>) => {
      state.cards.push(action.payload);
    },
    [addVisit.fulfilled.type]: (state, action: PayloadAction<ICard>) => {
      state.cards[action.payload.id] = action.payload;
    },
  }
})


export const {actions} = cardsSlice;
export default cardsSlice.reducer;