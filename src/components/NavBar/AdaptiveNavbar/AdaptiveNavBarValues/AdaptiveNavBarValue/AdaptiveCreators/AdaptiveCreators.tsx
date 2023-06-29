import React, { FC } from "react";
import styles from "../../AdaptiveNavBarValues.module.scss";
import { IAdaptiveValue } from "../../../../../../type/type";
import cn from "classnames";
import { NavLink } from "react-router-dom";

export const AdaptiveCreators: FC<IAdaptiveValue> = ({
  activeValue,
  setActiveValue,
  handleClickInLink,
}) => {
  const keyValue = "creator";
  const liArray = [
    { link: "card", value: "Карточки" },
    { link: "doctor", value: "Врача" },
  ];
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
        Создание
        <div className={isActive ? styles.arrowUp : styles.arrowDown}>⮟</div>
      </div>
      {isActive && (
        <ul className={styles.ulValues}>
          {liArray.map((info) => (
            <li key={info.value} className={styles.liValue}>
              <NavLink
                onClick={handleClickInLink}
                className={styles.link}
                to={`/creator/${info.link}`}
              >
                {info.value}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
