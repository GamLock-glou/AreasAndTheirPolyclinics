import React, { useState } from 'react';
import { PathMatch, useMatch } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { cardsIntelligenceDataSelector } from '../../store/reducers/CardsSlice';
import styles from './CardContainer.module.scss'
import FormVisit from './FormVisit';

type CardContainerState = {
  to: string;
}

const CardContainer = ({ to }: CardContainerState) => {
  const match: PathMatch<string> | null = useMatch(to);
  const card = useAppSelector(cardsIntelligenceDataSelector(Number(match?.params?.number)));
  const [isClickedAddVisitButton, setIsClickedAddVisitButton] = useState(false);
  const onClickVisitButton = () => {
    setIsClickedAddVisitButton(!isClickedAddVisitButton)
  }
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardName}>
        Карточка пациента
      </div>
      <div className={styles.namePatient}>
        {card?.name}
      </div>
      { !isClickedAddVisitButton && <div
        className={styles.addVisitButton}
        onClick={onClickVisitButton}
      >
        Добавить посещение
      </div>}
      {isClickedAddVisitButton && <FormVisit card={card} onClickVisitButton={onClickVisitButton} />}
      {card?.intelligence.map((i) => <div key={`${i.dateOfVisit} ${i.doctor}`} className={styles.cardValuesContainer}>
        <div className={styles.cardValue}>
          Дата посещения: {i.dateOfVisit}
        </div>
        <div className={styles.cardValue}>
          Жалоба(-ы): {i.complaint}
        </div>
        <div className={styles.cardValue}>
          Предварительный диагноз: {i.preliminaryDiagnosis}
        </div>
        <div className={styles.cardValue}>
          Назначения: {i.appointments}
        </div>
        <div className={styles.cardDischargedWrapper}>
          <div>Больничный лист:</div>
          {i.discharged ?
            <div className={styles.cardDischarged}>
              до {i.discharged}
            </div> :
            <div>Нет</div>}
        </div>
        <div className={styles.cardValue}>
          Врач: {i.doctor}
        </div>
      </div>)}
    </div>
  );
};

export default CardContainer;