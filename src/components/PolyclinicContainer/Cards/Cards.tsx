import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { cardsFirstDataSelector } from '../../../store/reducers/CardsSlice';
import { ICardsFirstList } from '../../../type/type';
import Card from './Card/Card';
import styles from './Cards.module.scss';
import { Button, TextField } from '@mui/material';
import { useState } from 'react'
import { getSearchCards } from '../../../store/reducers/ActionCreators';


const Cards = () => {
  const dispatch = useAppDispatch();
  const [searchElement, setSerchElement] = useState<string>('');
  const onChangeSearchElement = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSerchElement(e.target.value)
  }
  const onClickSearchElement = () => {
    dispatch(getSearchCards(searchElement))
  }
  // trim()
  const cards: ICardsFirstList[] = useAppSelector(cardsFirstDataSelector);
  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cardsTitle}>
        Карточки пациентов
      </div>
      <div className={styles.searchContainer}>
        <TextField
          className={styles.searchTextField}
          label="Поискавая строка"
          variant="filled"
          value={searchElement}
          onChange={onChangeSearchElement}
        />
        <Button
          variant="contained"
          className={styles.searchButton}
          onClick={onClickSearchElement}
        >
          Поиск
        </Button>
      </div>
      {cards.map(card => <Card key={card.id} card={card}/>)}
    </div>
  );
};

export default Cards;