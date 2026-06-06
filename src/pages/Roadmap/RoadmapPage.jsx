// ✅ CONNECTED TO API — fetches from multiple endpoints:
//   - apiGetRoadmap()         → GET /api/roadmap/me
//   - apiGetDashboardStats()  → GET /api/dashboard/stats
//   - apiGetMyProjects()      → GET /api/projects/me
//   - apiGetMyProgress()      → GET /api/progress/me
//   - apiGetMe()              → GET /api/auth/me
// ⚠️  FALLS BACK TO STATIC DATA from Roadmap sub-component data files when API is unavailable
import { useEffect, useRef, useState } from 'react';
import RoadmapHero      from '../../components/Roadmap/RoadmapHero/RoadmapHero.jsx';
import StatsCards       from '../../components/Roadmap/StatsCards/StatsCards.jsx';
import RoadmapTimeline  from '../../components/Roadmap/RoadmapTimeline/RoadmapTimeline.jsx';
import RoadmapProjects  from '../../components/Roadmap/RoadmapProjects/RoadmapProjects.jsx';
import RoadmapMilestones from '../../components/Roadmap/RoadmapMilestones/RoadmapMilestones.jsx';
import styles           from './RoadmapPage.module.css';
import {
  apiGetRoadmap,
  apiGetDashboardStats,
  apiGetMyProjects,
  apiGetMyProgress,
  apiGetMe,
} from '../../services/api/api';

export default function RoadmapPage() {
  const [hero, setHero]         = useState({ name: 'Alex', role: 'Mid-Level Developer', streak: 7, totalXp: 4820, xpToNext: 180 });
  const [roadmap, setRoadmap]   = useState(null);
  const [stats, setStats]       = useState(null);
  const [projects, setProjects] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const mounted                 = useRef(true);

  useEffect(() => {
    mounted.current = true;

    (async () => {
      const results = await Promise.allSettled([
        apiGetMe(),
        apiGetRoadmap(),
        apiGetDashboardStats(),
        apiGetMyProjects(),
        apiGetMyProgress(),
      ]);

      if (!mounted.current) return;

      const [meRes, roadmapRes, statsRes, projectsRes, progressRes] = results;

      if (meRes.status === 'fulfilled') {
        const u = meRes.value?.user || meRes.value;
        setHero({
          name:    u?.full_name || u?.name || 'Alex',
          role:    u?.level    || 'Mid-Level Developer',
          streak:  u?.streak   || 7,
          totalXp: u?.total_xp || 4820,
          xpToNext: u?.xp_to_next || 180,
        });
      }

      if (roadmapRes.status  === 'fulfilled') setRoadmap(roadmapRes.value);
      if (statsRes.status    === 'fulfilled') setStats(statsRes.value);
      if (projectsRes.status === 'fulfilled') {
        const list = Array.isArray(projectsRes.value) ? projectsRes.value : projectsRes.value?.projects ?? null;
        setProjects(list);
      }
      if (progressRes.status === 'fulfilled') setProgress(progressRes.value);

      // Report first hard error if all failed
      const firstErr = results.find(r => r.status === 'rejected');
      if (firstErr && results.every(r => r.status === 'rejected')) {
        setError(firstErr.reason?.response?.data?.message || firstErr.reason?.message || 'Failed to load roadmap data.');
      }

      setLoading(false);
    })();

    return () => { mounted.current = false; };
  }, []);

  return (
    <div className={styles.page}>
      {loading && (
        <div style={{ padding: '32px', textAlign: 'center', color: 'var(--txt-muted,#6b7280)' }}>
          Loading your roadmap…
        </div>
      )}

      {error && !loading && (
        <div style={{ padding: '10px 16px', marginBottom: '16px', background: 'rgba(239,68,68,0.12)', borderRadius: '8px', color: '#fca5a5', fontSize: '0.875rem' }}>
          ⚠ {error} — showing default data.
        </div>
      )}

      {!loading && (
        <>
          <RoadmapHero
            name={hero.name}
            role={hero.role}
            streak={hero.streak}
            totalXp={hero.totalXp}
            xpToNext={hero.xpToNext}
          />
          <StatsCards  apiStats={stats} />
          <RoadmapTimeline apiRoadmap={roadmap} />
          <RoadmapProjects apiProjects={projects} />
          <RoadmapMilestones apiProgress={progress} />
        </>
      )}
    </div>
  );
}
