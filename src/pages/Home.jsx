import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import Dashboard from '../components/Dashboard/Dashboard';
import Features from '../components/Features/Features';
import Testimonials from '../components/Testimonials/Testimonials';
import CTA from '../components/CTA/CTA';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Dashboard />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
