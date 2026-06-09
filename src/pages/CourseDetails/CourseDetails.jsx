import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../../components/Header/Header";
import InstructorCard from "../../components/InstructorCard/InstructorCard";
import StatsCards from "../../components/StatsCards/StatsCards";
import RoadmapSection from "../../components/Roadmap/RoadmapMilestones/RoadmapMilestones";
import PriceCard from "../../components/PriceCard/PriceCard";

import courses from "../../data/coursesData";
import styles from "./CourseDetails.module.css";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      if (!id) {
        setCourse(courses[0]);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`https://final-project-backend-production-214a.up.railway.app/api/courses/${id}`);
        if (mounted) setCourse(res.data);
      } catch (err) {
        // fallback to local data
        const local = courses.find((c) => String(c.id) === String(id)) || courses[0];
        if (mounted) setCourse(local);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className={styles.page}>Loading…</div>;
  if (!course) return <div className={styles.page}>Course not found.</div>;

  return (
    <div className={styles.page}>
      <Header course={course} />

      <div className={styles.contentWrapper}>
        <div className={styles.leftSection}>
          <InstructorCard />
          <StatsCards course={course} />
          <RoadmapSection course={course} />
        </div>

        <div className={styles.rightSection}>
          <PriceCard course={course} />
        </div>
      </div>
    </div>
  );
}