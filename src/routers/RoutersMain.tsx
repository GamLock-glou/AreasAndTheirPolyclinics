import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CardContainer from '../components/CardContainer/CardContainer';
import CreatorCard from '../components/Creators/CreatorCard/CreatorCard';
import MainPage from '../components/MainPage/MainPage';
import PolyclinicContainer from '../components/PolyclinicContainer/PolyclinicContainer';
import Polyclinics from '../components/Polyclinics/Polyclinics';
import CreatorDoctor from '../components/Creators/CreatorDoctor/CreatorDoctor';

const RoutersMain = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path='/creator/card' element={<CreatorCard />} />
      <Route path='/creator/doctor' element={<CreatorDoctor />} />
      <Route path="/areas/:number" element={<Polyclinics to="/areas/:number" />} />
      <Route path="/polyclinic/:number" element={<PolyclinicContainer to="/polyclinic/:number" />} />
      <Route path="/card/:number" element={<CardContainer to="/card/:number" />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};

export default RoutersMain;