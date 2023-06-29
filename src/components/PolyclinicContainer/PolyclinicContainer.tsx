import React, { useState } from 'react';
import { useMatch } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { PolyclinicState } from '../../type/type';
import Cards from './Cards/Cards';
import Doctors from './Doctors/Doctors';
import styles from './PolyclinicContainer.module.scss'

type PolyclinicContainerType = {
  to: string;
}

type breadcrumbsType = {
  doctors?: boolean,
  cards?: boolean
}

const PolyclinicContainer = ({to}: PolyclinicContainerType) => {
  const [breadcrumbs, setBreadcrumbs] = useState<breadcrumbsType>({doctors: true})
  const onClick = (v: keyof breadcrumbsType) => {
    if(breadcrumbs[v]) {
      setBreadcrumbs({[v]: false})
      return;
    }
    setBreadcrumbs({[v]: true})
  }
  const match = useMatch(to);
  const {polyclinics} = useAppSelector(state => state.polyclinicsReducer);
  const polyclinic: PolyclinicState | undefined = polyclinics.find(p => p.numberPolyclinic === Number(match?.params.number))
  return (
    <div className={styles.polyclinicsContainer}>
      <div className={styles.polyclinicContainerTitle}>
        {polyclinic?.namePolyclinic} №{polyclinic?.numberPolyclinic}
      </div>
      <div className={styles.breadcrumbsContainer}>
        <div onClick={() => onClick('doctors')}>Расписание врачей</div>
        <div onClick={() => onClick('cards')}>Карточки пациентов</div>
      </div>
      {
        breadcrumbs['doctors'] &&
        <Doctors number={Number(match?.params.number)} />
      }
            {
        breadcrumbs['cards'] &&
        <Cards />
      }
    </div>
  );
};

export default PolyclinicContainer;