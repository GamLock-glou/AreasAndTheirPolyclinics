import React, { useEffect } from 'react';
import video from '../../utils/video/video.mp4';
import styles from './MainPage.module.scss'

const MainPage = () => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    }
  }, []);
  return (
    <div className={styles.videoWrapper}>
      <video id="autoplay" muted loop autoPlay className={styles.video}>
        <source src={video} type="video/mp4" />
      </video>
      <div className={styles.videoColor} />
      <div className={styles.textOnVideoWrapper}>
        <div className={styles.textOnVideo}>Коллекция участков и их поликлиник</div>
      </div>
    </div>
  );
};

export default MainPage;