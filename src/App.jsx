import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'; 
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Payment from './pages/Payment';
import Layout from './components/layout/Layout';
import Dashboard from './components/layout/Dashboard/Dashboard';
import Career from './components/layout/Career Twin/Career';
import Register from './components/layout/Register/Register'; 
// import AdminLayout from './components/Admin/AdminLayout';
// import AdminDashboard from './components/Admin/AdminDashboard';
// import AdminUsers from './components/Admin/AdminUsers';
// import AdminCourses from './components/Admin/AdminCourses';
// import AdminLessons from './components/Admin/AdminLessons';
import { supabase } from "./components/layout/services/supabaseClient"; 
import api from "./components/layout/services/Api";

const Profile = () => <h1>Profile</h1>
const Roadmap = () => <h1>Roadmap</h1>
const Chatbot = () => <h1>Chatbot</h1>
const Jobs = () => <h1>Jobs</h1>
const Progress = () => <h1>Progress</h1>
const SoftSkills = () => <h1>Soft Skills</h1>
const Ranking = () => <h1>Ranking</h1>
const Landingpage = () => <h1>Landing Page</h1>

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ct-theme') || 'dark';
  });

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

        console.log("BACKEND RESPONSE:", result);

        const role = result?.user?.role;
        if (role === "admin") {
          window.location.href = "/admin";
        } else if (role === "instructor") {
          window.location.href = "/instructor";
        } else {
          window.location.href = "/dashboard/dashboard"; 
        }
      } catch (error) {
        console.error("Error sending token to backend:", error);
      }
    };

    getSessionAndSendToBackend();
  }, []);

  const Router = createBrowserRouter([
    { path: "/", element: <Home theme={theme} toggleTheme={toggleTheme} /> },
    { path: "/payment", element: <Payment /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Landingpage /> },

    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "profile", element: <Profile /> },
        { path: "roadmap", element: <Roadmap /> },
        { path: "chatbot", element: <Chatbot /> },
        { path: "jobs", element: <Jobs /> },
        { path: "progress", element: <Progress /> },
        { path: "softSkills", element: <SoftSkills /> },
        { path: "ranking", element: <Ranking /> },
        { path: "careertwin", element: <Career /> },
      ]
    },

    // {
    //   path: "/admin",
    //   element: <AdminLayout />,
    //   children: [
    //     {
    //       path: "", 
    //       element: <AdminDashboard />
    //     },
    //     {
    //       path: "users",
    //       element: <AdminUsers />
    //     },
    //     {
    //       path: "courses",
    //       element: <AdminCourses />
    //     },
    //     {
    //       path: "lessons",
    //       element: <AdminLessons />
    //     }
    //   ]
    // }
  ]);

  return (
    <RouterProvider router={Router} />
  );
}