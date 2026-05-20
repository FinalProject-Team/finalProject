import { useEffect, useRef, useState } from 'react';
import styles from './Stats.module.css';
import axios from 'axios';

const BASE_URL = 'https://final-project-backend-production-5fe7.up.railway.app/api';

const FALLBACK_STATS = [
  { value: 50000, suffix: '+', label: 'Active Students' },
  { value: 120,   suffix: '+', label: 'Expert Courses' },
  { value: 8500,  suffix: '+', label: 'Jobs Matched' },
  { value: 94,    suffix: '%', label: 'Success Rate' },
];

function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <div ref={ref}>{Number.isInteger(end) ? count.toLocaleString() : count.toFixed(1)}{suffix}</div>;
}

export default function Stats() {
  const [stats, setStats] = useState(FALLBACK_STATS);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [coursesRes, tracksRes] = await Promise.allSettled([
          axios.get(`${BASE_URL}/courses`),
          axios.get(`${BASE_URL}/tracks`),
        ]);

        const courses = coursesRes.status === 'fulfilled' && Array.isArray(coursesRes.value.data)
          ? coursesRes.value.data : [];

        const tracks = tracksRes.status === 'fulfilled' && Array.isArray(tracksRes.value.data)
          ? tracksRes.value.data : [];

        const totalStudents = courses.reduce((s, c) => s + (c.students_count || 0), 0);
        const validRatings = courses.filter(c => c.rating > 0);
        const avgRating = validRatings.length > 0
          ? validRatings.reduce((s, c) => s + c.rating, 0) / validRatings.length : 4.9;

        setStats([
          { value: totalStudents > 0 ? totalStudents : 50000, suffix: '+', label: 'Active Students' },
          { value: courses.length > 0 ? courses.length : 120,  suffix: courses.length > 0 ? '' : '+', label: 'Expert Courses' },
          { value: tracks.length > 0 ? tracks.length : 8500,   suffix: tracks.length > 0 ? '' : '+', label: tracks.length > 0 ? 'Learning Tracks' : 'Jobs Matched' },
          { value: Math.round(avgRating * 10), suffix: '%', label: 'Success Rate' },
        ]);
      } catch (err) {
        console.error('Stats fetch failed, using defaults:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className={styles.stats}>
      <div className={styles.statsContainer}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statValue}>
              <Counter end={stat.value} suffix={stat.suffix} />
            </div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
