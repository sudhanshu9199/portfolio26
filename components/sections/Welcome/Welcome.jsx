import React from 'react';
import Image from 'next/image';
import styles from './Welcome.module.scss';
import theBoyImage from '../../../public/theBoy.png';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.welcome}>
        <p>Welcome to my</p>
      </div>
        <div className={styles.topImageElem}>
          <Image className={styles.theBoyImage} src={theBoyImage} alt='The Boy' />
        </div>
    </section>
  );
};

export default Hero;
