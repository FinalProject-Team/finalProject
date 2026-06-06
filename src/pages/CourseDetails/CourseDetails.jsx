import Header from "../../components/Header/Header";
import InstructorCard from "../../components/InstructorCard/InstructorCard";

import StatsCards from "../../components/StatsCards/StatsCards";
import RoadmapSection from "../../components/Roadmap/RoadmapMilestones/RoadmapMilestones";

import PriceCard from "../../components/PriceCard/PriceCard";

import courses from "../../data/coursesData";

import styles from "./CourseDetails.module.css";

export default function CourseDetails() {

  const course = courses[0];

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