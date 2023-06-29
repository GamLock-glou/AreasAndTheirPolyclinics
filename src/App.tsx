import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import RoutersMain from './routers/RoutersMain';
import "@fontsource/lato";
import { useAppDispatch } from './hooks/redux';
import { getAreas, getCards, getDoctors, getPolyclinics } from './store/reducers/ActionCreators';
import AdaptiveNavbar from './components/NavBar/AdaptiveNavbar/AdaptiveNavbar';

function App() {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(getAreas());
    dispatch(getDoctors());
    dispatch(getCards());
    dispatch(getPolyclinics())
  },[dispatch])
  return (
    <div className="app">
      <NavBar />
      <AdaptiveNavbar />
      <RoutersMain />
    </div>
  );
}

export default App;
