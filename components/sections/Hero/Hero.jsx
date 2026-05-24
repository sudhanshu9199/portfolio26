import React from 'react'
import Image from 'next/image'
import styles from './Hero.module.scss'
import boyHandImage from '../../../public/boyHand.png'

const Hero = () => {
  return (
    <section className={styles.heroSection}>
        <div className={styles.boyHand}>
            <Image className={styles.boyHandImage} src={boyHandImage} alt="Boy Hand" />
        </div>
      <h2>My Projects & Portfolio Content</h2>
      <p>This section scrolls up and covers the Welcome section seamlessly!</p>
      {/* Add the rest of your page content here */}
    </section>
  )
}

export default Hero