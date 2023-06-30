import React from 'react';
import symbolPolyclinic from '../../../utils/pictures/symbolPolyclinic.jpg'
import telegram from '../../../utils/pictures/telegram.png'
import gitHub from '../../../utils/pictures/github.png'
import { NavLink } from 'react-router-dom';
import styles from './MainNavBar.module.scss'
import MainNavBarValue from './MainNavBarValue/MainNavBarValue';

type MainNavBarType = {
  onClickInNavBar: (value: string) => void;
  clickedInValue: string
}

const MainNavBar = ({onClickInNavBar, clickedInValue}: MainNavBarType) => {
  const navBarValue = {creater: 'Создание', areas: 'Участки'};
  return (
    <>
      <div className={styles.navBarLeftWrapper}>
        <NavLink to={'/'} className={styles.pictureWrapper}>
          <img src={symbolPolyclinic} alt='myPhoto' className={styles.picture} />
        </NavLink>
        <div className={styles.linksWrapper}>
          {
            Object.entries(navBarValue).map(entry =>
              <MainNavBarValue
                key={entry[0]}
                entry={entry}
                onClickInNavBar={onClickInNavBar}
                clickedInValue={clickedInValue}
              />
            )}
        </div>
      </div>
      <div className={styles.navBarRightWrapper}>
        <a href={'https://t.me/Eugene_Jesus'} className={styles.socialsWrapper}>
          <img src={telegram} alt='telegram' className={styles.picture} />
        </a>
        <a href={'https://github.com/GamLock-glou'} className={styles.socialsWrapper}>
          <img src={gitHub} alt='github' className={styles.picture} />
        </a>
      </div>
    </>
  );
};

export default MainNavBar;