import styles from "./Header.module.css";

import { FaArrowLeft } from "react-icons/fa";

export default function Header({ course }) {

  return (

    <header
      className={styles.header}

      style={{
        backgroundImage: `url(${course.image})`,
      }}
    >

      {/* Overlay */}
      <div className={styles.overlay}></div>

      {/* Content */}
      <div className={styles.content}>

        {/* Back Button */}
        <div className={styles.backButton}>

          <FaArrowLeft />

          <span>Back to Courses</span>

        </div>

        {/* Tags */}
        <div className={styles.tags}>

          <span className={styles.level}>
            {course.level}
          </span>

          <span className={styles.duration}>
            {course.duration}
          </span>

        </div>

        {/* Title */}
        <h1 className={styles.title}>
          {course.title}
        </h1>

        {/* Description */}
        <p className={styles.description}>
          {course.description}
        </p>

      </div>

    </header>
  );
}