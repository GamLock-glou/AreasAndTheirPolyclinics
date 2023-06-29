import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Form, Formik } from 'formik';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addDoctor } from '../../../store/reducers/ActionCreators';
import { getIdsDoctorsSelector } from '../../../store/reducers/DoctorsSlice';
import { numberAreasSelector, numberPolyclinicsSelector } from '../../../store/reducers/PolyclinicsSlice';
import CustomSelect from '../../../utils/components/CustomSelect/CustomSelect';
import { createSchedule } from '../../../utils/function/function';
import styles from './CreatorDoctor.module.scss'

const CreatorDoctor = () => {
  const dispatch = useAppDispatch();
  const valuesAuto = useAppSelector(getIdsDoctorsSelector);
  const numberPolyclinics = useAppSelector(numberPolyclinicsSelector)
  const numberAreas = useAppSelector(numberAreasSelector)
  return (
    <div className={styles.creatorCardContainer}>
      <div className={styles.creatorCardContainerTitle}>
        Создание врача
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          id: valuesAuto.idDoctor,
          position: 'Врач',
          name: '',
          numberArea: numberAreas[0],
          numberPolyclinic: numberPolyclinics[0],
          schedule: createSchedule(),
        }}
        onSubmit={values => {
          const newValues = {
            type: '',
            doctor: values
          }
          if (values.position === 'Участковый врач') {
            values.id = valuesAuto.idAreaDoctor;
            newValues.type = 'areaDoctors'
            // @ts-ignore
            delete values.numberPolyclinic
          } else if (values.position === 'Врач') {
            values.id = valuesAuto.idDoctor;
            newValues.type = 'doctors';
            // @ts-ignore
            delete values.numberArea
          }
          // @ts-ignore
          delete values.position
          newValues.doctor = values;
          // @ts-ignore
          dispatch(addDoctor(newValues))
        }}
      >
        {({ values: { name, position, numberArea, numberPolyclinic },
          handleChange, setFieldValue }): any => (
          <Form className={styles.formWrapper}>
            <CustomSelect
              setFieldValue={setFieldValue}
              type='Должность'
              valueKey='position'
              value={position}
              menu={['Врач', 'Участковый врач',]}
            />
            <TextField
              name={'name'}
              label="ФИО"
              variant="filled"
              value={name}
              onChange={handleChange}
            />
            {position === 'Участковый врач' && <CustomSelect
              setFieldValue={setFieldValue}
              type='Номер участка'
              valueKey='numberArea'
              value={numberArea ? String(numberArea) : ''}
              menu={numberAreas ? numberAreas : []}
            />}
            {position === 'Врач' && <CustomSelect
              setFieldValue={setFieldValue}
              type='Номер поликлиники'
              valueKey='numberPolyclinic'
              value={numberPolyclinic ? String(numberPolyclinic) : ''}
              menu={numberPolyclinics ? numberPolyclinics : []}
            />}
            <Button type="submit" color="success" variant="contained" endIcon={<SendIcon />}>
              Отправить
            </Button>
          </Form>)}
      </Formik>
    </div>
  );
};

export default CreatorDoctor;