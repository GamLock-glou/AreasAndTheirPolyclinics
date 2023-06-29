import React, { useState, useCallback, FC } from "react";
import styles from "./AdaptiveNavBarValues.module.scss";
import { NavLink } from "react-router-dom";
import { AdaptiveCreators } from "./AdaptiveNavBarValue/AdaptiveCreators/AdaptiveCreators";
import { AdaptiveAreas } from "./AdaptiveNavBarValue/AdaptiveAreas/AdaptiveAreas";

type AdaptiveNavBarValuesProps = {
  setIsActive: (value: boolean) => void;
};

export const AdaptiveNavBarValues: FC<AdaptiveNavBarValuesProps> = ({
  setIsActive,
}) => {
  const [activeValue, setActiveValue] = useState<string>("");
  const callback = (value: string) => {
    if (value === activeValue) {
      setActiveValue("");
      return;
    }
    setActiveValue(value);
  };
  const handleClickInValues = useCallback(callback, [activeValue]);
  const handleClickInLink = useCallback(() => setIsActive(false), []);
  return (
    <div className={styles.container}>
      <div className={styles.globalValues}>
        <NavLink
          onClick={handleClickInLink}
          className={styles.link}
          to="/"
        >
          Главная страница
        </NavLink>
      </div>
      <AdaptiveCreators
        activeValue={activeValue}
        handleClickInLink={handleClickInLink}
        setActiveValue={handleClickInValues}
      />
      <AdaptiveAreas
        activeValue={activeValue}
        handleClickInLink={handleClickInLink}
        setActiveValue={handleClickInValues}
      />
    </div>
  );
};
