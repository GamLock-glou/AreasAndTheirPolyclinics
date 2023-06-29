import React, { FC } from "react";
import styles from "../../AdaptiveNavBarValues.module.scss";
import { IAdaptiveValue } from "../../../../../../type/type";
import cn from "classnames";
import { useAppSelector } from "../../../../../../hooks/redux";
import { NavLink } from "react-router-dom";

export const AdaptiveAreas: FC<IAdaptiveValue> = (props) => {
  const { activeValue, setActiveValue, handleClickInLink } = props;
  const { areas, error, isLoading } = useAppSelector(
    (state) => state.areasReducer
  );
  const keyValue = "areas";
  const isActive = activeValue === keyValue;
  const handleClick = () => {
    setActiveValue(keyValue);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className={cn(styles.globalValues, { [styles.active]: isActive })}
      >
        Участки
        <div className={isActive ? styles.arrowUp : styles.arrowDown}>⮟</div>
      </div>
      {isActive && (
        <ul className={styles.ulValues}>
          {areas.map((area) => (
            <li key={area.nameSection} className={styles.liValue}>
              <NavLink
                onClick={handleClickInLink}
                className={styles.link}
                to={`${keyValue}/${area.numberSection}`}
              >
                {area.nameSection}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
