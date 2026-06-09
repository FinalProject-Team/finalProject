import styles from "./PriceCard.module.css";

export default function PriceCard({ course }) {
  const price = course?.price ?? 'Free';
  const level = course?.level ?? 'All levels';
  const duration = course?.duration ?? 'N/A';
  const lessonsCount = (course?.lessons && Array.isArray(course.lessons)) ? course.lessons.length : (course?.lessons_count ?? 0);
  const students = course?.students ?? 0;

  return (
    <div className={styles.card}>
      <h2 className={styles.price}>{price === 'Free' ? 'Free' : `$${price}`}</h2>

      <span className={styles.level}>{level}</span>

      <button className={styles.button}>Enroll Now</button>

      <p className={styles.guarantee}>Full lifetime access</p>

      <ul className={styles.features}>
        <li>
          <span>✔</span>
          {duration}
        </li>

        <li>
          <span>✔</span>
          {lessonsCount} lessons
        </li>

        <li>
          <span>✔</span>
          {students.toLocaleString()} students
        </li>

        <li>
          <span>✔</span>
          Certificate included
        </li>
      </ul>
    </div>
  );
}