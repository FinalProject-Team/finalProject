import styles from "./PriceCard.module.css";

export default function PriceCard({ course }) {

  return (

    <div className={styles.card}>

      <h2 className={styles.price}>
        ${course.price}
      </h2>

      <span className={styles.level}>
        {course.level}
      </span>

      <button className={styles.button}>
        Enroll Now
      </button>

      <p className={styles.guarantee}>
        Full lifetime access
      </p>
<ul className={styles.features}>

  <li>
    <span>✔</span>
    {course.duration}
  </li>

  <li>
    <span>✔</span>
    {course.lessons.length} lessons
  </li>

  <li>
    <span>✔</span>
    {course.students}+ students
  </li>

  <li>
    <span>✔</span>
    Certificate included
  </li>

</ul>

    </div>
  );
}