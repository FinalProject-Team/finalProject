import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Home from './src/pages/Home.jsx';
import SoftSkills from './src/pages/SoftSkills/SoftSkills';
import Payment from './src/pages/Payment';
import Ranking from './src/pages/Ranking/Ranking';
import Layout from './src/components/layout/Layout';
import Dashboard from './src/components/layout/Dashboard/Dashboard';
import Career from './src/components/layout/Career Twin/Career';
import Register from './src/components/layout/Register/Register';
import Login from './src/pages/Login/Login';
import Chatbot from './src/pages/Chatbot/Chatbot';

import { supabase } from './src/lib/supabaseClient';
import { apiGoogleLogin } from './src/services/api/api';

import AdminLayout from './src/components/Admin/AdminLayout';
import AdminDashboard from './src/components/Admin/AdminDashboard';
import AdminUsers from './src/components/Admin/AdminUsers';
import AdminCourses from './src/components/Admin/AdminCourses';
import AdminLessons from './src/components/Admin/AdminLessons';

import InstructorDashboardLayout from './src/components/InstructorDashboard/InstructorDashboardLayout/InstructorDashboardLayout';
import InstructorDashboardDashboard from './src/components/InstructorDashboard/InstructorDashboardDashboard/InstructorDashboardDashboard';
import InstructorDashboardCourses from './src/components/InstructorDashboard/InstructorDashboardCourses/InstructorDashboardCourses';
import InstructorDashboardInteractiveSessions from './src/components/InstructorDashboard/InstructorDashboardInteractiveSessions/InstructorDashboardInteractiveSessions';
import InstructorDashboardLessons from './src/components/InstructorDashboard/InstructorDashboardLessons/InstructorDashboardLessons';
import InstructorDashboardProfile from './src/components/InstructorDashboard/InstructorDashboardProfile/InstructorDashboardProfile';
import LiveSession from './src/components/LiveSessions/LiveSession';

import ProtectedRoute from './src/components/common/ProtectedRoute';
import ProfilePage from './src/pages/Profile/ProfilePage';
import JobsPage from './src/pages/Jobs/JobsPage';
import ProjectsPage from './src/pages/Projects/Projects';
import ProgressPage from './src/pages/Progress/ProgressPage';
import CommunityPage from './src/pages/Community/CommunityPage';
import ResetPasswordPage from './src/pages/ResetPassword/ResetPasswordPage';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('ct-theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ct-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // Google OAuth post-redirect handler
  useEffect(() => {
    if (!supabase) return;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event !== 'SIGNED_IN' || !session?.user) return;
        const provider = session.user.app_metadata?.provider;
        if (provider !== 'google') return;
        try {
          const res = await apiGoogleLogin(session.user);
          const r = res?.user?.role;
          if (r === 'admin')           window.location.href = '/admin';
          else if (r === 'instructor') window.location.href = '/instructor/dashboard';
          else                         window.location.href = '/';  // students go home first
        } catch {
          window.location.href = '/dashboard/dashboard';
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const Router = createBrowserRouter([
    // ── Public ──────────────────────────────────────────────────────────────
    { path: '/',        element: <Home theme={theme} toggleTheme={toggleTheme} /> },
    { path: '/login',   element: <Login /> },
    { path: '/register', element: <Register /> },

    // ── Payment ─────────────────────────────────────────────────────────────
    {
      path: '/payment',
      element: (
        <ProtectedRoute allowedRoles={['student']}>
          <Payment />
        </ProtectedRoute>
      ),
    },

    // ── Student / Job-Seeker dashboard ───────────────────────────────────────
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute allowedRoles={['student', 'job_seeker']} requirePayment>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate to="/dashboard/dashboard" replace /> },
        { path: 'dashboard',    element: <Dashboard /> },
        { path: 'profile',      element: <ProfilePage /> },
        { path: 'roadmap',      element: <RoadmapPage /> },
        { path: 'chatbot',      element: <Chatbot /> },
        { path: 'softSkills',   element: <SoftSkills /> },
        { path: 'ranking',      element: <Ranking /> },
        { path: 'careertwin',   element: <Career /> },
        { path: 'live-session', element: <LiveSession /> },
        // Student-only routes
        {
          path: 'progress',
          element: (
            <ProtectedRoute allowedRoles={['student']} requirePayment>
              <ProgressPage />
            </ProtectedRoute>
          ),
        },
        // Shared routes
        { path: 'jobs',      element: <JobsPage /> },
        { path: 'projects',  element: <ProjectsPage /> },
        { path: 'community', element: <CommunityPage /> },
      ],
    },

    // ── Instructor dashboard ─────────────────────────────────────────────────
    {
      path: '/instructor',
      element: (
        <ProtectedRoute allowedRoles={['instructor']}>
          <InstructorDashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate to="/instructor/dashboard" replace /> },
        { path: 'dashboard',            element: <InstructorDashboardDashboard /> },
        { path: 'courses',              element: <InstructorDashboardCourses /> },
        { path: 'lessons',              element: <InstructorDashboardLessons /> },
        { path: 'interactive-sessions', element: <InstructorDashboardInteractiveSessions /> },
        { path: 'profile',              element: <InstructorDashboardProfile /> },
      ],
    },

    // ── Admin dashboard ──────────────────────────────────────────────────────
    {
      path: '/admin',
      element: (
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true,     element: <AdminDashboard /> },
        { path: 'users',   element: <AdminUsers /> },
        { path: 'courses', element: <AdminCourses /> },
        { path: 'lessons', element: <AdminLessons /> },
      ],
    },

    // ── Password reset (Supabase redirect) ────────────────────────────────────
    { path: '/reset-password', element: <ResetPasswordPage /> },

        // ── Catch-all ────────────────────────────────────────────────────────────
    { path: '*', element: <Navigate to="/" replace /> },
  ]);

  return <RouterProvider router={Router} />;
}
