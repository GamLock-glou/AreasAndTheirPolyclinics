import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Creator.module.scss'

type CreatorType = {
  onClickInNavBar: (a:string)=>void
}

const Creator: FC<CreatorType> = ({onClickInNavBar}) => {
  const creatorValue = [
    {
      link: 'card',
      value: 'Карточки',
    },
    {
      link: 'doctor',
      value: 'Врача',
    },
  ]
  return (
    <div className={styles.creatorContainer}>
      <div>
        Создание
      </div>
      <div className={styles.creatorWrapper}>
        {creatorValue.map(info =>
          <NavLink
            onClick={()=>onClickInNavBar('')}
            key={info.link}
            to={`/creator/${info.link}`}
            className={styles.creatorWrapper}
          >{info.value}</NavLink>)}
      </div>
    </div>
  );
};

export default Creator;