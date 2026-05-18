import styles from './Features.module.css';

export default function Features() {
  const tracks = [
    {
      title: 'Frontend Development',
      description: 'Master modern web development from HTML foundations to advanced React applications with real-world projects.',
      level: 'Beginner',
      duration: '6 months',
      rating: 4.9,
      reviews: '12,840',
      skills: ['HTML', 'CSS', 'JavaScript', '+2'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop'
    },
    {
      title: 'Backend Development',
      description: 'Build scalable server-side applications with Node.js, databases, and cloud infrastructure.',
      level: 'Intermediate',
      duration: '7 months',
      rating: 4.8,
      reviews: '9,320',
      skills: ['Node.js', 'PostgreSQL', 'REST', '+2'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop'
    },
    {
      title: 'UI/UX Design',
      description: 'Create beautiful, user-centered digital experiences that convert and delight users.',
      level: 'Beginner',
      duration: '5 months',
      rating: 4.9,
      reviews: '15,600',
      skills: ['Figma', 'Prototyping', 'Research', '+1'],
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'
    },
    {
      title: 'AI & Machine Learning',
      description: 'Engineer intelligent systems using Python, TensorFlow, and cutting-edge AI architectures.',
      level: 'Advanced',
      duration: '9 months',
      rating: 4.9,
      reviews: '7,840',
      skills: ['Python', 'TensorFlow', 'PyTorch', '+2'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop'
    },
    {
      title: 'Cyber Security',
      description: 'Defend and attack digital systems using professional penetration testing and security frameworks.',
      level: 'Intermediate',
      duration: '8 months',
      rating: 4.8,
      reviews: '5,210',
      skills: ['Networking', 'Ethical Hacking', 'Crypto', '+2'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop'
    },
    {
      title: 'Mobile Development',
      description: 'Build cross-platform mobile apps for iOS and Android using React Native and Flutter.',
      level: 'Intermediate',
      duration: '7 months',
      rating: 4.7,
      reviews: '6,930',
      skills: ['React Native', 'Flutter', 'iOS', '+2'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop'
    }
  ];

  return (
    <section className={styles.features} id="tracks">
      <div className={styles.header}>
        <span className={styles.badgeSmall}>Learning Tracks</span>
        <h2 className={styles.title}>
          Find Your <span className={styles.gradient}>Perfect Track</span>
        </h2>
        <p className={styles.subtitle}>
          AI-curated learning paths designed with industry experts to take you from beginner to job-ready.
        </p>
      </div>

      <div className={styles.grid}>
        {tracks.map((track, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardImage}>
              <img src={track.image} alt={track.title} loading="lazy" />
              <div className={styles.levelBadge}>{track.level}</div>
              <div className={styles.duration}>{track.duration}</div>
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{track.title}</h3>
              <p className={styles.cardDescription}>{track.description}</p>

              <div className={styles.skills}>
                {track.skills.map((skill, i) => (
                  <span key={i} className={styles.skill}>{skill}</span>
                ))}
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.ratingBlock}>
                  <div className={styles.rating}>
                    <span className={styles.stars}>★★★★★</span>
                    <span className={styles.ratingValue}>{track.rating}</span>
                  </div>
                  <p className={styles.reviews}>({track.reviews} reviews)</p>
                </div>
                <a href="#" className={styles.viewTrack}>View Track →</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
