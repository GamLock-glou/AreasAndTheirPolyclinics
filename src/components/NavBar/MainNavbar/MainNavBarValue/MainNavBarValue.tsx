import React from 'react';
import styles from './MainNavBarValue.module.scss'
import classNames from 'classnames';

type MainNavBarValueType = {
  onClickInNavBar: (value: string) => void;
  clickedInValue: string
  entry: string[]
}

const MainNavBarValue = ({entry, onClickInNavBar, clickedInValue}: MainNavBarValueType) => {
  const isActive = entry[0] === clickedInValue;
  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if(isActive) {
      onClickInNavBar('');
      return
    }
    onClickInNavBar(entry[0])
  }
  return (
    <div
      key={entry[0]}
      onClick={onClick}
      className={classNames(
        styles.linkWrapper,
        {[styles.linkWrapperActive]: isActive}
      )}
    >
      {entry[1]} <div className={isActive ? styles.arrowUp : styles.arrowDown}>⮟</div>
    </div>
  );
};

export default MainNavBarValue;