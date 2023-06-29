import React, { useEffect } from 'react';
import {PathMatch, useMatch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAreas } from '../../store/reducers/ActionCreators';
import { AreaState, PolyclinicState } from '../../type/type';
import Polyclinic from './Polyclinic/Polyclinic';
import styles from './Polyclinics.module.scss'

type PolyclinicsType = {
  to: string
}

const Polyclinics = ({ to }: PolyclinicsType) => {
  const match: PathMatch<"number"> | null= useMatch(to);
  const {polyclinics, error, isLoading} = useAppSelector(state => state.polyclinicsReducer);
  const newPolyclinics: PolyclinicState[] = polyclinics.filter(polyclinic => polyclinic?.numberArea === Number(match?.params?.number))
  return (
    <div className={styles.polyclinicsContainer}>
      <div className={styles.polyclinicsContainerTitle}>
        Поликлиники
      </div>
      {
        isLoading ?
          <div>Loading...</div> :
          <div className={styles.polyclinicsWrapper}>
            {newPolyclinics?.map((polyclinic: PolyclinicState) => {
              return <Polyclinic polyclinic={polyclinic} key={polyclinic.numberPolyclinic}/>
            })}
          </div>
      }
    </div>
  );
};

export default Polyclinics;