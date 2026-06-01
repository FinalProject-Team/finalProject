import React from 'react';
import styles from './Career.module.css';
import myimage from "../../../assets/images/profile.png";

export default function Career() {
  return (
    <div className={styles.careerWrapper}>
    <div className={styles.centerContent}>
        <div className={styles.profileBanner}>
        <div className={styles.profileLeft}>
            <div className={styles.avatarWrapper}>
            <img src={myimage} alt="Profile" className={styles.avatar} />
            </div>
            <div className={styles.profileInfo}>
            <span className={styles.aiBadge}>AI Career Simulation</span>
            <h2>Meet Your Career Twin</h2>
            <p>Your AI-generated future self, built from your skills, trajectory, and 50,000+ career paths. This is where you're headed.</p>
            </div>
        </div>
        <div>
            <span className={styles.salaryAmount}>$260k</span>
            <span className={styles.salarySubText}>Peak salary prediction • +300% from today</span>
        </div>
        </div>

        <div className={styles.journeySection}>
        <h3>Your Transformation Journey</h3>
        <div className={styles.timelineRow}>
            
            <div className={styles.timelineCard}>
            <img src={myimage} alt="Today" className={styles.cardAvatar}/>
            <span className={styles.activeTimeLabel}>Today</span>
            <p className={styles.roleLabel}>Mid-Level Dev</p>
            <span className={styles.salaryLabel}>$85k/yr</span>
            </div>
            <div className={styles.arrowConnector}>›</div>
            <div className={styles.timelineCard}>
            <div className={styles.iconCircle}>🧠</div>
            <span className={styles.timeLabel}>+2 years</span>
            <p className={styles.roleLabel}>Senior Dev</p>
            <span className={styles.salaryLabel}>$120k/yr</span>
            </div>

            <div className={styles.arrowConnector}>›</div>

            <div className={`${styles.timelineCard} ${styles.starCard}`}>
            <div className={styles.iconCircle}>⭐</div>
            <span className={styles.starTimeLabel}>+5 years</span>
            <p className={styles.roleLabel}>Eng. Manager</p>
            <span className={styles.salaryLabel}>$180k/yr</span>
            </div>

            <div className={styles.arrowConnector}>›</div>

            <div className={styles.timelineCard}>
            <div className={styles.iconCircle}>👑</div>
            <span className={styles.timeLabel}>+8 years</span>
            <p className={styles.roleLabel}>Director Eng</p>
            <span className={styles.salaryLabel}>$260k+</span>
            </div>
        </div>
        </div>

        <div className={styles.splitGrid}>
        <div className={styles.innerCard}>
            <h4>Skills Evolution</h4>
            
            <p className={styles.sectionSectionTitle}>Current Skills</p>
            <div className={styles.tagGroup}>
            <span className={styles.tagActive}>React</span>
            <span className={styles.tagActive}>JavaScript</span>
            <span className={styles.tagActive}>HTML/CSS</span>
            <span className={styles.tagActive}>Git</span>
            <span className={styles.tagActive}>REST APIs</span>
            </div>

            <p className={styles.sectionSectionTitle}>To Unlock Next Level</p>
            <div className={styles.tagGroup}>
            <span className={styles.tagLock}>+ TypeScript</span>
            <span className={styles.tagLock}>+ System Design</span>
            <span className={styles.tagLock}>+ Node.js</span>
            <span className={styles.tagLock}>+ Docker</span>
            <span className={styles.tagLock}>+ Team Leadership</span>
            <span className={styles.tagLock}>+ Architecture Patterns</span>
            </div>
        </div>

        <div className={styles.innerCard}>
            <h4>AI Career Prediction</h4>
            <div className={styles.predictionList}>
            <div className={styles.predictRow}>
                <div className={styles.percentBox}>85%</div>
                <div className={styles.percentTextBox}>
                <h5>Promotion readiness</h5>
                <p>Needs TypeScript + System Design</p>
                </div>
            </div>

            <div className={styles.predictRow}>
                <div className={styles.percentBox}>94%</div>
                <div className={styles.percentTextBox}>
                <h5>Job market demand</h5>
                <p>High demand for your stack</p>
                </div>
            </div>

            <div className={styles.predictRow}>
                <div className={styles.percentBox}>+41%</div>
                <div className={styles.percentTextBox}>
                <h5>Salary growth potential</h5>
                <p>In next 12 months</p>
                </div>
            </div>

            <div className={styles.predictRow}>
                <div className={styles.textIndicator}>Strong</div>
                <div className={styles.percentTextBox}>
                <h5>Leadership trajectory</h5>
                <p>Top 15% of peers</p>
                </div>
            </div>
            </div>
        </div>

        </div>

        <p className={styles.timelineTitle}>Career Simulation Timeline</p>
        <div className={styles.miniTabs}>
        <span className={styles.tabItemActive}>Now</span>
        <span className={styles.tabItem}>+2 years</span>
        <span className={styles.tabItem}>+5 years</span>
        <span className={styles.tabItem}>+8 years</span>
        </div>

        <div className={styles.roleShowcase}>
        <div className={styles.roleShowcaseLeft}>
            <h4>Mid-Level Frontend Dev</h4>
            <div className={styles.miniBadgesGroup}>
            <span className={styles.miniBadge}>Remote</span>
            <span className={styles.miniBadge}>Full-time</span>
            <span className={styles.miniBadge}>US / EU</span>
            </div>
        </div>
        <span className={styles.showcaseSalary}>$85k</span>
        </div>

        <p className={styles.timelineTitle}>Jobs Available After Next Milestone</p>
        <div className={styles.jobContainer}>
        <div className={styles.jobItemCard}>
            <div className={styles.jobCardLeft}>
            <div className={styles.buildingIcon}>🏢</div>
            <div className={styles.jobMetaText}>
                <h5>Senior Frontend Engineer</h5>
                <p>Stripe</p>
            </div>
            </div>
            <div className={styles.jobCardRight}>
            <span className={styles.jobCardSalary}>$130k - $160k</span>
            <span className={styles.jobCardMatch}>92% match</span>
            </div>
        </div>

        <div className={styles.jobItemCard}>
            <div className={styles.jobCardLeft}>
            <div className={styles.buildingIcon}>🏢</div>
            <div className={styles.jobMetaText}>
                <h5>Senior React Developer</h5>
                <p>Linear</p>
        </div>
            </div>
            <div className={styles.jobCardRight}>
            <span className={styles.jobCardSalary}>$120k - $150k</span>
            <span className={styles.jobCardMatch}>89% match</span>
            </div>
        </div>

        <div className={styles.jobItemCard}>
            <div className={styles.jobCardLeft}>
            <div className={styles.buildingIcon}>🏢</div>
            <div className={styles.jobMetaText}>
                <h5>Frontend Tech Lead</h5>
                <p>Vercel</p>
            </div>
            </div>
            <div className={styles.jobCardRight}>
            <span className={styles.jobCardSalary}>$140k - $180k</span>
            <span className={styles.jobCardMatch}>85% match</span>
            </div>
        </div>
        </div>

        <div className={styles.actionBanner}>
        <p>Ready to become your Career Twin?</p>
        <button className={styles.actionBtn}>Start Next Course</button>
        </div>
    </div>
    </div>
)
}