import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WorkList from '@/components/WorkList';
import About from '@/components/About';
import WhatIDo from '@/components/WhatIDo';
import Services from '@/components/Services';
import Footer from '@/components/Footer';

import { motion } from 'framer-motion';

const Separator = () => (
  <div className="w-full pl-4 sm:pl-6 md:pl-8 lg:pl-12">
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 1.3, ease: "circOut" }}
      style={{ originX: 1 }}
      className="h-0.5 bg-[#1a1a1a] w-full" 
    />
  </div>
);

import MouseParticles from '@/components/MouseParticles';
import MobileParticleToast from '@/components/MobileParticleToast';

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] relative">
      <MouseParticles />
      <MobileParticleToast />
      <Navbar />
      <main>
        <Hero />
        <Separator />
        <WorkList />
        <Separator />
        <WhatIDo />
        <Separator />
        <Services />
        <Separator />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Home;