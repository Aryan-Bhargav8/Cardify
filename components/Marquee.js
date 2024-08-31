// components/Marquee.js

import React from 'react';
import styles from './Marquee.module.css';

const Marquee = ({ text }) => {
  return (
    <div className={styles.marquee}>
      <div className={styles.marqueeContent}>
        {text} &nbsp; &nbsp; {text}
      </div>
    </div>
  );
};

export default Marquee;