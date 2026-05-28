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
    { path: "/payment", element: <Payment /> },
    
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Landingpage /> },

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