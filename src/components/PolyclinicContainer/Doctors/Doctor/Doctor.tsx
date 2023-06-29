import React, { useState } from 'react';
import { AreasDoctorState, DoctorState, ScheduleState } from '../../../../type/type';
import styles from './Doctor.module.scss'
import { TextField, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { useAppDispatch } from '../../../../hooks/redux';
import { changeDoctor } from '../../../../store/reducers/ActionCreators';
import SendIcon from '@mui/icons-material/Send';

type DoctorType = {
  doctor: AreasDoctorState | DoctorState;
  type: string;
}

const Doctor = ({ doctor, type }: DoctorType) => {
  const [isEdit, setIsEdit] = useState(false);
  const [nameDoctor, setNameDoctor] = useState(doctor.name);
  const [isEditDoctorName, setIsEditDoctorName] = useState(false)
  const dispatch = useAppDispatch();
  const onClickEdit = () => {
    setIsEdit(!isEdit)
  }
  const onClickEditDoctorName = () => {
    setIsEditDoctorName(!isEditDoctorName)
  }
  const onChangeNameDoctor = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNameDoctor(e.target.value)
  }
  const saveNameDoctor = () => {
    const newDoctor = {...doctor};
    newDoctor.name = nameDoctor;
    dispatch(changeDoctor({doctor: newDoctor, type}))
    setIsEditDoctorName(!isEditDoctorName)
  }
  return (
    <div className={styles.doctorContainer}>
      <div onClick={onClickEdit} className={styles.editWrapper}>
        ✎
      </div>
      <div className={styles.doctorName}>
        {
          !isEditDoctorName ? <div>
            {doctor.name}
          </div> : <TextField
                    className={styles.doctorNameTextField}
                    id="standard-basic"
                    label="Имя врача"
                    variant="standard"
                    value={nameDoctor}
                    onChange={onChangeNameDoctor}
                  />
        }
        {
          !isEditDoctorName ?
          <div
            onClick={onClickEditDoctorName}
            className={styles.changeDoctorName}
          >
            ✎
          </div> : <div className={styles.symbolsDoctorName}>
            <div
              onClick={saveNameDoctor}
              className={`${styles.symbolDoctorName} ${styles.saveSymbolDoctorName}`}
            >✓</div>
            <div
              onClick={onClickEditDoctorName}
              className={`${styles.symbolDoctorName} ${styles.cancellationSymbolDoctorName}`}
            >✖</div>
          </div>
        }
      </div>
      <div>
        {!isEdit && doctor.schedule.map(s => <div key={s.dayWeek} className={styles.scheduleContainer}>
          <div className={styles.dayWeekWrapper}>{s.dayWeek}</div>
          <div>
            <div>Поликлиника: {s.nameAndNumberPolyclinic}</div>
            <div>Время работы: {s.receptionHours}</div>
            <div>Кабинет: {s.cabinetNumber}</div>
          </div>
        </div>)}
        {isEdit &&
          <Formik
            initialValues={{
              schedule: doctor.schedule
            }}
            onSubmit={values => {
              const newDoctor = {...doctor};
              newDoctor.schedule = [...values.schedule];
              dispatch(changeDoctor({doctor: newDoctor, type}))
              setIsEdit(false)
            }}
          >
            {({values: {schedule}, handleChange}): any => (
              <Form>
                {schedule.map((s: ScheduleState, idx: number) => <div key={s.dayWeek} className={styles.scheduleContainer}>
                  <div className={styles.dayWeekWrapper}>{s.dayWeek}</div>
                  <TextField
                    className={styles.textField}
                    id="filled-basic"
                    label="Поликлиника"
                    name={`schedule[${idx}].nameAndNumberPolyclinic`}
                    onChange={handleChange}
                    variant="filled"
                    value={s.nameAndNumberPolyclinic}
                  />
                  <TextField
                    className={styles.textField}
                    name={`schedule[${idx}].receptionHours`}
                    label="Время работы"
                    variant="filled"
                    value={schedule[idx].receptionHours}
                    onChange={handleChange}
                  />
                  <TextField
                    className={styles.textField}
                    id="filled-basic"
                    label="Кабинет"
                    variant="filled"
                    value={s.cabinetNumber}
                    name={`schedule[${idx}].cabinetNumber`}
                    onChange={handleChange}
                    // error={!(s.cabinetNumber.trim() !== '')}
                  />
                </div>)}
                <Button type="submit" color="success" variant="contained" endIcon={<SendIcon />}>
                  Отправить
                </Button>
              </Form>
            )}
          </Formik>
        }
      </div>
    </div>
  );
};

export default Doctor;