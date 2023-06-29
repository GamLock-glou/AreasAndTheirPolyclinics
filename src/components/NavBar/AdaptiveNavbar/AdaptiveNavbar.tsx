import React, { useState, useEffect } from "react";
import styles from "./AdaptiveNavbar.module.scss";
import cn from "classnames";
import { AdaptiveNavBarSvg } from "./AdaptiveNavBarSvg/AdaptiveNavBarSvg";
import { AdaptiveNavBarValues } from "./AdaptiveNavBarValues/AdaptiveNavBarValues";


// FIXME: kal with animation, change!
function AdaptiveNavbar() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isHiddenMenu, setIsHiddenMenu] = useState<boolean>(true);
  useEffect(() => {
    if (isActive) {
      document.body.style.overflowY = "hidden";
    }
    if (!isActive) {
      document.body.style.overflowY = "scroll";
    }
  }, [isActive]);
  const handleBtn = () => {
    if(!isActive) {
      setIsHiddenMenu(false)
    }
    setIsActive((pr) => !pr);
  };
  return (
    <React.Fragment>
      <div
        className={cn(styles.btn)}
        onClick={handleBtn}
      >
        <AdaptiveNavBarSvg />
      </div>
      <div
        onClick={handleBtn}
        className={cn({ [styles.container]: !isHiddenMenu })}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(styles.wrapper, { [styles.active]: isActive })}
          onTransitionEnd={() => !isActive && setIsHiddenMenu(true)}
        >
          <div onClick={handleBtn} className={styles.btn}>
            <AdaptiveNavBarSvg />
          </div>
          {isActive && <AdaptiveNavBarValues setIsActive={setIsActive} />}

        </div>
      </div>
    </React.Fragment>
  );
}

export default AdaptiveNavbar;
