import { Button, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addCard } from '../../../store/reducers/ActionCreators';
import { getNumberCardSelector } from '../../../store/reducers/CardsSlice';
import CustomSelect from '../../../utils/components/CustomSelect/CustomSelect';
import styles from './CreatorCard.module.scss'
import SendIcon from '@mui/icons-material/Send';
import moment from 'moment';


const CreatorCard = () => {
  const dispatch = useAppDispatch();
  const valuesAuto = useAppSelector(getNumberCardSelector);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return (
    <div className={styles.creatorCardContainer}>
      <div className={styles.creatorCardContainerTitle}>
        Создание карточки
      </div>
        <Formik
          enableReinitialize
          initialValues={{
            id: valuesAuto.id,
            numberCard: valuesAuto.numberCard,
            name: '',
            address: '',
            gender: '',
            age: '',
            insurancePolicyNumber: '',
            createDateCards: new Date().toLocaleString("ru", options),
            intelligence: []
          }}
          onSubmit={values => {
            values.age = moment(values.age, "YYYYMMDD").format("DD.MM.YYYY");
            dispatch(addCard(values))
          }}
        >
          {({ values: { numberCard, name, address, gender, age, insurancePolicyNumber, createDateCards},
          handleChange, setFieldValue }): any => (
          <Form className={styles.formWrapper}>
            <TextField
              name={'numberCard'}
              label="Номер карты"
              variant="filled"
              disabled
              value={numberCard ? numberCard : ''}
            />
            <TextField
              name={'name'}
              label="ФИО"
              variant="filled"
              value={name}
              onChange={handleChange}
            />
            <TextField
              name={'address'}
              label="Адрес"
              variant="filled"
              value={address}
              onChange={handleChange}
            />
            <CustomSelect
              setFieldValue={setFieldValue}
              type='Пол'
              valueKey='gender'
              value={gender}
              menu={['мужской', 'женский', 'другой (дэбил)']}
            />
            <TextField
              name={'age'}
              label="День рождения"
              type="date"
              value={age}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={handleChange}
            />
            {/* <TextField
              name={'age'}
              label="День рождения"
              variant="filled"
              value={age}
              onChange={handleChange}
            /> */}
            <TextField
              name={'insurancePolicyNumber'}
              label="Номер страхового полиса"
              variant="filled"
              value={insurancePolicyNumber}
              onChange={handleChange}
            />
            <Button type="submit" color="success" variant="contained" endIcon={<SendIcon />}>
              Отправить
            </Button>
          </Form>)}
        </Formik>
      </div>
  );
};

export default CreatorCard;