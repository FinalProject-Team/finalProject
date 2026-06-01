import styles from "./InstructorCard.module.css";

export default function InstructorCard() {

  return (

    <div className={styles.card}>

      <h2 className={styles.heading}>
        Your Instructor
      </h2>

      <div className={styles.instructorInfo}>

        <img
          className={styles.avatar}
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Instructor"
        />

        <div>

          <h3 className={styles.name}>
            Alex Morgan
          </h3>

          <p className={styles.role}>
            Senior Frontend Engineer @ Google
          </p>

          <span className={styles.stats}>
            ⭐ 4.9 • 12,840 students
          </span>

        </div>

      </div>

    </div>
  );
}