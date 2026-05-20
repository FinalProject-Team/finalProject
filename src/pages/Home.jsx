import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import Dashboard from '../components/Dashboard/Dashboard';
import Courses from '../components/Courses/Courses';
import Testimonials from '../components/Testimonials/Testimonials';
import CTA from '../components/CTA/CTA';
import Footer from '../components/Footer/Footer';

export default function Home({ theme, toggleTheme }) {
  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Stats />
      <Dashboard />
      <Courses />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
