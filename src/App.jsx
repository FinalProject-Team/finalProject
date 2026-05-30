import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Payment from './pages/Payment';
import Ranking from './pages/Ranking/Ranking';
import Layout from './components/layout/Layout';
import Dashboard from './components/layout/Dashboard/Dashboard';
import Career from './components/layout/Career Twin/Career';
import Register from './components/layout/Register/Register'; 

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

const Profile = () => <h1>Profile</h1>
const Roadmap = () => <h1>Roadmap</h1>
const Chatbot = () => <h1>Chatbot</h1>
const Jobs = () => <h1>Jobs</h1>
const Progress = () => <h1>Progress</h1>
const SoftSkills = () => <h1>Soft Skills</h1>
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

  const Router = createBrowserRouter([
    { path: "/", element: <Home theme={theme} toggleTheme={toggleTheme} /> },
    { path: "/test", element: <h1>Test Page</h1> },
    { path: "/payment", element: <Payment /> },
    
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Landingpage /> },
     {
     path: "/instructor",
     element: <InstructorDashboardLayout />,
     children: [
       { path: "dashboard", element:<InstructorDashboardDashboard/> },
       { path: "courses", element: <InstructorDashboardCourses /> },
        { path: "lessons", element: <InstructorDashboardLessons /> },  
        {
          path: "interactive-sessions",
           element: <InstructorDashboardInteractiveSessions />,
          },
          { path: "profile", element: <InstructorDashboardProfile /> },
         
      ],
      },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "", element: <AdminDashboard /> },
        { path: "users", element: <AdminUsers /> },
        { path: "courses", element: <AdminCourses /> },
        { path: "lessons", element: <AdminLessons /> },
      ]
    },

    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        { path: "", element: <Dashboard /> },
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
  ]);

  return (
    <RouterProvider router={Router} />
  );
}