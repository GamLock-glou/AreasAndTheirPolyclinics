import React, { useCallback, useEffect, useState } from "react";
import { useOutsideClick } from "../../utils/hooks/useOutsideClick";
import AdditionalNavbar from "./AdditionalNavbar/AdditionalNavbar";
import MainNavBar from "./MainNavbar/MainNavBar";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  const [clickedInValue, setClickedInValue] = useState<string>("");
  const onClickInNavBar = useCallback(
    (value: string) => setClickedInValue(value),
    []
  );
  const ref: React.MutableRefObject<HTMLElement | undefined> = useOutsideClick({
    callback: onClickInNavBar,
  });
  return (
    <div
      className={styles.navBarWrapper}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <MainNavBar
        onClickInNavBar={onClickInNavBar}
        clickedInValue={clickedInValue}
      />
      <AdditionalNavbar
        onClickInNavBar={onClickInNavBar}
        clickedInValue={clickedInValue}
      />
    </div>
  );
};

export default NavBar;
