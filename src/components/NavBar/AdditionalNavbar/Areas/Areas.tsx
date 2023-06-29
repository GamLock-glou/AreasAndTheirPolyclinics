import React, { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { getAreas } from '../../../../store/reducers/ActionCreators';
import styles from './Areas.module.scss'

type AreasType = {
  onClickInNavBar: (a:string)=>void
}

const Areas: FC<AreasType> = ({onClickInNavBar}) => {
  // const dispatch = useAppDispatch();
  const {areas, error, isLoading} = useAppSelector(state => state.areasReducer);
  return (
    <div className={styles.areasContainer}>
      <div>
        Участки
      </div>
      <div className={styles.areasWrapper}>
        {areas.map(area =>
          <NavLink
            onClick={()=>onClickInNavBar('')}
            key={area.numberSection}
            to={`/areas/${area.numberSection}`}
            className={styles.areaWrapper}
          >{area.nameSection}</NavLink>)}
      </div>
    </div>
  );
};

export default Areas;