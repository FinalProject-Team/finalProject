import { useState } from "react";

import styles from "./RoadmapSection.module.css";

import { FaChevronDown } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export default function RoadmapSection({ course }) {

  const [openLesson, setOpenLesson] = useState(null);

  const toggleLesson = (id) => {

    if (openLesson === id) {

      setOpenLesson(null);

    } else {

      setOpenLesson(id);

    }
  };

  return (

    <div className={styles.roadmap}>

      <h2 className={styles.title}>
        Course Roadmap
      </h2>

      <div className={styles.timeline}>

        {course.lessons.map((lesson, index) => {

          /* LOCK LOGIC */

          const isLocked =
            !lesson.isFree && !course.isPurchased;

          return (

            <div
              key={lesson.id}
              className={styles.lessonWrapper}
            >

              {/* LINE */}

              {
                index !== course.lessons.length - 1 && (
                  <div className={styles.line}></div>
                )
              }

              {/* DOT */}

              <div className={styles.dot}></div>

              {/* CARD */}

              <div
                className={`${styles.lessonCard}
                ${isLocked ? styles.locked : ""}`}

                onClick={() => {

                  if (isLocked) return;

                  toggleLesson(lesson.id);

                }}
              >

                {/* HEADER */}

                <div className={styles.lessonHeader}>

                  <div className={styles.lessonLeft}>

                    <div className={styles.number}>
                      {lesson.id}
                    </div>

                    <div>

                      <h3>{lesson.title}</h3>

                      <p>{lesson.duration}</p>

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className={styles.lessonRight}>

                    {

                      lesson.isFree ? (

                        <span className={styles.badge}>
                          Free Preview
                        </span>

                      ) : (

                        <span className={styles.lockBadge}>

                          <FaLock />

                          Locked

                        </span>

                      )
                    }

                    <FaChevronDown
                      className={
                        openLesson === lesson.id
                          ? styles.rotate
                          : ""
                      }
                    />

                  </div>

                </div>

                {/* VIDEO */}

                {
                  openLesson === lesson.id &&
                  !isLocked && (

                    <div className={styles.videoBox}>

                      <iframe
                        src={lesson.videoUrl}
                        title={lesson.title}
                        allowFullScreen
                      ></iframe>

                    </div>
                  )
                }

              </div>

            </div>
          );

        })}

      </div>

    </div>
  );
}