import React from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { doctorsSelector } from '../../../store/reducers/DoctorsSlice';
import Doctor from './Doctor/Doctor';
import styles from './Doctors.module.scss'

type DoctorsType = {
  number: number;
}

const Doctors = ({number}: DoctorsType) => {
  const doctors = useAppSelector(doctorsSelector(number));
  return (
    <div className={styles.doctorsContainer}>
      <div className={styles.doctorsTitle}>
        Участковые врачи
      </div>
      {doctors.areaDoctors.map(d => <Doctor key={d.id} type='areaDoctors' doctor={d} />)}
      <div className={styles.doctorsTitle}>
        Врачи
      </div>
      {doctors.doctors.map(d => <Doctor key={d.id} type='doctors' doctor={d} />)}
    </div>
  );
};

export default Doctors;