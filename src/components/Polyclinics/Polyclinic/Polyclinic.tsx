import React from 'react';
import { PolyclinicState } from '../../../type/type';
import styles from './Polyclinic.module.scss';
import polyclinic2 from '../../../utils/pictures/polyclinic2.jpeg';
import polyclinic4 from '../../../utils/pictures/polyclinic4.jpg';
import { NavLink } from 'react-router-dom';

type PolyclinicProps = {
  polyclinic: PolyclinicState
}
const Polyclinic = ({polyclinic}: PolyclinicProps) => {
  const images: Record<string, string> = {
    polyclinic2: polyclinic2,
    polyclinic4: polyclinic4
  }
  return (
    <NavLink to={`/polyclinic/${polyclinic.numberPolyclinic}`} className={styles.polyclinicWrapper}>
      <img src={images[polyclinic.img]} alt={images[polyclinic.img]} className={styles.imgWrapper}/>
      <div className={styles.namePoliclinicWrapper}>
        <div>
          {polyclinic.namePolyclinic} №{polyclinic.numberPolyclinic}
        </div>
      </div>
    </NavLink>
  );
};

export default Polyclinic;