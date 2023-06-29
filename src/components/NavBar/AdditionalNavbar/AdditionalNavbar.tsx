import React, { ReactElement } from 'react';
import About from './About/About';
import styles from './AdditionalNavbar.module.scss';
import Areas from './Areas/Areas';
import classNames from 'classnames'
import Creator from './Creator/Creator';

type AdditionalNavbarType = {
  clickedInValue: string
  onClickInNavBar: (a:string)=>void
}

const AdditionalNavbar = ({clickedInValue, onClickInNavBar}: AdditionalNavbarType) => {
  const components: Record<string, ReactElement> = {
    areas: <Areas onClickInNavBar={onClickInNavBar} />,
    about: <About/>,
    creater: <Creator onClickInNavBar={onClickInNavBar} />
  }
  return (
    <div className={classNames(styles.additionalNavbarWrapper, {[styles.none]: clickedInValue === ''})}>
      {components[clickedInValue]}
    </div>
  );
};

export default AdditionalNavbar;