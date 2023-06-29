import React from 'react';
import { NavLink } from 'react-router-dom';
import { ICardsFirstList } from '../../../../type/type';
import styles from './Card.module.scss';

type CardType ={
  card: ICardsFirstList;
}

const Card = ({card}: CardType) => {
  return (
    <div className={styles.cardContainer}>
      <NavLink to={`/card/${card.numberCard}`} className={styles.openCard}>
        →
      </NavLink>
      <div className={styles.cardValue}>
        Номер карточки: {card.numberCard}
      </div>
      <div className={styles.cardValue}>
        ФИО: {card.name}
      </div>
      <div className={styles.cardValue}>
        Пол: {card.gender}
      </div>
      <div className={styles.cardValue}>
        Дата рождения: {card.age}
      </div>
      <div className={styles.cardValue}>
        Адрес: {card.address}
      </div>
      <div className={styles.cardValue}>
        Дата заполнения карточки: {card.createDateCards}
      </div>
      <div className={styles.cardValue}>
        Номер страхового полюса: {card.insurancePolicyNumber}
      </div>
    </div>
  );
};

export default Card;