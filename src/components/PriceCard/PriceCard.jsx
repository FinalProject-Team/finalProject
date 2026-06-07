import styles from "./PriceCard.module.css";

export default function PriceCard({ course }) {
  const lessonsCount = course.lessons?.length || course.lessons_count || 0;
  const studentsCount = course.students || course.students_count || 0;

  return (
    <div className={styles.card}>
      <h2 className={styles.price}>{course.price} EGP</h2>

      <span className={styles.level}>{course.level}</span>

      <button className={styles.button}>Enroll Now</button>

      <p className={styles.guarantee}>Full lifetime access</p>

      <ul className={styles.features}>
        <li><span>✔</span>{course.duration}</li>
        <li><span>✔</span>{lessonsCount} lessons</li>
        <li><span>✔</span>{studentsCount}+ students</li>
        <li><span>✔</span>Certificate included</li>
      </ul>
    </div>
  );
}