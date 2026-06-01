import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'; 
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// --- استيرادات المشروع الأساسي ---
import Home from './pages/Home';
import SoftSkills from './pages/SoftSkills/SoftSkills';
import Payment from './pages/Payment';
import Ranking from './pages/Ranking/Ranking';
import Layout from './components/layout/Layout';
import Dashboard from './components/layout/Dashboard/Dashboard';
import Career from './components/layout/Career Twin/Career';
import Register from './components/layout/Register/Register'; 
import { supabase } from "./components/layout/services/supabaseClient"; 
import api from "./components/layout/services/Api";
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminUsers from './components/Admin/AdminUsers';
import AdminCourses from './components/Admin/AdminCourses';
import AdminLessons from './components/Admin/AdminLessons';
import InstructorDashboardLayout from './components/InstructorDashboard/InstructorDashboardLayout/InstructorDashboardLayout';
import InstructorDashboardDashboard from './components/InstructorDashboard/InstructorDashboardDashboard/InstructorDashboardDashboard';
import InstructorDashboardCourses from "./components/InstructorDashboard/InstructorDashboardCourses/InstructorDashboardCourses";
import InstructorDashboardInteractiveSessions from "./components/InstructorDashboard/InstructorDashboardInteractiveSessions/InstructorDashboardInteractiveSessions";
import InstructorDashboardLessons from "./components/InstructorDashboard/InstructorDashboardLessons/InstructorDashboardLessons";
import InstructorDashboardProfile from "./components/InstructorDashboard/InstructorDashboardProfile/InstructorDashboardProfile";
import LiveSession from './components/LiveSessions/LiveSession';

// --- استيرادات شغلك الجديد (تأكدي من صحة المسارات داخل مجلد component) ---
import ProfileMetrics from "./components/Progress/ProfileMetrics.jsx";
import XPGrowth from "./components/Progress/XPGrowth.jsx";
import CourseCompletion from "./components/Progress/CourseCompletion.jsx";
import ProgressperCourse from './components/Progress/ProgressperCourse'; 
import DailyLearningHours from './components/Progress/DailyLearningHours';
// ملاحظة: تأكدي من وجود ملف CSS خاص بشغلك إذا لزم الأمر

// --- تعريف صفحة الـ Progress الخاصة بك كمكون ---
const ProgressPage = () => (
  <div style={{ backgroundColor: '#060814', minHeight: '100vh', padding: '40px 20px', color: 'white' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <ProfileMetrics />
      <div className="charts-layout-grid">
        <XPGrowth />
        <CourseCompletion />
      </div>
      <ProgressperCourse />
      <DailyLearningHours />
    </div>
  </div>
);

// --- باقي المكونات المؤقتة ---
const Profile = () => <h1>Profile</h1>
const Roadmap = () => <h1>Roadmap</h1>
const Chatbot = () => <h1>Chatbot</h1>
const Jobs = () => <h1>Jobs</h1>
const Landingpage = () => <h1>Landing Page</h1>

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('ct-theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ct-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const getSessionAndSendToBackend = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;
      if (!user) return;
      try {
        const res = await api.post("/api/auth/google-login", { user });
        const result = res.data;
        const role = result?.user?.role;
        if (role === "admin") window.location.href = "/admin";
        else if (role === "instructor") window.location.href = "/instructor";
        else window.location.href = "/dashboard/dashboard"; 
      } catch (error) { console.error("Error:", error); }
    };
    getSessionAndSendToBackend();
  }, []);

  const Router = createBrowserRouter([
    { path: "/", element: <Home theme={theme} toggleTheme={toggleTheme} /> },
    { path: "/test", element: <h1>Test Page</h1> },
    { path: "/payment", element: <Payment /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Landingpage /> },
    { path: "/instructor", element: <InstructorDashboardLayout />, children: [
        { path: "dashboard", element:<InstructorDashboardDashboard/> },
        { path: "courses", element: <InstructorDashboardCourses /> },
        { path: "lessons", element: <InstructorDashboardLessons /> },  
        { path: "interactive-sessions", element: <InstructorDashboardInteractiveSessions /> },
        { path: "profile", element: <InstructorDashboardProfile /> },
    ]},
    { path: "/dashboard", element: <Layout />, children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "profile", element: <Profile /> },
        { path: "roadmap", element: <Roadmap /> },
        { path: "chatbot", element: <Chatbot /> },
        { path: "jobs", element: <Jobs /> },
        { path: "progress", element: <ProgressPage /> }, // <-- هنا تم دمج شغلك
        { path: "softSkills", element: <SoftSkills /> },
        { path: "ranking", element: <Ranking /> },
        { path: "careertwin", element: <Career /> },
        { path: "live-session", element: <LiveSession/> },
    ]},
    { path: "/admin", element: <AdminLayout />, children: [
        { path: "", element: <AdminDashboard /> },
        { path: "users", element: <AdminUsers /> },
        { path: "courses", element: <AdminCourses /> },
        { path: "lessons", element: <AdminLessons /> }
    ]}
  ]);

  return <RouterProvider router={Router} />;
}