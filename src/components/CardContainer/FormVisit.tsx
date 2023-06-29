import { Button, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import CustomSelect from '../../utils/components/CustomSelect/CustomSelect';
import styles from './CardContainer.module.scss'
import { doctorsNameSelector } from '../../store/reducers/DoctorsSlice';
import { ICard } from '../../type/type';
import { addVisit } from '../../store/reducers/ActionCreators';
import SendIcon from '@mui/icons-material/Send';
import moment from 'moment';


type FormVisitType = {
  onClickVisitButton: () => void;
  card: ICard | undefined;
}

const FormVisit = ({ onClickVisitButton, card }: FormVisitType) => {
  const dispatch = useAppDispatch()
  const doctorsName = useAppSelector(doctorsNameSelector);
  return (
    <div className={styles.cardValuesContainer}>
      <div className={styles.textFieldWrapper}>
        <Formik
          initialValues={{
            dateOfVisit: '',
            complaint: '',
            preliminaryDiagnosis: '',
            appointments: '',
            discharged: '',
            doctor: ''
          }}
          onSubmit={values => {
            values.dateOfVisit = moment(values.dateOfVisit, "YYYYMMDD").format("DD.MM.YYYY");
            const newCard: any = {...card};
            newCard.intelligence = [
              ...newCard.intelligence,
              values
            ];
            dispatch(addVisit(newCard))
            onClickVisitButton();
          }}
        >
          {({ values: { dateOfVisit, complaint,
          preliminaryDiagnosis, appointments, discharged, doctor },
          handleChange, setFieldValue }): any => (
          <Form className={styles.formWrapper}>
            <TextField
              name={'dateOfVisit'}
              label="Дата посещения"
              type="date"
              value={dateOfVisit}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={handleChange}
            />
            <TextField
              name={'complaint'}
              label="Жалоба(-ы)"
              variant="filled"
              value={complaint}
              onChange={handleChange}
            />
            <TextField
              name={'preliminaryDiagnosis'}
              label="Предварительный диагноз"
              variant="filled"
              value={preliminaryDiagnosis}
              onChange={handleChange}
            />
            <TextField
              name={'appointments'}
              label="Назначения"
              variant="filled"
              value={appointments}
              onChange={handleChange}
            />
            <TextField
              name={'discharged'}
              label="Больничный лист"
              variant="filled"
              value={discharged}
              onChange={handleChange}
            />
            <CustomSelect
              valueKey='doctor'
              setFieldValue={setFieldValue}
              type='Врач'
              value={doctor}
              menu={doctorsName}
            />
            <Button type="submit" color="success" variant="contained" endIcon={<SendIcon />}>
              Отправить
            </Button>
          </Form>)}
        </Formik>
      </div>
      <div onClick={onClickVisitButton}>
        Закрыть
      </div>
    </div>
  );
};

export default FormVisit;